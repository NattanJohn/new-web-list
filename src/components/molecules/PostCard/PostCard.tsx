import Link from 'next/link';
import { Title } from '../../atoms/Title/Title';
import { PostImage } from '../../atoms/PostImage/PostImage';
import styles from './PostCard.module.scss';

interface PostCardProps {
  title: string;
  summary: string;
  date: string;
  slug: string;
  image?: string;
}

export const PostCard = ({ title, summary, date, slug, image }: PostCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString('pt-BR');
  
  const imageUrl = image || 'https://via.placeholder.com/800x450?text=Gazeta+News';

  return (
    <article className={styles.card}>
      <Link href={`/article/${slug}`} className={styles.link}>
        <PostImage src={imageUrl} alt={title} />
        
        <div className={styles.content}>
          <header>
            <span className={styles.date}>{formattedDate}</span>
            <Title tag="h2">{title}</Title>
          </header>
          
          <p className={styles.summary}>{summary}</p>
          
          <span className={styles.readMore}>Leia mais →</span>
        </div>
      </Link>
    </article>
  );
};