import React from 'react';
import { Header } from '../../organisms/Header/Header';
import { Footer } from '../../organisms/Footer/Footer';
import styles from './HomeTemplate.module.scss';

interface HomeTemplateProps {
  children: React.ReactNode;
}

export const HomeTemplate = ({ children }: HomeTemplateProps) => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      
      <main className={styles.mainContent}>
        {children}
      </main>

      <Footer className={styles.footer} />
    </div>
  );
};