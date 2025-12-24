'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

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
  lineHeight: 1.6,
  highContrast: false,
  grayscale: false,
};

const STORAGE_KEY = 'gazeta-news-acc';

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
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

    // Aplica os atributos de tema e filtros
    root.setAttribute('data-theme', config.highContrast ? 'high-contrast' : 'light');
    root.style.filter = config.grayscale ? 'grayscale(1)' : 'none';

    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

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