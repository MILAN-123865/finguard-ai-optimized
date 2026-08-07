import { apiClient } from "../config/api";
import { UserProfile } from "../types";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const authService = {
  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: UserProfile }> {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });

    const token =
      response.data.token ??
      response.data.access_token;

    const user =
      response.data.user ??
      response.data.profile ??
      null;

    localStorage.setItem(TOKEN_KEY, token);

    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    apiClient.defaults.headers.common.Authorization =
      `Bearer ${token}`;

    return {
      token,
      user,
    };
  },

  async register(
    fullName: string,
    email: string,
    password: string
  ): Promise<{ token: string; user: UserProfile }> {
    const response = await apiClient.post("/auth/register", {
      name: fullName,
      email,
      password,
    });

    const token =
      response.data.token ??
      response.data.access_token;

    const user =
      response.data.user ??
      response.data.profile ??
      null;

    localStorage.setItem(TOKEN_KEY, token);

    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    apiClient.defaults.headers.common.Authorization =
      `Bearer ${token}`;

    return {
      token,
      user,
    };
  },

  async getCurrentUser() {
    const response =
      await apiClient.get("/auth/me");

    return response.data;
  },

  async updateApiKey() {
    const response =
      await apiClient.post("/auth/api-key");

    return response.data.apiKey;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    delete apiClient.defaults.headers.common.Authorization;
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    const user =
      localStorage.getItem(USER_KEY);

    if (!user) return null;

    return JSON.parse(user);
  },

  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};