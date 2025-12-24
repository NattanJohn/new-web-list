'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useTheme } from './ThemeContext';

type AccessibilityState = {
  fontSize: number;
  lineHeight: number | 'normal';
  highContrast: boolean;
  grayscale: boolean;
};

type AccessibilityContextType = AccessibilityState & {
  updateConfig: <K extends keyof AccessibilityState>(key: K, value: AccessibilityState[K]) => void;
  resetConfig: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const initialConfig: AccessibilityState = {
  fontSize: 1,
  lineHeight: 'normal',
  highContrast: false,
  grayscale: false,
};

const STORAGE_KEY = 'gazeta-news-acc';

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const [config, setConfig] = useState<AccessibilityState>(() => {
    if (typeof window === 'undefined') return initialConfig;
    
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialConfig;

    try {
      return JSON.parse(saved);
    } catch {
      return initialConfig;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    
    const styles: Record<string, string> = {
      '--text-scale': config.fontSize.toString(),
      '--content-line-height': typeof config.lineHeight === 'number' ? config.lineHeight.toString() : config.lineHeight,
    };

    Object.entries(styles).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });

    // Aplica alto contraste mantendo o tema selecionado
    if (config.highContrast) {
      root.setAttribute('data-theme', `${theme}-high-contrast`);
    } else {
      root.setAttribute('data-theme', theme);
    }

    root.style.filter = config.grayscale ? 'grayscale(1)' : 'none';

    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config, theme]);

  const updateConfig = useCallback(<K extends keyof AccessibilityState>(
    key: K, 
    value: AccessibilityState[K]
  ) => {
    setConfig(prev => (prev[key] === value ? prev : { ...prev, [key]: value }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(initialConfig);
  }, []);

  const value = useMemo(() => ({
    ...config,
    updateConfig,
    resetConfig
  }), [config, updateConfig, resetConfig]);

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility deve ser usado dentro de um AccessibilityProvider');
  }
  return context;
};