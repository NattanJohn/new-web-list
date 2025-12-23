import { Title } from '../../atoms/Title/Title';
import styles from './ArticleDetail.module.scss';

interface ArticleDetailProps {
  article: {
    title: string;
    content: string;
    date: string;
    author: string;
  };
}

export const ArticleDetail = ({ article }: ArticleDetailProps) => {
  const formattedDate = new Date(article.date).toLocaleDateString('pt-BR');

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <Title tag="h1">{article.title}</Title>
        <div className={styles.meta}>
          <time>Publicado em: {formattedDate}</time>
          <span>Por: {article.author}</span>
        </div>
      </header>
      <div className={styles.content}>
        <p>{article.content}</p> 
      </div>
    </article>
  );
};