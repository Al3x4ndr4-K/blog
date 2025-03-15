import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

interface PrivateRouteProps {
  children: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
