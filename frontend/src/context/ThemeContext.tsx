'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { safeLocalStorageSet, safeLocalStorageGet } from '@/utils/localStorage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
  toggleTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const VALID_THEMES: Theme[] = ['light', 'dark'];

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = safeLocalStorageGet('gazeta-theme');
    if (saved && VALID_THEMES.includes(saved as Theme)) return saved as Theme;
    return 'light';
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      const currentAttr = root.getAttribute('data-theme') || '';
      
      if (currentAttr.includes('-high-contrast')) {
        root.setAttribute('data-theme', `${theme}-high-contrast`);
      } else {
        root.setAttribute('data-theme', theme);
      }
    } catch (e) {
      void e;
    }
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    if (!VALID_THEMES.includes(newTheme)) return;
    setThemeState(newTheme);
    safeLocalStorageSet('gazeta-theme', newTheme);
  }, []);

  const toggleTheme = (newTheme: Theme) => setTheme(newTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className={`theme-wrapper ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  return context;
};