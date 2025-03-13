export interface Author {
  username: string;
  bio: string | null;
  image: string | null;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface ArticlesState {
  articles: Article[];
  currentArticle: Article | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentPage: number;
  totalArticles: number;
}

export interface FetchArticlesParams {
  limit: number;
  offset: number;
  tag?: string;
  author?: string;
  favorited?: string;
}
