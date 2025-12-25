import React from 'react';
import { Title } from '../../atoms/Title/Title';
import styles from './StatusTemplate.module.scss';

interface StatusTemplateProps {
  children: React.ReactNode;
}

export const StatusTemplate = ({ children }: StatusTemplateProps) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Title tag="h1">Gazeta News</Title>
      </header>
      
      <main className={styles.mainContent}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>© 2025 Gazeta News - Nattan John Lana da Silva</p>
      </footer>
    </div>
  );
};
