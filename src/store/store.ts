import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './slices/articlesSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
