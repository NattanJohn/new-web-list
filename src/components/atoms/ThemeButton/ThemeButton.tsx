import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeButton.module.scss';

export const ThemeButton = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <button onClick={() => toggleTheme('light')}>Claro</button>
      <button onClick={() => toggleTheme('dark')}>Escuro</button>
      <button onClick={() => toggleTheme('high-contrast')}>Alto Contraste</button>
    </div>
  );
};