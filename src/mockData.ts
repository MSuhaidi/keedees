import { db, type Child } from './db';

const initializeMockData = async () => {
  const roomCount = await db.rooms.count();
  if (roomCount === 0) {
    const infantRoomId = await db.rooms.add({ name: 'Infants' });
    const toddlerRoomId = await db.rooms.add({ name: 'Toddlers' });

    const malaysianChildren: Child[] = [
      // Infants
      { firstName: 'Aiman', lastName: 'H.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aiman', roomId: infantRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:30', leftTime: '17:00', parentPhone: '+60111222333' },
      { firstName: 'Mei Ling', lastName: 'C.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MeiLing', roomId: infantRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '09:00', leftTime: '18:00', parentPhone: '+60122334455' },
      { firstName: 'Raju', lastName: 'K.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Raju', roomId: infantRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:00', leftTime: '16:30', parentPhone: '+60133445566' },
      { firstName: 'Nurul', lastName: 'A.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nurul', roomId: infantRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:45', leftTime: '17:30', parentPhone: '+60144556677' },
      { firstName: 'Siti', lastName: 'B.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti', roomId: infantRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '09:15', leftTime: '18:15', parentPhone: '+60155667788' },
      
      // Toddlers
      { firstName: 'Zhi Wei', lastName: 'L.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZhiWei', roomId: toddlerRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:30', leftTime: '17:00', parentPhone: '+60166778899' },
      { firstName: 'Arnav', lastName: 'P.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arnav', roomId: toddlerRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '09:00', leftTime: '17:30', parentPhone: '+60177889900' },
      { firstName: 'Farhan', lastName: 'M.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Farhan', roomId: toddlerRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:00', leftTime: '16:00', parentPhone: '+60188990011' },
      { firstName: 'Li Na', lastName: 'X.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LiNa', roomId: toddlerRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:45', leftTime: '17:00', parentPhone: '+60199001122' },
      { firstName: 'Irfan', lastName: 'Y.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Irfan', roomId: toddlerRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '09:30', leftTime: '18:30', parentPhone: '+60100112233' },
      { firstName: 'Zara', lastName: 'O.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zara', roomId: toddlerRoomId as number, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:15', leftTime: '16:45', parentPhone: '+60111223344' },
    ];

    await db.children.bulkAdd(malaysianChildren);
    console.log('Localized mock data initialized!');
  }
};

export { initializeMockData };
