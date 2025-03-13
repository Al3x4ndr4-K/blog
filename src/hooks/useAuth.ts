import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { fetchCurrentUser } from '../store/slices/userSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);
};
