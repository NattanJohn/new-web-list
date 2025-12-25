import Link from 'next/link';
import { Title } from '../../atoms/Title/Title';
import { PostImage } from '../../atoms/PostImage/PostImage';
import styles from './PostCard.module.scss';
import type { Article } from '@/types';
import { formatDate } from '../../../utils/formatDate';

type PostCardProps = Pick<Article, 'slug' | 'title' | 'summary' | 'date' | 'image'> & {
  priority?: boolean;
};

export const PostCard = ({ title, summary = '', date = '', slug, image, priority = false }: PostCardProps) => {
  const formattedDate = formatDate(date);
  const imageUrl = image ?? 'https://via.placeholder.com/800x450?text=Gazeta+News';

  return (
    <article className={styles.card}>
      <Link href={`/article/${slug}`} className={styles.link}>
        <PostImage src={imageUrl} alt={title} priority={priority} />
        
        <div className={styles.content}>
          <header>
            <span className={styles.date}>{formattedDate}</span>
            <Title tag="h2" className={styles.title}>
              {title}
            </Title>
          </header>
          
          <p className={styles.summary}>{summary}</p>
          
          <span className={styles.readMore}>Leia mais →</span>
        </div>
      </Link>
    </article>
  );
};