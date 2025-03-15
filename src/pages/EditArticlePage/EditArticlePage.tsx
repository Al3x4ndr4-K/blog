import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleForm } from '../../components/ArticleForm/ArticleForm';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchArticle } from '../../store/slices/articlesSlice';
import { updateArticle } from '../../api/apiArticles';
import { Box, CircularProgress, Alert } from '@mui/material';
import { CreateArticleDTO } from '../../types/articlesTypes';
import { toast } from 'react-toastify';

const EditArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentArticle, status, error } = useAppSelector((state) => state.articles);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (slug) {
      dispatch(fetchArticle(slug));
    }
  }, [dispatch, slug]);

  const handleSubmit = async (data: CreateArticleDTO) => {
    if (!slug) return;

    try {
      setIsLoading(true);
      const response = await updateArticle(slug, data);
      toast.success('Статья успешно обновлена');
      navigate(`/articles/${response.article.slug}`);
    } catch (error) {
      toast.error('Ошибка при обновлении статьи');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !currentArticle) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error || 'Статья не найдена'}</Alert>
      </Box>
    );
  }

  const initialValues: CreateArticleDTO = {
    title: currentArticle.title,
    description: currentArticle.description,
    body: currentArticle.body,
    tagList: currentArticle.tagList,
  };

  return <ArticleForm initialValues={initialValues} onSubmit={handleSubmit} isLoading={isLoading} isEdit />;
};

export default EditArticlePage;
