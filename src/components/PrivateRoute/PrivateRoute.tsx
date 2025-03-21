import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { PrivateRouteProps } from '../../types/components';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { user, isInitializing } = useAppSelector((state) => state.user);

  if (isInitializing && localStorage.getItem('token')) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
