import { Cpu, Lightbulb, Leaf, Tag } from 'lucide-react';
import styles from './CategoryTag.module.scss';

interface CategoryTagProps {
  label: string;
  className?: string;
}

type CategoryConfig = {
  icon: React.ComponentType<{ size?: number | string; strokeWidth?: number }>;
  token: 'tech' | 'innovation' | 'sustainability' | 'default';
};

const categoryMap: Record<string, CategoryConfig> = {
  Tecnologia: { icon: Cpu, token: 'tech' },
  Inovação: { icon: Lightbulb, token: 'innovation' },
  Sustentabilidade: { icon: Leaf, token: 'sustainability' },
  Geral: { icon: Tag, token: 'default' },
};

export const CategoryTag = ({ label, className }: CategoryTagProps) => {
  const config = categoryMap[label] || categoryMap['Geral'];
  const Icon = config.icon;
  const classes = className ? `${styles.tag} ${className}` : styles.tag;

  return (
    <span 
      className={classes}
      aria-label={`Categoria: ${label}`}
      data-category={config.token}
    >
      <span className={styles.icon}>
        <Icon size="1em" strokeWidth={2.5} />
      </span>
      {label}
    </span>
  );
};
