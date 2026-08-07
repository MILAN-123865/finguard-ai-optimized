import fs from 'fs';
import path from 'path';

export interface EmergencyContact {
  id: string;
  userId: string;
  name: string;
  relation: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactNotificationResult {
  contactId: string;
  name: string;
  email: string;
  phone: string;
  status: 'SENT' | 'FAILED' | 'RETRIED_SENT';
  attempts: number;
  error?: string;
  sentAt?: string;
}

export interface SOSEventRecord {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: 'ACTIVE' | 'RESOLVED' | 'CANCELLED';
  timestamp: string;
  message: string;
  gpsLocation?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  } | null;
  googleMapsUrl: string;
  ipAddress: string;
  deviceInfo: string;
  contactsNotified: ContactNotificationResult[];
  userNotificationStatus: 'SENT' | 'FAILED';
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface EmergencyDatabaseSchema {
  contacts: EmergencyContact[];
  events: SOSEventRecord[];
}

const emergencyDbFile = path.join(process.cwd(), 'uploads', 'emergency_db.json');

const ensureDir = () => {
  const dir = path.dirname(emergencyDbFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export function loadEmergencyDb(): EmergencyDatabaseSchema {
  ensureDir();
  try {
    if (fs.existsSync(emergencyDbFile)) {
      const data = fs.readFileSync(emergencyDbFile, 'utf-8');
      const parsed = JSON.parse(data);
      return {
        contacts: parsed.contacts || [],
        events: parsed.events || []
      };
    }
  } catch (err) {
    console.error('Error reading emergency_db.json:', err);
  }
  return { contacts: [], events: [] };
}

export function saveEmergencyDb(db: EmergencyDatabaseSchema): void {
  ensureDir();
  try {
    fs.writeFileSync(emergencyDbFile, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing emergency_db.json:', err);
  }
}

// Contacts CRUD
export function getContactsByUserId(userId: string): EmergencyContact[] {
  const db = loadEmergencyDb();
  return db.contacts.filter(c => c.userId === userId);
}

export function addContact(userId: string, contactData: Omit<EmergencyContact, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): EmergencyContact {
  const db = loadEmergencyDb();
  const userContacts = db.contacts.filter(c => c.userId === userId);
  
  if (userContacts.length >= 5) {
    throw new Error('Maximum limit of 5 emergency contacts reached.');
  }

  const now = new Date().toISOString();
  const newContact: EmergencyContact = {
    ...contactData,
    id: `contact_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    userId,
    createdAt: now,
    updatedAt: now
  };

  db.contacts.push(newContact);
  saveEmergencyDb(db);
  return newContact;
}

export function updateContact(userId: string, contactId: string, updates: Partial<Omit<EmergencyContact, 'id' | 'userId' | 'createdAt'>>): EmergencyContact | null {
  const db = loadEmergencyDb();
  const index = db.contacts.findIndex(c => c.id === contactId && c.userId === userId);
  
  if (index === -1) return null;

  db.contacts[index] = {
    ...db.contacts[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  saveEmergencyDb(db);
  return db.contacts[index];
}

export function deleteContact(userId: string, contactId: string): boolean {
  const db = loadEmergencyDb();
  const initialLen = db.contacts.length;
  db.contacts = db.contacts.filter(c => !(c.id === contactId && c.userId === userId));
  
  if (db.contacts.length !== initialLen) {
    saveEmergencyDb(db);
    return true;
  }
  return false;
}

// SOS Events Database operations
export function createSOSEvent(eventData: Omit<SOSEventRecord, '_id' | 'createdAt' | 'updatedAt'>): SOSEventRecord {
  const db = loadEmergencyDb();
  const now = new Date().toISOString();
  const newEvent: SOSEventRecord = {
    ...eventData,
    _id: `sos_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    createdAt: now,
    updatedAt: now
  };

  db.events.unshift(newEvent);
  saveEmergencyDb(db);
  return newEvent;
}

export function updateSOSEvent(eventId: string, updates: Partial<SOSEventRecord>): SOSEventRecord | null {
  const db = loadEmergencyDb();
  const index = db.events.findIndex(e => e._id === eventId);
  if (index === -1) return null;

  db.events[index] = {
    ...db.events[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  saveEmergencyDb(db);
  return db.events[index];
}

export function getSOSEventsByUserId(userId: string): SOSEventRecord[] {
  const db = loadEmergencyDb();
  return db.events
    .filter(e => e.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getActiveSOSEventByUserId(userId: string): SOSEventRecord | undefined {
  const db = loadEmergencyDb();
  return db.events.find(e => e.userId === userId && e.status === 'ACTIVE');
}
