import styles from './Title.module.scss';

interface TitleProps {
  children: React.ReactNode;
  tag?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export const Title = ({ children, tag: Tag = 'h1', className }: TitleProps) => {
  const combinedClassName = className ? `${styles.title} ${className}` : styles.title;
  return <Tag className={combinedClassName}>{children}</Tag>;
};