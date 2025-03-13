import blog from './Blog.module.scss';
import React from 'react';
import { Article } from '../../types/articlesTypes.ts';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogProps {
  article: Article;
  isFullView?: boolean;
}

export const Blog: React.FC<BlogProps> = ({ article, isFullView = false }) => {
  return (
    <div className={blog.blog}>
      <div className={blog.blogHeader}>
        <div className={blog.titleContainer}>
          <Link to={`/articles/${article.slug}`} className={blog.title}>
            {article.title}
          </Link>
          <div>
            <img src="/like.svg" alt="Like" />
            <span> {article.favoritesCount} Likes</span>
          </div>
          <div className={blog.tags}>
            {article.tagList.map((tag, index) => (
              <button key={index}>{tag}</button>
            ))}
          </div>
        </div>
        <div className={blog.user}>
          <div className={blog.userStats}>
            <span className={blog.author}>{article.author.username}</span>
            <span className={blog.date}>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
          <div>
            <img src={article.author.image || '/avatar.svg'} alt="Avatar" />
          </div>
        </div>
      </div>
      <div className={`${blog.text} ${!isFullView ? blog.textPreview : ''}`}>
        {isFullView ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
        ) : (
          <span>{article.body}</span>
        )}
      </div>
    </div>
  );
};
