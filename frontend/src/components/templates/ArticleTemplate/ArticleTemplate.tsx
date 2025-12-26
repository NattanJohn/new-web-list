import React from 'react';
import { Header } from '../../organisms/Header/Header';
import { Footer } from '../../organisms/Footer/Footer';
import styles from './ArticleTemplate.module.scss';

interface ArticleTemplateProps {
  children: React.ReactNode;
}

export const ArticleTemplate = ({ children }: ArticleTemplateProps) => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} headingLevel="h2" />
      
      <main className={styles.mainContent}>
        {children}
      </main>

      <Footer className={styles.footer} />
    </div>
  );
};
