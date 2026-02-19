import Dexie, { type EntityTable } from 'dexie';

interface Room {
  id?: number;
  name: string;
}

interface Child {
  id?: number;
  firstName: string;
  lastName: string;
  photoUrl: string;
  roomId: number;
  status: 'Checked In' | 'Checked Out';
  lastUpdated: string;
  cutoffTime: string; // HH:mm format, e.g., "09:00"
  leftTime: string;   // HH:mm format, e.g., "17:00"
  parentPhone: string; // e.g., "+60123456789"
}

interface AttendanceLog {
  id?: number;
  childId: number;
  timestamp: string;
  type: 'IN' | 'OUT';
}

const db = new Dexie('TapTotsDB') as Dexie & {
  rooms: EntityTable<Room, 'id'>;
  children: EntityTable<Child, 'id'>;
  logs: EntityTable<AttendanceLog, 'id'>;
};

// Schema: Room(id, name), Child(id, roomId, status), Logs(id, childId)
db.version(1).stores({
  rooms: '++id, name',
  children: '++id, roomId, status',
  logs: '++id, childId, timestamp'
});

export type { Room, Child, AttendanceLog };
export { db };
