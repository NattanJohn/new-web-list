import { HomeTemplate } from '@/components/templates';
import { EmptyState } from '@/components/atoms/EmptyState/EmptyState';

export default function NotFound() {
  return (
    <HomeTemplate>
      <EmptyState
        title="Página não encontrada"
        message="Não conseguimos localizar o conteúdo solicitado."
        actions={[{ label: 'Ver últimas notícias', href: '/' }]}
      />
    </HomeTemplate>
  );
}