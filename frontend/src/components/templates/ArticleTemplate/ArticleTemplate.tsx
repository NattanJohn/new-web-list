import React from 'react';
import { Title } from '../../atoms/Title/Title';
import styles from './ArticleTemplate.module.scss';

interface ArticleTemplateProps {
  children: React.ReactNode;
}

export const ArticleTemplate = ({ children }: ArticleTemplateProps) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Title tag="h2">Gazeta News</Title>
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
