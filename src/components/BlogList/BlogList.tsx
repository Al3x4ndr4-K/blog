import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { fetchArticles, setCurrentPage } from '../../store/slices/articlesSlice.ts';
import { Blog } from '../Blog/Blog';
import { Alert, Box, Pagination } from '@mui/material';
import { ARTICLES_PER_PAGE, PAGINATION_COLOR, PAGINATION_SIZE } from '../../constants/pagination';
import { Article } from '../../types/articlesTypes.ts';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ChangeEvent, FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const BlogList: FC = () => {
  const dispatch = useAppDispatch();
  const { articles, status, error, totalArticles } = useAppSelector((state) => state.articles);
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageFromParams = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(
      fetchArticles({
        limit: ARTICLES_PER_PAGE,
        offset: (currentPageFromParams - 1) * ARTICLES_PER_PAGE,
      })
    );
  }, [dispatch, currentPageFromParams]);

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setSearchParams({ page: page.toString() });
    dispatch(setCurrentPage(page));
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
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
      {!articles ? (
        <LoadingSpinner />
      ) : articles.length === 0 ? (
        <Box sx={{ mt: 4 }}>
          <Alert severity="info">No articles found</Alert>
        </Box>
      ) : (
        <>
          {articles.map((article: Article) => (
            <Blog key={article.slug} article={article} />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, pb: 4 }}>
            <Pagination
              shape="rounded"
              count={totalPages}
              page={currentPageFromParams}
              onChange={handlePageChange}
              color={PAGINATION_COLOR}
              size={PAGINATION_SIZE}
            />
          </Box>
        </>
      )}
    </section>
  );
};
