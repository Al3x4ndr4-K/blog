import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { fetchArticle } from '../../store/slices/articlesSlice.ts';
import { Alert, Box, CircularProgress } from '@mui/material';
import { Blog } from '../../components/Blog/Blog';
import { useEffect } from 'react';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const { currentArticle, status, error } = useAppSelector((state) => state.articles);

  useEffect(() => {
    if (slug) {
      dispatch(fetchArticle(slug));
    }
  }, [dispatch, slug]);

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

  return (
    <Box sx={{ pb: 2 }}>
      <Blog article={currentArticle} isFullView />
    </Box>
  );
};

export default ArticlePage;
