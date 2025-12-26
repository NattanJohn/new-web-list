import Image from 'next/image';
import { getImageFallbackUrl, getImageQuality, isValidImageUrl } from '@/utils/imageOptimization';
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
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZjVmNWY1IiB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIvPjwvc3ZnPg=="
        className={styles.image}
        onError={(result) => {
          // Fallback em caso de erro no carregamento
          result.currentTarget.src = getImageFallbackUrl();
        }}
      />
    </div>
  );
};