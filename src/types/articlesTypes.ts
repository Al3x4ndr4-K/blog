import { BaseEntity, PaginatedResponse } from './common';

export interface Author {
  username: string;
  bio: string | null;
  image: string | null;
  following: boolean;
}

export interface Article extends BaseEntity {
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

export interface CreateArticleDTO {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface UpdateArticleDTO extends Partial<CreateArticleDTO> {
  slug: string;
}

export interface ArticleFilters {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
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
