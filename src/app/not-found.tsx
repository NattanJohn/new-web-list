import Link from 'next/link';
import { HomeTemplate } from '@/components/templates/HomeTemplate/HomeTemplate';
import { Title } from '@/components/atoms/Title/Title';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <HomeTemplate>
      <div className={styles.container}>
        <div className={styles.animation}>
          <span className={styles.ghost}>👻</span>
          <Title tag="h1">404</Title>
        </div>
        <p className={styles.text}>
          Ops! Parece que essa notícia que você procura não está mais em nossos arquivos.
        </p>
        <Link href="/" className={styles.backButton}>
          Voltar para a página inicial
        </Link>
      </div>
    </HomeTemplate>
  );
}