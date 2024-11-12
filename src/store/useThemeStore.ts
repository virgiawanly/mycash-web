import { create } from 'zustand';

export interface ThemeState {
  theme: 'dark' | 'light' | 'system';
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
  loadTheme: () => void;
}

const applyTheme = (theme: 'dark' | 'light' | 'system') => {
  const root = document.documentElement;

  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
    root.classList.remove('light');
    root.dataset.theme = 'dark';
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
    root.dataset.theme = 'light';
  }
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  setTheme: (theme) => {
    set({ theme });
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  },
  loadTheme: () => {
    const savedTheme = (localStorage.getItem('theme') ?? 'system') as 'dark' | 'light' | 'system';
    applyTheme(savedTheme);
    set({ theme: savedTheme });
  },
}));
