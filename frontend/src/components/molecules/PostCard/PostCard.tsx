import Link from 'next/link';
import { Title } from '../../atoms/Title/Title';
import { PostImage } from '../../atoms/PostImage/PostImage';
import { CategoryTag } from '../../atoms/CategoryTag/CategoryTag';
import styles from './PostCard.module.scss';
import type { Article } from '@/types';
import { formatDate } from '../../../utils/formatDate';
import { getImageFallbackUrl } from '@/utils/imageOptimization';

type PostCardProps = Pick<Article, 'slug' | 'title' | 'summary' | 'date' | 'image' | 'category'> & {
  priority?: boolean;
};

export const PostCard = ({ title, summary = '', date = '', slug, image, category, priority = false }: PostCardProps) => {
  const formattedDate = formatDate(date);
  const imageUrl = image || getImageFallbackUrl();

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
            <div className={styles.meta}>
              <time dateTime={date} className={styles.date} itemProp="datePublished">
                {formattedDate}
              </time>
              {category && <CategoryTag label={category} />}
            </div>
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

      <meta itemProp="image" content={imageUrl} />
    </article>
  );
};