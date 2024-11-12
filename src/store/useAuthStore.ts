import { create } from "zustand";
import apiConfig from "@/config/api";
import { User } from "@/types/users";
import { AuthState } from "@/types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isAuthStateLoaded: false,

  login: (token: string, user: User) => {
    set({ token, user });

    localStorage.setItem(apiConfig.apiTokenIdentifier, token);
    localStorage.setItem(apiConfig.userProfileIdentifier, JSON.stringify(user));

    if (token && user) {
      set({ isAuthenticated: true });
    }
  },

  logout: () => {
    set({ token: null, user: null });
    set({ isAuthenticated: false });

    localStorage.removeItem(apiConfig.apiTokenIdentifier);
    localStorage.removeItem(apiConfig.userProfileIdentifier);
  },

  loadAuthState: () => {
    const storedToken =
      localStorage.getItem(apiConfig.apiTokenIdentifier) ?? null;
    const storedUser = JSON.parse(
      localStorage.getItem(apiConfig.userProfileIdentifier) || "{}"
    );

    if (storedToken && storedUser && Object.keys(storedUser).length) {
      set({
        user: storedUser,
        token: storedToken,
        isAuthenticated: true,
      });
    }

    set({ isAuthStateLoaded: true });
  },
}));
