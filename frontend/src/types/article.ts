export type Article = {
  id?: string | number;
  slug: string;
  title: string;
  image?: string;
  summary?: string;
  date?: string;
  content?: string;
  author?: string;
  category?: string;
};

export type ArticleList = Article[];

export type ArticlePageMeta = {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export type ArticlePageResponse = {
  data: Article[];
  meta: ArticlePageMeta;
};
