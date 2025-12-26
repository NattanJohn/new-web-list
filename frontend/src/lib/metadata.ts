export const SITE_CONFIG = {
  name: 'Gazeta News',
  title: 'Gazeta News - Notícias Atualizadas',
  description: 'Fique por dentro das últimas notícias com a Gazeta News - sua fonte confiável para informações atualizadas e análises aprofundadas sobre os principais acontecimentos locais, nacionais e internacionais.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  locale: 'pt_BR',
  author: 'Nattan John Lana da Silva',
} as const;

export const OPEN_GRAPH_CONFIG = {
  type: 'website',
  locale: SITE_CONFIG.locale,
  siteName: SITE_CONFIG.name,
  title: SITE_CONFIG.title,
  description: 'Sua fonte confiável para informações atualizadas sobre os principais acontecimentos.',
} as const;

export const TWITTER_CONFIG = {
  card: 'summary_large_image',
  title: SITE_CONFIG.name,
  description: 'Notícias atualizadas e confiáveis',
} as const;

export type SiteConfig = typeof SITE_CONFIG;
export type OpenGraphConfig = typeof OPEN_GRAPH_CONFIG;
export type TwitterConfig = typeof TWITTER_CONFIG;
