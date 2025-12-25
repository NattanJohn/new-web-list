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
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Carregar tema do localStorage após hydration
  useEffect(() => {
    setMounted(true);
    const saved = safeLocalStorageGet('gazeta-theme');
    if (saved && VALID_THEMES.includes(saved as Theme)) {
      setThemeState(saved as Theme);
    }
  }, []);

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

  // Evitar flash: renderizar sem classe de tema até montar
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
        <div className="theme-wrapper">
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }

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