'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { safeLocalStorageSet, safeLocalStorageGet } from '@/utils/localStorage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
  toggleTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const VALID_THEMES: Theme[] = ['light', 'dark'];

export const ThemeProvider = ({ children, initialTheme }: { children: React.ReactNode; initialTheme?: Theme }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (initialTheme) return initialTheme;
    if (typeof window !== 'undefined') {
      const saved = safeLocalStorageGet('gazeta-theme');
      if (saved && VALID_THEMES.includes(saved as Theme)) {
        return saved as Theme;
      }
    }
    return 'light';
  });
  const didMount = useRef(false);

  const setThemeCookie = (value: Theme) => {
    try {
      document.cookie = `gazeta-theme=${value}; max-age=31536000; path=/; samesite=lax`;
    } catch (e) {
      void e;
    }
  };

  useEffect(() => {
    try {
      const root = document.documentElement;
      const currentAttr = root.getAttribute('data-theme') || '';
      const next = currentAttr.includes('-high-contrast') ? `${theme}-high-contrast` : theme;
      root.setAttribute('data-theme', next);
      root.style.backgroundColor = next.startsWith('dark') ? '#121212' : '#ffffff';
    } catch (e) {
      void e;
    }
  }, [theme]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    safeLocalStorageSet('gazeta-theme', theme);
    setThemeCookie(theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    if (!VALID_THEMES.includes(newTheme)) return;
    setThemeState(newTheme);
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