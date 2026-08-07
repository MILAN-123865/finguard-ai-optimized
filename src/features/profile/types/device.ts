export interface AuthorizedDevice {
  id: string;
  name: string;
  type: 'desktop' | 'mobile' | 'tablet';
  os: string;
  browser: string;
  model: string;
  ipAddress: string;
  location: {
    city: string;
    country: string;
    coords: string;
  };
  loginTime: string;
  lastActive: string;
  status: 'current' | 'active' | 'inactive';
  isCurrentSession: boolean;
  isTrusted: boolean;
  securityLevel: 'High' | 'Medium' | 'Low';
  mfaEnabled: boolean;
  riskScore: number; // 0 - 100 percentage
  platform: 'windows' | 'android' | 'apple' | 'linux';
  screenResolution: string;
  timezone: string;
  language: string;
  networkType: string;
  sessionTokenId: string;
  authMethod: string;
  firstLogin: string;
}

export interface LoginHistoryEntry {
  id: string;
  date: string;
  time: string;
  city: string;
  country: string;
  ip: string;
  browser: string;
  os: string;
  status: 'Success' | 'Warning' | 'Blocked';
  deviceName: string;
}
