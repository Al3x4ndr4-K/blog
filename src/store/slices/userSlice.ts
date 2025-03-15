import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginRequest, RegisterRequest, UpdateUserRequest, UserState } from '../../types/userTypes';
import { getCurrentUser, login, register, updateUser } from '../../api/apiUser';
import axios from 'axios';

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

interface ApiErrorResponse {
  errors: {
    [key: string]: string[];
  };
}

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 422) {
      const errors = error.response.data as ApiErrorResponse;
      if (errors?.errors) {
        const messages = [];
        for (const [field, fieldErrors] of Object.entries(errors.errors)) {
          messages.push(`${field}: ${fieldErrors.join(', ')}`);
        }
        return messages.join('; ');
      }
      return 'Проверьте правильность введенных данных';
    }
    if (error.response?.status === 401) {
      return 'Неверный email или пароль';
    }
    if (error.response?.status === 403) {
      return 'Доступ запрещен';
    }
    if (error.response?.status === 404) {
      return 'Пользователь не найден';
    }
    return error.response?.data?.message || 'Произошла ошибка при выполнении запроса';
  }
  return 'Произошла неизвестная ошибка';
};

export const loginUser = createAsyncThunk<UserState['user'], LoginRequest>(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data);
      localStorage.setItem('token', response.user.token);
      return response.user;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const registerUser = createAsyncThunk<UserState['user'], RegisterRequest>(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await register(data);
      localStorage.setItem('token', response.user.token);
      return response.user;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<UserState['user']>(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUser();
      return response.user;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateUserProfile = createAsyncThunk<UserState['user'], UpdateUserRequest>(
  'user/update',
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateUser(data);
      return response.user;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
