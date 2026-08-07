import React, { createContext, useState, useEffect, useCallback } from 'react';
import { User, AuthContextType } from '../types/auth';
import { authApi, removeStoredToken, getStoredToken } from '../services/apiAuth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Restore session on initial mount
  const refreshUser = useCallback(async (): Promise<User | null> => {
    const token = getStoredToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return null;
    }

    try {
      const currentUser = await authApi.getMe();
      if (currentUser) {
        setUser(currentUser);
        return currentUser;
      } else {
        setUser(null);
        removeStoredToken();
        return null;
      }
    } catch (err) {
      setUser(null);
      removeStoredToken();
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const res = await authApi.login(email, password);
      setUser(res.user);
      return res.user;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string,
    acceptTerms: boolean = true
  ) => {
    setLoading(true);
    try {
      const res = await authApi.register(fullName, email, password, confirmPassword, acceptTerms);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      removeStoredToken();
      setLoading(false);
    }
  };

  const googleLogin = async (details: { googleId?: string; email: string; fullName: string; avatarUrl?: string }): Promise<User> => {
    setLoading(true);
    try {
      const res = await authApi.googleLogin(details);
      setUser(res.user);
      return res.user;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (email: string, otp: string): Promise<User> => {
    setLoading(true);
    try {
      const res = await authApi.verifyEmail(email, otp);
      setUser(res.user);
      return res.user;
    } finally {
      setLoading(false);
    }
  };

  const sendVerification = async (email: string): Promise<string> => {
    const res = await authApi.resendOTP(email);
    return res.message;
  };

  const resendOTP = async (email: string): Promise<string> => {
    const res = await authApi.resendOTP(email);
    return res.message;
  };

  const forgotPassword = async (email: string): Promise<string> => {
    const res = await authApi.forgotPassword(email);
    return res.message;
  };

  const resetPassword = async (
    email: string,
    otp: string,
    newPassword: string,
    confirmPassword?: string
  ): Promise<string> => {
    const res = await authApi.resetPassword(email, otp, newPassword, confirmPassword);
    return res.message;
  };

  const updateProfile = async (updates: { fullName?: string; avatarUrl?: string }): Promise<User> => {
    const res = await authApi.updateProfile(updates);
    setUser(res.user);
    return res.user;
  };

  const emailVerified = Boolean(user && user.emailVerified);
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        emailVerified,
        login,
        signup,
        logout,
        googleLogin,
        verifyEmail,
        sendVerification,
        resendOTP,
        forgotPassword,
        resetPassword,
        refreshUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
