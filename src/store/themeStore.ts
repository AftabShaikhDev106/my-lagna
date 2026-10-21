import { create } from 'zustand';
import { ThemeMode } from '../types/common';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'light',
  setMode: (mode) => set({ mode }),
  toggleTheme: () => {
    const current = get().mode;
    set({ mode: current === 'dark' ? 'light' : 'dark' });
  },
}));
