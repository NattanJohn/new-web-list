'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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
    try {
      const saved = localStorage.getItem('gazeta-theme');
      if (saved && VALID_THEMES.includes(saved as Theme)) return saved as Theme;
    } catch (e) {
      void e;
    }
    return 'light';
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      void e;
    }
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    if (!VALID_THEMES.includes(newTheme)) return;
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Reset high contrast when changing theme
    try {
      const accConfig = localStorage.getItem('gazeta-news-acc');
      if (accConfig) {
        const config = JSON.parse(accConfig);
        config.highContrast = false;
        localStorage.setItem('gazeta-news-acc', JSON.stringify(config));
      }
    } catch (e) {
      void e;
    }
    
    try {
      localStorage.setItem('gazeta-theme', newTheme);
    } catch (e) {
      void e;
    }
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