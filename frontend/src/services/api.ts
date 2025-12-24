const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  async getArticles() {
    const res = await fetch(`${API_URL}/articles`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Erro ao buscar artigos');
    return res.json();
  },

  async getArticleBySlug(slug: string) {
    const res = await fetch(`${API_URL}/articles/${slug}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json();
  }
};