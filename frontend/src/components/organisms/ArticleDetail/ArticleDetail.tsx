'use client';

import { useEffect } from 'react';
import { Title } from '../../atoms/Title/Title';
import { PostImage } from '../../atoms/PostImage/PostImage';
import { BackButton } from '../../atoms/BackButton/BackButton';
import styles from './ArticleDetail.module.scss';
import type { Article } from '@/types';
import { formatDate } from '../../../utils/formatDate';
import { getImageFallbackUrl } from '@/utils/imageOptimization';

type ArticleDetailType = Article & {
  content?: string;
  author?: string;
  date?: string;
  imageWidth?: number;
  imageHeight?: number;
};

interface ArticleDetailProps {
  article: ArticleDetailType;
}

// Dimensões padrão para imagens de artigos
const DEFAULT_IMAGE_WIDTH = 1200;
const DEFAULT_IMAGE_HEIGHT = 630;

export const ArticleDetail = ({ article }: ArticleDetailProps) => {
  const formattedDate = formatDate(article.date);
  const author = article.author ?? 'Desconhecido';
  const paragraphs = article.content 
    ? article.content.split(/\n\n+/).filter(p => p.trim())
    : [];

  // Dimensões otimizadas (dinâmicas, não hardcoded)
  const imageWidth = article.imageWidth || DEFAULT_IMAGE_WIDTH;
  const imageHeight = article.imageHeight || DEFAULT_IMAGE_HEIGHT;
  const imageUrl = article.image || getImageFallbackUrl();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <article 
      className={styles.article}
      itemScope 
      itemType="https://schema.org/NewsArticle"
    >
      <BackButton />
      
      <header className={styles.header}>
        <Title tag="h1">
          <span itemProp="headline">{article.title}</span>
        </Title>
        <div className={styles.meta}>
          <time dateTime={article.date} itemProp="datePublished">
            Publicado em: {formattedDate}
          </time>
          <span itemProp="author" itemScope itemType="https://schema.org/Person">
            Por: <span itemProp="name">{author}</span>
          </span>
        </div>
      </header>
      
      {imageUrl && (
        <figure className={styles.featuredImage} itemProp="image" itemScope itemType="https://schema.org/ImageObject">
          <PostImage 
            priority={true} 
            src={imageUrl} 
            alt={article.title}
            width={imageWidth}
            height={imageHeight}
          />
          {/* Schema.org Image metadata - dimensões dinâmicas */}
          <meta itemProp="url" content={imageUrl} />
          <meta itemProp="width" content={String(imageWidth)} />
          <meta itemProp="height" content={String(imageHeight)} />
        </figure>
      )}

      <div className={styles.content} itemProp="articleBody">
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