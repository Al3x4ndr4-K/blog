import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Article, ArticlesState } from '../../types/articlesTypes.ts';
import { fetchArticle as fetchArticleApi, fetchArticlesApi } from '../../api/apiArticles.ts';

interface FetchArticlesParams {
  limit: number;
  offset: number;
}

const initialState: ArticlesState = {
  articles: [],
  currentArticle: null,
  status: 'idle',
  error: null,
  currentPage: 1,
  totalArticles: 0,
};

export const fetchArticles = createAsyncThunk<{ articles: Article[]; articlesCount: number }, FetchArticlesParams>(
  'articles/fetchArticles',
  async ({ limit, offset }) => {
    return await fetchArticlesApi({ limit, offset });
  }
);

export const fetchArticle = createAsyncThunk<Article, string>('articles/fetchArticle', async (slug) => {
  const response = await fetchArticleApi(slug);
  return response.article;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    clearCurrentArticle(state) {
      state.currentArticle = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.totalArticles = action.payload.articlesCount;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch articles';
      })
      .addCase(fetchArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch article';
      });
  },
});

export default articlesSlice.reducer;
export const { setCurrentPage, clearCurrentArticle } = articlesSlice.actions;
