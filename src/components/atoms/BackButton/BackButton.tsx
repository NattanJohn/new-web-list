'use client';

import { useRouter } from 'next/navigation';
import styles from './BackButton.module.scss';
import { ArrowLeftIcon } from '@/components/atoms/Icons';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button 
      className={styles.button} 
      onClick={() => router.back()}
      aria-label="Voltar para a página anterior"
    >
      <ArrowLeftIcon size={18}/>
      <span>Voltar</span>
    </button>
  );
};