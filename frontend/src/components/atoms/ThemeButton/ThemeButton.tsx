"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { SunIcon, MoonIcon, ContrastIcon } from "@/components/atoms/Icons";
import styles from "./ThemeButton.module.scss";

const themeOptions = [
  { id: "light", icon: SunIcon, label: "Modo Claro" },
  { id: "dark", icon: MoonIcon, label: "Modo Escuro" },
  { id: "high-contrast", icon: ContrastIcon, label: "Alto Contraste" },
] as const;

export const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const renderCurrentIcon = () => {
    switch (theme) {
      case "dark":
        return <MoonIcon size={18} />;
      case "high-contrast":
        return <ContrastIcon size={18} />;
      default:
        return <SunIcon size={18} />;
    }
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        className={styles.mainButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Menu de temas"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className={styles.iconSwap} key={theme}>
          {renderCurrentIcon()}
        </span>
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu" aria-label="Opções de tema">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = theme === option.id;

            return (
              <button
                key={option.id}
                role="menuitem"
                onClick={() => {
                  toggleTheme(option.id);
                  setIsOpen(false);
                }}
                className={isSelected ? styles.active : undefined}
                aria-current={isSelected ? "true" : undefined}
                title={option.label}
                aria-label={option.label}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};