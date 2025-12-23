import React from 'react';
import { ThemeButton } from '../../atoms/ThemeButton/ThemeButton';
import { Title } from '../../atoms/Title/Title';
import styles from './HomeTemplate.module.scss';

interface HomeTemplateProps {
  children: React.ReactNode;
}

export const HomeTemplate = ({ children }: HomeTemplateProps) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Title tag="h1">Gazeta News</Title>
        <ThemeButton />
      </header>
      
      <main className={styles.mainContent}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>© 2025 Gazeta do Povo - Teste Fullstack JR</p>
      </footer>
    </div>
  );
};