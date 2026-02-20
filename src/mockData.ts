import { db, type Child } from './db';

const initializeMockData = async () => {
  let infantRoomId: number;
  let toddlerRoomId: number;

  const rooms = await db.rooms.toArray();
  if (rooms.length === 0) {
    infantRoomId = await db.rooms.add({ name: 'Infants' }) as number;
    toddlerRoomId = await db.rooms.add({ name: 'Toddlers' }) as number;
  } else {
    infantRoomId = rooms.find(r => r.name === 'Infants')?.id as number;
    toddlerRoomId = rooms.find(r => r.name === 'Toddlers')?.id as number;
  }

  const malaysianChildren: Child[] = [
    // Infants
    { firstName: 'Ahmad', lastName: 'H.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad', roomId: infantRoomId, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:30', leftTime: '17:00', parentPhone: '+60111222333' },
    { firstName: 'Mimi', lastName: 'C.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi', roomId: infantRoomId, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '09:00', leftTime: '18:00', parentPhone: '+60122334455' },
    { firstName: 'Aneka', lastName: 'K.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka', roomId: infantRoomId, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:00', leftTime: '16:30', parentPhone: '+60133445566' },
    { firstName: 'Nur', lastName: 'A.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nur', roomId: infantRoomId, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:45', leftTime: '17:30', parentPhone: '+60144556677' },
    { firstName: 'Siti', lastName: 'B.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti', roomId: infantRoomId, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '09:15', leftTime: '18:15', parentPhone: '+60155667788' },

    // Toddlers
    { firstName: 'Zhi Wei', lastName: 'L.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZhiWei', roomId: toddlerRoomId, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:30', leftTime: '17:00', parentPhone: '+60166778899' },
    { firstName: 'Arnav', lastName: 'P.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arnav', roomId: toddlerRoomId, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '09:00', leftTime: '17:30', parentPhone: '+60177889900' },
    { firstName: 'Ali', lastName: 'M.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ali', roomId: toddlerRoomId, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:00', leftTime: '16:00', parentPhone: '+60188990011' },
    { firstName: 'Lina', lastName: 'X.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lina', roomId: toddlerRoomId, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:45', leftTime: '17:00', parentPhone: '+60199001122' },
    { firstName: 'Arfan', lastName: 'Y.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arfan', roomId: toddlerRoomId, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '09:30', leftTime: '18:30', parentPhone: '+60100112233' },
    { firstName: 'Fara', lastName: 'O.', photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fara', roomId: toddlerRoomId, status: 'Checked Out', lastUpdated: new Date().toISOString(), cutoffTime: '08:15', leftTime: '16:45', parentPhone: '+60111223344' },
  ];

  const existingChildrenCount = await db.children.count();
  if (existingChildrenCount === 0) {
    await db.children.bulkAdd(malaysianChildren);
    console.log('Localized mock data initialized!');
  } else {
    const currentChildren = await db.children.toArray();
    for (const child of currentChildren) {
      if (!child.leftTime || !child.parentPhone) {
        const mockMatch = malaysianChildren.find(m => m.firstName === child.firstName && m.lastName === child.lastName);
        if (mockMatch) {
          await db.children.update(child.id!, {
            leftTime: mockMatch.leftTime,
            parentPhone: mockMatch.parentPhone
          });
        } else {
          await db.children.update(child.id!, {
            leftTime: '17:00',
            parentPhone: '+60111222333'
          });
        }
      }
    }
    console.log('Mock data patched for existing users!');
  }
};

export { initializeMockData };
