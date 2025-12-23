'use client';

import { useRouter } from 'next/navigation';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button 
      className={styles.button} 
      onClick={() => router.back()}
      aria-label="Voltar para a página anterior"
    >
      <span className={styles.icon}>←</span> Voltar
    </button>
  );
};