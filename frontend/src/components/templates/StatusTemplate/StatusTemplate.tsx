import React from 'react';
import { Header } from '../../organisms/Header/Header';
import { Footer } from '../../organisms/Footer/Footer';
import styles from './StatusTemplate.module.scss';

interface StatusTemplateProps {
  children: React.ReactNode;
}

export const StatusTemplate = ({ children }: StatusTemplateProps) => {
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
