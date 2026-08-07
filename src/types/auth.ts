export interface User {
  _id: string;
  id?: string;
  fullName: string;
  name?: string;
  email: string;
  emailVerified: boolean;
  provider: 'email' | 'google';
  googleId?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt?: string;
  lastLogin?: string;
}

export interface SentEmailItem {
  id: string;
  to: string;
  subject: string;
  type: 'VERIFICATION_OTP' | 'PASSWORD_RESET' | 'WELCOME' | 'NOTIFICATION';
  code?: string;
  bodyHtml: string;
  sentAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  emailVerified: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string,
    acceptTerms?: boolean
  ) => Promise<{ success: boolean; message: string; email: string }>;
  logout: () => Promise<void>;
  googleLogin: (details: { googleId?: string; email: string; fullName: string; avatarUrl?: string }) => Promise<User>;
  verifyEmail: (email: string, otp: string) => Promise<User>;
  sendVerification: (email: string) => Promise<string>;
  resendOTP: (email: string) => Promise<string>;
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (
    email: string,
    otp: string,
    newPassword: string,
    confirmPassword?: string
  ) => Promise<string>;
  refreshUser: () => Promise<User | null>;
  updateProfile: (updates: { fullName?: string; avatarUrl?: string }) => Promise<User>;
}
