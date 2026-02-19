import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type Child } from './db';
import { initializeMockData } from './mockData';
import './index.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const rooms = useLiveQuery(() => db.rooms.toArray());
  const children = useLiveQuery(() => db.children.toArray());

  useEffect(() => {
    initializeMockData();
    // Clock for Absence Alerts
    const timer = setInterval(() => setCurrentTime(new Date()), 30000); // Check every 30s
    return () => clearInterval(timer);
  }, []);

  const handlePinInput = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin === '1234') { 
        setTimeout(() => setIsAuthenticated(true), 200);
      } else if (newPin.length === 4) {
        setTimeout(() => setPin(''), 500); 
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin(''); // FIX: Reset PIN on logout
  };

  const toggleAttendance = async (child: Child) => {
    const newStatus = child.status === 'Checked In' ? 'Checked Out' : 'Checked In';
    await db.children.update(child.id!, { 
      status: newStatus, 
      lastUpdated: new Date().toISOString() 
    });
    
    await db.logs.add({
      childId: child.id!,
      timestamp: new Date().toISOString(),
      type: newStatus === 'Checked In' ? 'IN' : 'OUT'
    });
  };

  const isLate = (child: Child) => {
    if (child.status === 'Checked In') return false;
    if (!child.cutoffTime) return false;
    
    const [hours, minutes] = child.cutoffTime.split(':').map(Number);
    const cutoffDate = new Date();
    cutoffDate.setHours(hours, minutes, 0, 0);
    
    return currentTime > cutoffDate;
  };

  if (!isAuthenticated) {
    return (
      <div className="pin-screen">
        <h1>Welcome to TapTots</h1>
        <p>Enter PIN to Unlock Kiosk</p>
        <div className="pin-display">
          {'●'.repeat(pin.length) + '○'.repeat(4 - pin.length)}
        </div>
        <div className="keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '←'].map((btn) => (
            <button key={btn} onClick={() => {
              if (btn === 'C') setPin('');
              else if (btn === '←') setPin(pin.slice(0, -1));
              else handlePinInput(btn.toString());
            }}>
              {btn}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="dashboard-header">
        <h1>TapTots Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>Lock Kiosk</button>
        </div>
      </header>

      <div className="room-carousel">
        {rooms?.map((room) => (
          <div key={room.id} className="room-slide">
            <h2 className="room-title">{room.name}</h2>
            <div className="child-grid">
              {children
                ?.filter((c) => c.roomId === room.id)
                .map((child) => {
                  const late = isLate(child);
                  return (
                    <div
                      key={child.id}
                      className={`child-card ${child.status === 'Checked In' ? 'checked-in' : ''} ${late ? 'late-alert' : ''}`}
                      onClick={() => toggleAttendance(child)}
                    >
                      {late && <div className="late-badge">LATE</div>}
                      <img src={child.photoUrl} alt={child.firstName} />
                      <span className="child-name">{child.firstName} {child.lastName}</span>
                      <span className="status-badge">{child.status}</span>
                      {late && <div style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.2rem' }}>Call Parent!</div>}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
