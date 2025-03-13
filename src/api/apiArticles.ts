import { apiClient } from './apiConfig';
import { Article, ArticlesResponse, FetchArticlesParams } from '../types/articlesTypes';

export const fetchArticlesApi = async (params: FetchArticlesParams): Promise<ArticlesResponse> => {
  const { tag, author, favorited, limit, offset } = params;
  const queryParams = new URLSearchParams();

  if (tag) queryParams.append('tag', tag);
  if (author) queryParams.append('author', author);
  if (favorited) queryParams.append('favorited', favorited);
  queryParams.append('limit', limit.toString());
  queryParams.append('offset', offset.toString());

  const response = await apiClient.get<ArticlesResponse>('/articles', { params: queryParams });
  return response.data;
};

export const fetchArticle = async (slug: string): Promise<{ article: Article }> => {
  const response = await apiClient.get<{ article: Article }>(`/articles/${slug}`);
  return response.data;
};

export const createArticle = async (
  articleData: Omit<Article, 'slug' | 'createdAt' | 'updatedAt' | 'favorited' | 'favoritesCount' | 'author'>
): Promise<{ article: Article }> => {
  const response = await apiClient.post<{ article: Article }>('/articles', { article: articleData });
  return response.data;
};

export const updateArticle = async (slug: string, articleData: Partial<Article>): Promise<{ article: Article }> => {
  const response = await apiClient.put<{ article: Article }>(`/articles/${slug}`, { article: articleData });
  return response.data;
};

export const deleteArticle = async (slug: string): Promise<void> => {
  await apiClient.delete(`/articles/${slug}`);
};
