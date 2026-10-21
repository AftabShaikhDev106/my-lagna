import { create } from 'zustand';

interface UiState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilterCount: number;
  setActiveFilterCount: (count: number) => void;
}

export const useUiStore = create<UiState>((set) => ({
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  activeFilterCount: 0,
  setActiveFilterCount: (activeFilterCount) => set({ activeFilterCount }),
}));
