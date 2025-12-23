import Link from 'next/link';
import { Title } from '../../atoms/Title/Title';
import styles from './PostCard.module.scss';

interface PostCardProps {
  title: string;
  summary: string;
  date: string;
  slug: string;
}

export const PostCard = ({ title, summary, date, slug }: PostCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString('pt-BR');

  return (
    <article className={styles.card}>
      <Link href={`/article/${slug}`} className={styles.link}>
        <header>
          <span className={styles.date}>{formattedDate}</span>
          <Title tag="h2">{title}</Title>
        </header>
        <p className={styles.summary}>{summary}</p>
        <span className={styles.readMore}>Leia mais →</span>
      </Link>
    </article>
  );
};