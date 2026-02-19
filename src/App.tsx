import React, { useState, useEffect, useRef } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type Child } from './db';
import { initializeMockData } from './mockData';
import './index.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const notificationCooldowns = useRef<Record<number, number>>({});
  
  const rooms = useLiveQuery(() => db.rooms.toArray());
  const children = useLiveQuery(() => db.children.toArray());

  useEffect(() => {
    initializeMockData();
    // Clock for Absence Alerts
    const timer = setInterval(() => setCurrentTime(new Date()), 30000); // Check every 30s
    
    // Request Notification Permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => clearInterval(timer);
  }, []);

  // Periodic Browser Notifications
  useEffect(() => {
    if (!children || !isAuthenticated || Notification.permission !== "granted") return;

    const lateChildren = children.filter(c => isLate(c));
    const now = Date.now();

    lateChildren.forEach(child => {
      const lastNotified = notificationCooldowns.current[child.id!] || 0;
      // Notify every 5 minutes (300,000 ms)
      if (now - lastNotified > 300000) {
        new Notification('TapTots: Late Alert', {
          body: `${child.firstName} ${child.lastName} has not arrived yet.`,
          icon: child.photoUrl
        });
        notificationCooldowns.current[child.id!] = now;
      }
    });
  }, [children, currentTime, isAuthenticated]);

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
    setPin(''); 
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
    // Only late if NOT Checked In
    if (child.status === 'Checked In') return false;
    if (!child.cutoffTime || !child.leftTime) return false;
    
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    const [cHours, cMins] = child.cutoffTime.split(':').map(Number);
    const [lHours, lMins] = child.leftTime.split(':').map(Number);
    
    const cutoff = cHours * 60 + cMins;
    const left = lHours * 60 + lMins;
    
    // Late if now is between cutoff and left time
    return now >= cutoff && now < left;
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
          <span style={{ fontWeight: 'bold' }}>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Lock Kiosk</button>
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
                      {late && (
                        <a 
                          href={`tel:${child.parentPhone}`} 
                          className="call-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Call Parent
                        </a>
                      )}
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
