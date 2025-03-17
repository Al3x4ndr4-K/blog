import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { loginUser, registerUser } from '../../store/slices/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Checkbox, CircularProgress, FormControlLabel, TextField, Typography } from '@mui/material';
import { loginSchema, registerSchema } from '../../validation/schemas';
import { AuthFormData, AuthFormProps } from '../../types/components';
import { toast } from 'react-toastify';
import { FC } from 'react';

export const AuthForm: FC<AuthFormProps> = ({ mode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(mode === 'login' ? loginSchema : registerSchema),
  });

  const onSubmitHandler = async (data: AuthFormData) => {
    try {
      if (mode === 'login') {
        const result = await dispatch(
          loginUser({
            email: data.email,
            password: data.password,
          })
        ).unwrap();
        if (result) {
          navigate('/');
        }
      } else {
        const result = await dispatch(
          registerUser({
            email: data.email,
            password: data.password,
            username: data.username!,
          })
        ).unwrap();
        if (result) {
          navigate('/');
        }
      }
    } catch (err) {
      if (typeof err === 'string') {
        toast.error(err);
      } else {
        toast.error('Authentication failed');
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: 'var(--white)',
        boxShadow:
          '0 1px 3px 0 var(--shadow), 0 1px 7px 0 rgba(0, 0, 0, 0.03), 0 3px 13px 0 rgba(0, 0, 0, 0.04), 0 5px 24px 0 rgba(0, 0, 0, 0.04), 0 9px 44px 0 rgba(0, 0, 0, 0.05), 0 22px 106px 0 rgba(0, 0, 0, 0.07)',
      }}
    >
      <Typography variant="h5" component="h1" align="center">
        {mode === 'login' ? 'Sign In' : 'Create new account'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {mode === 'register' && (
        <TextField
          label="Username"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
          fullWidth
        />
      )}

      <TextField
        label="Email address"
        type="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      <TextField
        label="Password"
        type="password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />

      {mode === 'register' && (
        <>
          <TextField
            label="Repeat password"
            type="password"
            {...register('repeatPassword')}
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword?.message}
            fullWidth
          />
          <FormControlLabel
            sx={{ textAlign: 'left' }}
            control={<Checkbox {...register('acceptTerms')} color="primary" />}
            label="I agree to the processing of my personal information"
          />
          {errors.acceptTerms && (
            <Typography color="error" variant="caption">
              {errors.acceptTerms.message}
            </Typography>
          )}
        </>
      )}

      <Button type="submit" variant="contained" size="large" disabled={status === 'loading'} sx={{ mt: 1 }}>
        {status === 'loading' ? <CircularProgress size={24} color="inherit" /> : mode === 'login' ? 'Login' : 'Create'}
      </Button>

      <Typography align="center">
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <Button color="primary" onClick={() => navigate('/register')}>
              Sign Up
            </Button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Button color="primary" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </>
        )}
      </Typography>
    </Box>
  );
};
