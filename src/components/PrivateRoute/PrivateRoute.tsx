import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { PrivateRouteProps } from '../../types/components';
import { FC } from 'react';

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
