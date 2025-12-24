'use client';

import { useState } from 'react';
import styles from './AccessibilityButton.module.scss';
import { Eye } from 'lucide-react';
import { AccessibilityModal } from '@/components/organisms/AccessibilityModal/AccessibilityModal';

export const AccessibilityButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.wrapper}>
        <button 
          className={styles.trigger} 
          onClick={() => setIsModalOpen(true)}
          aria-label="Abrir menu de acessibilidade"
        >
          <Eye size={24} />
          <span>Acessibilidade</span>
        </button>
      </div>
      
      {isModalOpen && <AccessibilityModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};