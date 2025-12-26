import Link from 'next/link';
import { Title } from '../../atoms/Title/Title';
import { PostImage } from '../../atoms/PostImage/PostImage';
import styles from './PostCard.module.scss';
import type { Article } from '@/types';
import { formatDate } from '../../../utils/formatDate';
import { getImageFallbackUrl } from '@/utils/imageOptimization';

type PostCardProps = Pick<Article, 'slug' | 'title' | 'summary' | 'date' | 'image'> & {
  priority?: boolean;
};

export const PostCard = ({ title, summary = '', date = '', slug, image, priority = false }: PostCardProps) => {
  const formattedDate = formatDate(date);
  // Usar fallback SVG otimizado ao invés de via.placeholder.com
  const imageUrl = image || getImageFallbackUrl();
  const cardNumber = slug.charCodeAt(0) % 1000; // Gera seed único baseado no slug

  return (
    <article 
      className={styles.card}
      itemScope 
      itemType="https://schema.org/NewsArticle"
    >
      <Link href={`/article/${slug}`} className={styles.link}>
        <PostImage 
          src={imageUrl} 
          alt={title}
          priority={priority}
          width={800}
          height={450}
        />
        
        <div className={styles.content}>
          <header>
            <time dateTime={date} className={styles.date} itemProp="datePublished">
              {formattedDate}
            </time>
            <Title tag="h2" className={styles.title}>
              <span itemProp="headline">{title}</span>
            </Title>
          </header>
          
          <p className={styles.summary} itemProp="description">{summary}</p>
          
          <span className={styles.readMore} aria-label={`Leia mais sobre ${title}`}>
            Leia mais →
          </span>
        </div>
      </Link>

      {/* Metadata Schema.org otimizada */}
      <meta itemProp="image" content={imageUrl} />
    </article>
  );
};