import Image from 'next/image';
import { getImageFallbackUrl, getImageQuality, isValidImageUrl, OPTIMIZED_BLUR_DATA_URL } from '@/utils/imageOptimization';
import styles from './PostImage.module.scss';

interface PostImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export const PostImage = ({ 
  src, 
  alt, 
  priority = false,
  width = 800,
  height = 450,
}: PostImageProps) => {
  const isDataUrl = typeof src === 'string' && src.startsWith('data:');
  const imageSrc = isDataUrl || isValidImageUrl(src) ? src : getImageFallbackUrl();
  const quality = getImageQuality();

  return (
    <div className={styles.imageWrapper} data-aspect-ratio={`${width}/${height}`}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 80vw, 1200px"
        priority={priority}
        fetchPriority={priority ? 'high' : 'auto'}
        loading={priority ? 'eager' : 'lazy'}
        quality={quality}
        placeholder="blur"
        blurDataURL={OPTIMIZED_BLUR_DATA_URL}
        className={styles.image}
      />
    </div>
  );
};