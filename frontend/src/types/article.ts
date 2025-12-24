export type Article = {
  id?: string | number;
  slug: string;
  title: string;
  image?: string;
  summary?: string;
  date?: string;
  content?: string;
  author?: string;
};

export type ArticleList = Article[];
