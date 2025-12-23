import styles from './Skeleton.module.scss';

export const Skeleton = ({ width, height }: { width?: string, height?: string }) => {
  return (
    <div 
      className={styles.skeleton} 
      style={{ width, height }} 
    />
  );
};