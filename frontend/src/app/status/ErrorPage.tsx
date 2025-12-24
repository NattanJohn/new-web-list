import Link from 'next/link';
import { HomeTemplate } from '@/components/templates/HomeTemplate/HomeTemplate';
import { Title } from '@/components/atoms/Title/Title';
import styles from './Status.module.scss';

interface ErrorPageProps {
  message?: string;
}

export default function ErrorPage({ message }: ErrorPageProps) {
  return (
    <HomeTemplate>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.headerRow}>
            <div className={styles.statusIcon}>⚠️</div>
            <div>
              <div className={styles.statusCode}>Erro interno</div>
              <Title tag="h2">Ocorreu um problema</Title>
            </div>
          </div>

          <p className={styles.lead}>Desculpe, estamos com problemas técnicos no momento.</p>

          {message && <p className={styles.message}><strong>Detalhes:</strong> {message}</p>}

          <div className={styles.actions}>
            <Link href="/" className={styles.backButton}>Ver últimas notícias</Link>
          </div>
        </div>
      </div>
    </HomeTemplate>
  );
}
