import fs from 'fs';
import path from 'path';

export interface UserRecord {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
  otp?: string | null;
  otpExpiry?: string | null;
  resetOTP?: string | null;
  resetOTPExpiry?: string | null;
  avatarUrl?: string;
  provider: 'email' | 'google';
  googleId?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

const usersFile = path.join(process.cwd(), 'uploads', 'users_db.json');

// Ensure directory exists
const ensureDir = () => {
  const dir = path.dirname(usersFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export function loadUsers(): UserRecord[] {
  ensureDir();
  try {
    if (fs.existsSync(usersFile)) {
      const data = fs.readFileSync(usersFile, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading users_db.json:', err);
  }
  return [];
}

export function saveUsers(users: UserRecord[]): void {
  ensureDir();
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing users_db.json:', err);
  }
}

export function findUserByEmail(email: string): UserRecord | undefined {
  const users = loadUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserByGoogleId(googleId: string): UserRecord | undefined {
  const users = loadUsers();
  return users.find(u => u.googleId === googleId);
}

export function findUserById(id: string): UserRecord | undefined {
  const users = loadUsers();
  return users.find(u => u._id === id);
}

export function createUser(userData: Omit<UserRecord, '_id' | 'createdAt' | 'updatedAt'>): UserRecord {
  const users = loadUsers();
  const now = new Date().toISOString();
  const newUser: UserRecord = {
    ...userData,
    _id: `usr_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    createdAt: now,
    updatedAt: now,
    lastLogin: now,
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function updateUser(id: string, updates: Partial<UserRecord>): UserRecord | null {
  const users = loadUsers();
  const index = users.findIndex(u => u._id === id);
  if (index === -1) return null;

  users[index] = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveUsers(users);
  return users[index];
}
