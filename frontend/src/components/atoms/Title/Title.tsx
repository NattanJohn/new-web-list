import styles from './Title.module.scss';

interface TitleProps {
  children: React.ReactNode;
  tag?: 'h1' | 'h2' | 'h3';
}

export const Title = ({ children, tag: Tag = 'h1' }: TitleProps) => {
  return <Tag className={styles.title}>{children}</Tag>;
};