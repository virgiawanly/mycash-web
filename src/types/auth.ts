import { User } from "./users";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthStateLoaded: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  loadAuthState: () => void;
}
