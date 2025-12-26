"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useTheme } from "./ThemeContext";
import { safeLocalStorageGet, safeLocalStorageSet } from "@/utils/localStorage";

type AccessibilityState = {
  fontSize: number;
  lineHeight: number | "normal";
  highContrast: boolean;
  grayscale: boolean;
};

type AccessibilityContextType = AccessibilityState & {
  updateConfig: <K extends keyof AccessibilityState>(
    key: K,
    value: AccessibilityState[K]
  ) => void;
  resetConfig: () => void;
};

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export const initialConfig: AccessibilityState = {
  fontSize: 1,
  lineHeight: "normal",
  highContrast: false,
  grayscale: false,
};

export const ACCESSIBILITY_LEVELS = {
  fontSize: [1, 1.25, 1.5, 1.75, 2] as const,
  lineHeight: ["normal", 1.3, 1.6, 2] as const,
} as const;

const STORAGE_KEY = "gazeta-news-acc";

export const AccessibilityProvider = ({
  children,
  initialHighContrast,
}: {
  children: React.ReactNode;
  initialHighContrast?: boolean;
}) => {
  const { theme } = useTheme();

  const [config, setConfig] = useState<AccessibilityState>(() => {
    if (typeof window === "undefined") {
      return { ...initialConfig, highContrast: initialHighContrast ?? initialConfig.highContrast };
    }

    const saved = safeLocalStorageGet(STORAGE_KEY);
    if (!saved) return initialConfig;

    try {
      return JSON.parse(saved);
    } catch {
      return initialHighContrast
        ? { ...initialConfig, highContrast: true }
        : initialConfig;
    }
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const updatedConfig = JSON.parse(e.newValue);
          setConfig(updatedConfig);
        } catch (error) {
          console.error("Erro ao sincronizar AccessibilityContext:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const styles: Record<string, string> = {
      "--text-scale": config.fontSize.toString(),
      "--content-line-height":
        typeof config.lineHeight === "number"
          ? config.lineHeight.toString()
          : config.lineHeight,
    };

    Object.entries(styles).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });

    if (config.highContrast) {
      root.setAttribute("data-theme", `${theme}-high-contrast`);
    } else {
      root.setAttribute("data-theme", theme);
    }

    root.style.filter = config.grayscale ? "grayscale(1)" : "none";

    safeLocalStorageSet(STORAGE_KEY, JSON.stringify(config));

    try {
      document.cookie = config.highContrast
        ? `gazeta-acc-high-contrast=1; max-age=31536000; path=/; samesite=lax`
        : `gazeta-acc-high-contrast=; max-age=0; path=/; samesite=lax`;
    } catch (e) {
      void e;
    }
  }, [config, theme]);

  const updateConfig = useCallback(
    <K extends keyof AccessibilityState>(
      key: K,
      value: AccessibilityState[K]
    ) => {
      setConfig((prev) =>
        prev[key] === value ? prev : { ...prev, [key]: value }
      );
    },
    []
  );

  const resetConfig = useCallback(() => {
    setConfig(initialConfig);
  }, []);

  const value = useMemo(
    () => ({
      ...config,
      updateConfig,
      resetConfig,
    }),
    [config, updateConfig, resetConfig]
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility deve ser usado dentro de um AccessibilityProvider"
    );
  }
  return context;
};