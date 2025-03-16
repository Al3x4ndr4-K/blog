import React, { Suspense, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './hooks/hooks';
import { fetchCurrentUser } from './store/slices/userSlice';

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage/RegisterPage'));
const ArticlePage = React.lazy(() => import('./pages/ArticlePage/ArticlePage'));
const NewArticlePage = React.lazy(() => import('./pages/NewArticlePage/NewArticlePage'));
const EditArticlePage = React.lazy(() => import('./pages/EditArticlePage/EditArticlePage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage/ProfilePage'));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route
            path="/new-article"
            element={
              <PrivateRoute>
                <NewArticlePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/articles/:slug/edit"
            element={
              <PrivateRoute>
                <EditArticlePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/articles" replace />} />
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
