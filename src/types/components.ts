import { Article } from './articlesTypes';
import React from 'react';

export interface LikeButtonProps {
  articleSlug: string;
  favoritesCount: number;
  favorited: boolean;
}

export interface PrivateRouteProps {
  children: React.ReactNode;
}
export interface ArticleActionsProps {
  article: Article;
}

export interface AuthFormProps {
  mode: 'login' | 'register';
}

export interface AuthFormData {
  username?: string;
  email: string;
  password: string;
  repeatPassword?: string;
  acceptTerms?: boolean;
}
