"use client";

import ErrorPage from './status/ErrorPage';

export default function GlobalError({ error }: { error: Error }) {
  const message = error?.message || 'Erro inesperado';
  return <ErrorPage message={message} />;
}
