import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserState, LoginRequest, RegisterRequest, UpdateUserRequest } from '../../types/userTypes';
import { login, register, getCurrentUser, updateUser } from '../../api/apiUser';

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk<UserState['user'], LoginRequest>('user/login', async (data) => {
  const response = await login(data);
  localStorage.setItem('token', response.user.token);
  return response.user;
});

export const registerUser = createAsyncThunk<UserState['user'], RegisterRequest>('user/register', async (data) => {
  const response = await register(data);
  localStorage.setItem('token', response.user.token);
  return response.user;
});

export const fetchCurrentUser = createAsyncThunk<UserState['user']>('user/fetchCurrentUser', async () => {
  const response = await getCurrentUser();
  return response.user;
});

export const updateUserProfile = createAsyncThunk<UserState['user'], UpdateUserRequest>('user/update', async (data) => {
  const response = await updateUser(data);
  return response.user;
});

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
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to register';
      })
      // Get current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user';
      })
      // Update user
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update user';
      });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
