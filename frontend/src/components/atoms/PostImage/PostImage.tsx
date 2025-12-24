import Image from 'next/image';
import styles from './PostImage.module.scss';

interface PostImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export const PostImage = ({ src, alt, priority = false }: PostImageProps) => {
  return (
    <div className={styles.imageWrapper}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </div>
  );
};