import { apiClient } from './apiConfig';
import { LoginRequest, RegisterRequest, UpdateUserRequest, User } from '../types/userTypes';

interface UserResponse {
  user: User;
}

interface CheckEmailResponse {
  exists: boolean;
}

export const checkEmail = async (email: string): Promise<CheckEmailResponse> => {
  const response = await apiClient.get<CheckEmailResponse>(`/users/check-email?email=${email}`);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<UserResponse> => {
  const response = await apiClient.post<UserResponse>('/users/login', { user: data });
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<UserResponse> => {
  const response = await apiClient.post<UserResponse>('/users', { user: data });
  return response.data;
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await apiClient.get<UserResponse>('/user');
  return response.data;
};

export const updateUser = async (data: UpdateUserRequest): Promise<UserResponse> => {
  const token = localStorage.getItem('token');
  const response = await apiClient.put<UserResponse>(
    '/user',
    { user: data },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
};
