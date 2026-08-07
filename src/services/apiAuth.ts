import axios from 'axios';
import { User, SentEmailItem } from '../types/auth';

const TOKEN_KEY = 'finguard_jwt_token';
const LEGACY_TOKEN_KEY = 'finguard_token';

export const getStoredToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY);
};

export const setStoredToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(LEGACY_TOKEN_KEY, token);
};

export const removeStoredToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LEGACY_TOKEN_KEY);
};

// Create axios client with default headers
const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  async register(fullName: string, email: string, password: string, confirmPassword: string, acceptTerms: boolean = true) {
    const res = await api.post('/api/auth/register', {
      fullName,
      email,
      password,
      confirmPassword,
      acceptTerms,
    });
    return res.data as { success: boolean; message: string; email: string; requiresVerification: boolean };
  },

  async login(email: string, password: string) {
    const res = await api.post('/api/auth/login', { email, password });
    if (res.data.token) {
      setStoredToken(res.data.token);
    }
    return res.data as { success: boolean; token: string; user: User };
  },

  async verifyEmail(email: string, otp: string) {
    const res = await api.post('/api/auth/verify-email', { email, otp });
    if (res.data.token) {
      setStoredToken(res.data.token);
    }
    return res.data as { success: boolean; message: string; token: string; user: User };
  },

  async resendOTP(email: string) {
    const res = await api.post('/api/auth/resend-otp', { email });
    return res.data as { success: boolean; message: string };
  },

  async forgotPassword(email: string) {
    const res = await api.post('/api/auth/forgot-password', { email });
    return res.data as { success: boolean; message: string; email?: string };
  },

  async resetPassword(email: string, otp: string, newPassword: string, confirmPassword?: string) {
    const res = await api.post('/api/auth/reset-password', { email, otp, newPassword, confirmPassword });
    return res.data as { success: boolean; message: string };
  },

  async googleLogin(details: { googleId?: string; email: string; fullName: string; avatarUrl?: string }) {
    const res = await api.post('/api/auth/google', details);
    if (res.data.token) {
      setStoredToken(res.data.token);
    }
    return res.data as { success: boolean; token: string; user: User };
  },

  async getMe() {
    const token = getStoredToken();
    if (!token) return null;
    try {
      const res = await api.get('/api/auth/me');
      return res.data.user as User;
    } catch (err) {
      removeStoredToken();
      return null;
    }
  },

  async logout() {
    try {
      await api.post('/api/auth/logout');
    } catch (err) {
      // Ignore network failure on logout
    } finally {
      removeStoredToken();
    }
  },

  async updateProfile(updates: { fullName?: string; avatarUrl?: string }) {
    const res = await api.put('/api/auth/profile', updates);
    return res.data as { success: boolean; message: string; user: User };
  },

  async fetchSentEmails() {
    const res = await api.get('/api/auth/emails');
    return res.data.emails as SentEmailItem[];
  },
};
