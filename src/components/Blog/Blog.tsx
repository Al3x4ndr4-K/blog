import blog from './Blog.module.scss';
import { Article } from '../../types/articlesTypes.ts';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAppSelector } from '../../hooks/hooks';
import { LikeButton } from '../LikeButton/LikeButton';
import { ArticleActions } from '../ArticleActions/ArticleActions';
import { FC } from 'react';

interface BlogProps {
  article: Article;
  isFullView?: boolean;
}

export const Blog: FC<BlogProps> = ({ article, isFullView = false }) => {
  const { user } = useAppSelector((state) => state.user);
  const isAuthor = user?.username === article.author.username;

  return (
    <div className={blog.blog}>
      <div className={blog.blogHeader}>
        <div className={blog.mainContent}>
          <div className={blog.titleContainer}>
            <Link to={`/articles/${article.slug}`} className={blog.title}>
              {article.title}
            </Link>
            <LikeButton
              articleSlug={article.slug}
              favoritesCount={article.favoritesCount}
              favorited={article.favorited}
            />
          </div>
          <div className={blog.tags}>
            {article.tagList.map((tag, index) => (
              <button key={index}>{tag}</button>
            ))}
          </div>
        </div>
        <div className={blog.user}>
          <div className={blog.userInfo}>
            <div className={blog.userStats}>
              <span className={blog.author}>{article.author.username}</span>
              <span className={blog.date}>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
            <div>
              <img src={article.author.image || '/avatar.svg'} alt="Avatar" />
            </div>
          </div>
        </div>
      </div>
      <div className={blog.contentWrapper}>
        <div className={blog.description}>{article.description}</div>
        {isFullView && isAuthor && <ArticleActions article={article} />}
      </div>
      {isFullView && (
        <div className={blog.text}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
