import { apiClient } from './apiConfig';
import { LoginRequest, RegisterRequest, UpdateUserRequest, User } from '../types/userTypes';

interface UserResponse {
  user: User;
}

export const login = async (data: LoginRequest): Promise<UserResponse> => {
  const response = await apiClient.post<UserResponse>('/users/login', {
    user: {
      email: data.email,
      password: data.password,
    },
  });
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<UserResponse> => {
  const response = await apiClient.post<UserResponse>('/users', {
    user: {
      username: data.username,
      email: data.email,
      password: data.password,
    },
  });
  return response.data;
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await apiClient.get<UserResponse>('/user');
  return response.data;
};

export const updateUser = async (data: UpdateUserRequest): Promise<UserResponse> => {
  const response = await apiClient.put<UserResponse>('/user', { user: data });
  return response.data;
};
