'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type AccessibilityState = {
  fontSize: number;
  lineHeight: number;
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
  lineHeight: 1.6,
  highContrast: false,
  grayscale: false,
};

const STORAGE_KEY = 'gazeta-news-acc';

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<AccessibilityState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return initialConfig;
        }
      }
    }
    return initialConfig;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--text-scale', config.fontSize.toString());
    root.style.setProperty('--content-line-height', config.lineHeight.toString());
    root.setAttribute('data-theme', config.highContrast ? 'high-contrast' : 'light');
    root.style.filter = config.grayscale ? 'grayscale(1)' : 'none';

    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const updateConfig = <K extends keyof AccessibilityState>(
    key: K, 
    value: AccessibilityState[K]
  ) => {
    setConfig(prev => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
  };

  const resetConfig = () => {
    setConfig(initialConfig);
  };

  return (
    <AccessibilityContext.Provider value={{ ...config, updateConfig, resetConfig }}>
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