import { useNavigate } from 'react-router-dom';
import { ArticleForm } from '../../components/ArticleForm/ArticleForm';
import { createArticle } from '../../api/apiArticles';
import { CreateArticleDTO } from '../../types/articlesTypes';
import { toast } from 'react-toastify';
import { useState } from 'react';

const NewArticlePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: CreateArticleDTO = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  const handleSubmit = async (data: CreateArticleDTO) => {
    try {
      setIsLoading(true);
      const response = await createArticle(data);
      toast.success('Article created successfully');
      navigate(`/articles/${response.article.slug}`);
    } catch (error) {
      toast.error('Error creating article');
    } finally {
      setIsLoading(false);
    }
  };

  return <ArticleForm initialValues={initialValues} onSubmit={handleSubmit} isLoading={isLoading} />;
};

export default NewArticlePage;
