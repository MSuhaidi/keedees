import { db } from './db';

const initializeMockData = async () => {
  const roomCount = await db.rooms.count();
  if (roomCount === 0) {
    const infantRoomId = await db.rooms.add({ name: 'Infants' });
    const toddlerRoomId = await db.rooms.add({ name: 'Toddlers' });

    await db.children.bulkAdd([
      { firstName: 'Leo', lastName: 'G.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo', roomId: infantRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:30' },
      { firstName: 'Mia', lastName: 'W.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia', roomId: infantRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '10:00' },
      { firstName: 'Jack', lastName: 'S.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack', roomId: toddlerRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '09:00' },
      { firstName: 'Emma', lastName: 'B.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', roomId: toddlerRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:30' },
    ]);
    console.log('Mock data initialized!');
  }
};

export { initializeMockData };
