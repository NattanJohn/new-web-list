"use client";

import { useState, useEffect } from 'react';
import { Title } from '../../atoms/Title/Title';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
import { PostImage } from '../../atoms/PostImage/PostImage';
import { BackButton } from '../../atoms/BackButton/BackButton';
import styles from './ArticleDetail.module.scss';
import type { Article } from '../../../types/article';

type ArticleDetailType = Omit<Article, 'date'> & { date: string; content: string; author: string };

interface ArticleDetailProps {
  article: ArticleDetailType;
}

export const ArticleDetail = ({ article }: ArticleDetailProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.article}>
        <BackButton />
        <Skeleton height="45px" width="90%" />
        <div style={{ display: 'flex', gap: '20px', margin: '1rem 0' }}>
          <Skeleton height="15px" width="150px" />
          <Skeleton height="15px" width="100px" />
        </div>
        <Skeleton height="400px" width="100%" /> 
        <br />
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="95%" />
      </div>
    );
  }

  const formattedDate = article.date ? new Date(article.date).toLocaleDateString('pt-BR') : '';

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
          <PostImage src={article.image} alt={article.title} />
        </div>
      )}

      <div className={styles.content}>
        <p>{article.content}</p> 
      </div>
    </article>
  );
};