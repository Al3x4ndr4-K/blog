export interface User {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
}

export interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  email?: string;
  username?: string;
  password?: string;
  image?: string;
  bio?: string;
}
