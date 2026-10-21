import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false, // Default unauthenticated for Auth flow demonstration
  user: null,
  login: (email) =>
    set({
      isAuthenticated: true,
      user: {
        id: 'usr_001',
        name: 'Ananya Sharma',
        email,
      },
    }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
