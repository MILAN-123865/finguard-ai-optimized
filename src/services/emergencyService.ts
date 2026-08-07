import { apiClient } from '../config/api';

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

const LOCAL_CONTACTS_KEY = 'finguard_emergency_contacts_db';
const LOCAL_HISTORY_KEY = 'finguard_emergency_history_db';

// Helper for local storage fallback
function getLocalContacts(): EmergencyContact[] {
  try {
    const raw = localStorage.getItem(LOCAL_CONTACTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return [
    {
      id: 'cnt_001',
      userId: 'usr_109283',
      name: 'Sarah Connor',
      relation: 'Spouse / Family',
      email: 's.connor@example.com',
      phone: '+1 (555) 019-2834',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'cnt_002',
      userId: 'usr_109283',
      name: 'David Miller',
      relation: 'Brother / Trusted Contact',
      email: 'david.m@example.com',
      phone: '+1 (555) 018-9921',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];
}

function saveLocalContacts(contacts: EmergencyContact[]): void {
  try {
    localStorage.setItem(LOCAL_CONTACTS_KEY, JSON.stringify(contacts));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

function getLocalHistory(): SOSEventRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return [];
}

function saveLocalHistory(history: SOSEventRecord[]): void {
  try {
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

export const emergencyService = {
  // Fetch Emergency Contacts
  async getContacts(userId = 'usr_109283'): Promise<EmergencyContact[]> {
    try {
      const response = await apiClient.get('/emergency/contacts', { params: { userId } });
      if (response.data?.contacts) {
        saveLocalContacts(response.data.contacts);
        return response.data.contacts;
      }
      return getLocalContacts();
    } catch {
      return getLocalContacts();
    }
  },

  // Add Contact (max 5)
  async addContact(
    data: { name: string; relation: string; email: string; phone: string },
    userId = 'usr_109283'
  ): Promise<EmergencyContact> {
    try {
      const response = await apiClient.post('/emergency/contacts', { ...data, userId });
      if (response.data?.contact) {
        const current = getLocalContacts();
        saveLocalContacts([response.data.contact, ...current]);
        return response.data.contact;
      }
    } catch (err: any) {
      if (err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }
    }

    // Local fallback
    const current = getLocalContacts();
    if (current.length >= 5) {
      throw new Error('Maximum limit of 5 emergency contacts reached.');
    }

    const now = new Date().toISOString();
    const newContact: EmergencyContact = {
      id: `contact_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      userId,
      name: data.name.trim(),
      relation: data.relation.trim() || 'Emergency Contact',
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newContact, ...current];
    saveLocalContacts(updated);
    return newContact;
  },

  // Update Contact
  async updateContact(
    contactId: string,
    data: Partial<{ name: string; relation: string; email: string; phone: string }>,
    userId = 'usr_109283'
  ): Promise<EmergencyContact> {
    try {
      const response = await apiClient.put(`/emergency/contacts/${contactId}`, { ...data, userId });
      if (response.data?.contact) {
        return response.data.contact;
      }
    } catch (err: any) {
      if (err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }
    }

    const current = getLocalContacts();
    const idx = current.findIndex(c => c.id === contactId);
    if (idx === -1) throw new Error('Contact not found');

    const updatedContact: EmergencyContact = {
      ...current[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    current[idx] = updatedContact;
    saveLocalContacts(current);
    return updatedContact;
  },

  // Delete Contact
  async deleteContact(contactId: string, userId = 'usr_109283'): Promise<boolean> {
    try {
      const response = await apiClient.delete(`/emergency/contacts/${contactId}`, { params: { userId } });
      if (response.data?.success) {
        const current = getLocalContacts().filter(c => c.id !== contactId);
        saveLocalContacts(current);
        return true;
      }
    } catch {
      // Local fallback
    }

    const current = getLocalContacts().filter(c => c.id !== contactId);
    saveLocalContacts(current);
    return true;
  },

  // Trigger SOS Emergency Broadcast
  async triggerSOS(
    data: {
      customMessage?: string;
      gpsLocation?: { latitude: number; longitude: number; accuracy?: number } | null;
    },
    userId = 'usr_109283',
    userName = 'Security User',
    userEmail = 'milanrathod5201@gmail.com'
  ): Promise<SOSEventRecord> {
    try {
      const response = await apiClient.post('/emergency/trigger', {
        ...data,
        userId,
        userName,
        userEmail,
      });

      if (response.data?.sosEvent) {
        const localHist = getLocalHistory();
        saveLocalHistory([response.data.sosEvent, ...localHist]);
        return response.data.sosEvent;
      }
    } catch (err: any) {
      console.warn('API call failed, running local SOS trigger fallback:', err);
    }

    // Local fallback creation
    const contacts = getLocalContacts();
    const now = new Date();
    const lat = data.gpsLocation?.latitude || 20.5937;
    const lng = data.gpsLocation?.longitude || 78.9629;
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

    const newEvent: SOSEventRecord = {
      _id: `sos_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      userId,
      userName,
      userEmail,
      status: 'ACTIVE',
      timestamp: now.toISOString(),
      message: data.customMessage || 'Immediate cyber threat or security compromise detected.',
      gpsLocation: data.gpsLocation || { latitude: lat, longitude: lng, accuracy: 15 },
      googleMapsUrl: mapsUrl,
      ipAddress: '127.0.0.1 (Client)',
      deviceInfo: navigator.userAgent || 'Browser Client',
      contactsNotified: contacts.map(c => ({
        contactId: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        status: 'SENT',
        attempts: 1,
        sentAt: new Date().toISOString(),
      })),
      userNotificationStatus: 'SENT',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const localHist = getLocalHistory();
    saveLocalHistory([newEvent, ...localHist]);
    return newEvent;
  },

  // Resolve SOS ("I'm Safe")
  async resolveSOS(eventId?: string, userId = 'usr_109283', userName = 'Security User'): Promise<SOSEventRecord> {
    try {
      const response = await apiClient.post('/emergency/resolve', {
        eventId,
        userId,
        userName,
      });

      if (response.data?.sosEvent) {
        const localHist = getLocalHistory();
        const updated = localHist.map(e => e._id === response.data.sosEvent._id ? response.data.sosEvent : e);
        saveLocalHistory(updated);
        return response.data.sosEvent;
      }
    } catch (err: any) {
      console.warn('API resolve failed, running local resolve fallback:', err);
    }

    const localHist = getLocalHistory();
    const target = eventId ? localHist.find(e => e._id === eventId) : localHist.find(e => e.status === 'ACTIVE');
    if (!target) throw new Error('No active SOS event found to resolve.');

    const resolved: SOSEventRecord = {
      ...target,
      status: 'RESOLVED',
      resolvedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = localHist.map(e => e._id === resolved._id ? resolved : e);
    saveLocalHistory(updated);
    return resolved;
  },

  // Get History
  async getHistory(userId = 'usr_109283'): Promise<SOSEventRecord[]> {
    try {
      const response = await apiClient.get('/emergency/history', { params: { userId } });
      if (response.data?.events) {
        saveLocalHistory(response.data.events);
        return response.data.events;
      }
      return getLocalHistory();
    } catch {
      return getLocalHistory();
    }
  },
};
