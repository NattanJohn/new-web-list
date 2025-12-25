'use client';

import { Title } from '../../atoms/Title/Title';
import { PostImage } from '../../atoms/PostImage/PostImage';
import { BackButton } from '../../atoms/BackButton/BackButton';
import styles from './ArticleDetail.module.scss';
import type { Article } from '@/types';
import { formatDate } from '../../../utils/formatDate';

type ArticleDetailType = Article & {
  content?: string;
  author?: string;
  date?: string;
};

interface ArticleDetailProps {
  article: ArticleDetailType;
}

export const ArticleDetail = ({ article }: ArticleDetailProps) => {
  const formattedDate = formatDate(article.date);
  const author = article.author ?? 'Desconhecido';
  const paragraphs = article.content 
    ? article.content.split(/\n\n+/).filter(p => p.trim())
    : [];

  return (
    <article className={styles.article}>
      <BackButton />
      
      <header className={styles.header}>
        <Title tag="h1">{article.title}</Title>
        <div className={styles.meta}>
          <time dateTime={article.date}>Publicado em: {formattedDate}</time>
          <span itemProp="author">Por: {author}</span>
        </div>
      </header>
      
      {article.image && (
        <div className={styles.featuredImage}>
          <PostImage priority={true} src={article.image} alt={article.title} />
        </div>
      )}

      <div className={styles.content}>
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        ) : (
          <p>Conteúdo não disponível.</p>
        )}
      </div>
    </article>
  );
};