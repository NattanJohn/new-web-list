"use client";

import { HomeTemplate } from '@/components/templates';
import { EmptyState } from '@/components/atoms/EmptyState/EmptyState';

export default function GlobalError({ error }: { error: Error }) {
  const message = error?.message || 'Erro inesperado';

  return (
    <HomeTemplate>
      <EmptyState
        title="Ocorreu um problema"
        message={message}
        actions={[{ label: 'Voltar para a página inicial', href: '/' }]}
      />
    </HomeTemplate>
  );
}
