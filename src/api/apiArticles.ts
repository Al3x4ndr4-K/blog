import { apiClient } from './apiConfig';
import { Article, ArticleFilters, ArticlesResponse, CreateArticleDTO } from '../types/articlesTypes';

export const fetchArticlesApi = async (params: ArticleFilters): Promise<ArticlesResponse> => {
  const response = await apiClient.get<ArticlesResponse>('/articles', { params });
  return response.data;
};

export const fetchArticle = async (slug: string): Promise<{ article: Article }> => {
  const response = await apiClient.get<{ article: Article }>(`/articles/${slug}`);
  return response.data;
};

export const createArticle = async (articleData: CreateArticleDTO): Promise<{ article: Article }> => {
  const response = await apiClient.post<{ article: Article }>('/articles', { article: articleData });
  return response.data;
};

export const updateArticle = async (slug: string, articleData: CreateArticleDTO): Promise<{ article: Article }> => {
  const response = await apiClient.put<{ article: Article }>(`/articles/${slug}`, { article: articleData });
  return response.data;
};

export const deleteArticle = async (slug: string): Promise<void> => {
  await apiClient.delete(`/articles/${slug}`);
};

export const favoriteArticle = async (slug: string) => {
  const response = await apiClient.post(`/articles/${slug}/favorite`);
  return response.data;
};

export const unfavoriteArticle = async (slug: string) => {
  const response = await apiClient.delete(`/articles/${slug}/favorite`);
  return response.data;
};
