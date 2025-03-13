import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { fetchArticles, setCurrentPage } from '../../store/slices/articlesSlice.ts';
import { Blog } from '../Blog/Blog';
import { Pagination, Box, CircularProgress, Alert } from '@mui/material';
import { ARTICLES_PER_PAGE, PAGINATION_SIZE, PAGINATION_COLOR } from '../../constants/pagination';

export const BlogList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, status, error, currentPage, totalArticles } = useAppSelector((state) => state.articles);
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  React.useEffect(() => {
    dispatch(
      fetchArticles({
        limit: ARTICLES_PER_PAGE,
        offset: (currentPage - 1) * ARTICLES_PER_PAGE,
      })
    );
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <section>
      {articles.map((article) => (
        <Blog key={article.slug} article={article} />
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          shape="rounded"
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color={PAGINATION_COLOR}
          size={PAGINATION_SIZE}
        />
      </Box>
    </section>
  );
};
