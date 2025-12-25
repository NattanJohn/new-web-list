'use client';

import { useAccessibility, ACCESSIBILITY_LEVELS } from '@/context/AccessibilityContext';
import styles from './AccessibilityModal.module.scss';
import { X, RotateCcw, Contrast, Ghost } from 'lucide-react';

export const AccessibilityModal = ({ onClose }: { onClose: () => void }) => {
  const { 
    fontSize, 
    lineHeight, 
    highContrast, 
    grayscale, 
    updateConfig, 
    resetConfig 
  } = useAccessibility();

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <header className={styles.header}>
          <h2>Acessibilidade</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
            <X size={24} />
          </button>
        </header>

        <div className={styles.section}>
          <label>Tamanho do Texto</label>
          <div className={styles.grid}>
            {ACCESSIBILITY_LEVELS.fontSize.map(v => (
              <button 
                key={v} 
                className={`${styles.optionBtn} ${fontSize === v ? styles.active : ''}`}
                onClick={() => updateConfig('fontSize', v)}
              >
                {v === 1 ? 'Padrão' : `${v}x`}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <label>Espaçamento entre Linhas</label>
          <div className={styles.grid}>
            {ACCESSIBILITY_LEVELS.lineHeight.map(v => (
              <button
                key={String(v)}
                className={`${styles.optionBtn} ${lineHeight === v ? styles.active : ''}`}
                onClick={() => updateConfig('lineHeight', v)}
              >
                {v === 'normal' ? 'Padrão' : `${v}x`}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <label>Visualização</label>
          <div className={styles.toggleRow}>
            <span>Alto Contraste</span>
            <button 
              className={`${styles.toggleBtn} ${highContrast ? styles.toggleActive : ''}`}
              onClick={() => updateConfig('highContrast', !highContrast)}
            >
              <Contrast size={18} />
              {highContrast ? 'Ativado' : 'Desativado'}
            </button>
          </div>

          <div className={styles.toggleRow}>
            <span>Modo Escala de Cinza</span>
            <button 
              className={`${styles.toggleBtn} ${grayscale ? styles.toggleActive : ''}`}
              onClick={() => updateConfig('grayscale', !grayscale)}
            >
              <Ghost size={18} />
              {grayscale ? 'Ativado' : 'Desativado'}
            </button>
          </div>
        </div>

        <footer className={styles.footer}>
          <button className={styles.resetBtn} onClick={resetConfig}>
            <RotateCcw size={16} />
            Resetar Configurações
          </button>
        </footer>
      </div>
    </div>
  );
};