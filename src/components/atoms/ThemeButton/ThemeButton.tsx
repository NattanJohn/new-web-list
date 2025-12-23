'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeButton.module.scss';

export const ThemeButton = () => {
  const { toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button 
        className={styles.mainButton} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Mudar tema"
      >
        🖌️
      </button>
      {isOpen && (
        <div className={styles.menu}>
          <button onClick={() => { toggleTheme('light'); setIsOpen(false); }} title="Modo Claro">
            ☀️
          </button>
          <button onClick={() => { toggleTheme('dark'); setIsOpen(false); }} title="Modo Escuro">
            🌙
          </button>
          <button onClick={() => { toggleTheme('high-contrast'); setIsOpen(false); }} title="Alto Contraste">
            👁️
          </button>
        </div>
      )}
    </div>
  );
};