import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header.tsx';
import { HomePage } from './pages/HomePage/HomePage.tsx';
import { ArticlePage } from './pages/ArticlePage/ArticlePage.tsx';
import { LoginPage } from './pages/LoginPage/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage/RegisterPage.tsx';
import { ProfilePage } from './pages/ProfilePage/ProfilePage.tsx';
import { useAuth } from './hooks/useAuth';

function App() {
  useAuth();

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<HomePage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
