import Link from 'next/link';
import { HomeTemplate } from '@/components/templates/HomeTemplate/HomeTemplate';
import { Title } from '@/components/atoms/Title/Title';
import styles from './Status.module.scss';

export default function NotFoundPage() {
  return (
    <HomeTemplate>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.headerRow}>
            <div className={styles.statusIcon}>📰</div>
            <div>
              <div className={styles.statusCode}>404 — Página não encontrada</div>
              <Title tag="h2">Notícia não encontrada</Title>
            </div>
          </div>

          <p className={styles.lead}>
            Desculpe, não conseguimos localizar a notícia que você procurava. O conteúdo pode ter sido removido ou movido.
          </p>

          <p className={styles.message}>
            Você pode voltar à página inicial para ver as últimas publicações ou procurar por outras notícias.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.backButton}>Ver últimas notícias</Link>
          </div>
        </div>
      </div>
    </HomeTemplate>
  );
}
