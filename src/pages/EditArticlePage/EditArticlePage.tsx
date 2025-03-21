import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchArticle } from '../../store/slices/articlesSlice';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { ArticleForm } from '../../components/ArticleForm/ArticleForm';
import { updateArticle } from '../../api/apiArticles';
import { toast } from 'react-toastify';
import { CreateArticleDTO } from '../../types/articlesTypes';
import { PrivateRoute } from '../../components/PrivateRoute/PrivateRoute';

const EditArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    currentArticle: article,
    status: articleStatus,
    error: articleError,
  } = useAppSelector((state) => state.articles);
  const { status: userStatus } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (slug && userStatus === 'succeeded') {
      dispatch(fetchArticle(slug));
    }
  }, [dispatch, slug, userStatus]);

  const handleSubmit = async (data: CreateArticleDTO) => {
    if (!slug) return;
    try {
      const response = await updateArticle(slug, data);
      toast.success('Article updated successfully');
      navigate(`/articles/${response.article.slug}`);
    } catch (error) {
      toast.error('Error updating article');
    }
  };

  if (userStatus === 'loading' || articleStatus === 'loading' || !article) {
    return <LoadingSpinner />;
  }

  if (articleError) {
    navigate('/articles');
    return null;
  }

  return <ArticleForm mode="edit" initialData={article} onSubmit={handleSubmit} />;
};

export default () => (
  <PrivateRoute>
    <EditArticlePage />
  </PrivateRoute>
);
