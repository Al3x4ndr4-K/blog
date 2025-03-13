import axios from 'axios';

export const BASE_URL = 'https://blog-platform.kata.academy/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});
