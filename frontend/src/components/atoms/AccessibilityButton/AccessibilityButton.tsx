'use client';

import { useState, useRef } from 'react';
import styles from './AccessibilityButton.module.scss';
import { Eye } from 'lucide-react';
import { AccessibilityModal } from '@/components/organisms/AccessibilityModal/AccessibilityModal';

export const AccessibilityButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setIsModalOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <button 
          className={styles.trigger} 
          onClick={() => setIsModalOpen(true)}
          ref={triggerRef}
          aria-label="Abrir menu de acessibilidade"
        >
          <span>Acessibilidade</span>
          <Eye size={24} />
        </button>
      </div>
      
      {isModalOpen && <AccessibilityModal onClose={handleClose} />}
    </>
  );
};