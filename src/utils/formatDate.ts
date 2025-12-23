export function formatDate(date?: string): string {
  if (!date) return '';
  try {
    return new Date(date).toLocaleDateString('pt-BR');
  } catch (e) {
    return '';
  }
}
