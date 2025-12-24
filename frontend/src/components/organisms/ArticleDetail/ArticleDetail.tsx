'use client';

import { Title } from '../../atoms/Title/Title';
import { PostImage } from '../../atoms/PostImage/PostImage';
import { BackButton } from '../../atoms/BackButton/BackButton';
import styles from './ArticleDetail.module.scss';
import type { Article } from '@/types';
import { formatDate } from '../../../utils/formatDate';

type ArticleDetailType = Article & { 
  content: string; 
  author: string; 
  date: string 
};

interface ArticleDetailProps {
  article: ArticleDetailType;
}

export const ArticleDetail = ({ article }: ArticleDetailProps) => {
  const formattedDate = formatDate(article.date);

  return (
    <article className={styles.article}>
      <BackButton />
      
      <header className={styles.header}>
        <Title tag="h1">{article.title}</Title>
        <div className={styles.meta}>
          <time>Publicado em: {formattedDate}</time>
          <span>Por: {article.author}</span>
        </div>
      </header>
      
      {article.image && (
        <div className={styles.featuredImage}>
          <PostImage priority={true} src={article.image} alt={article.title} />
        </div>
      )}

      <div className={styles.content}>
        <p>{article.content}</p> 
      </div>
    </article>
  );
};