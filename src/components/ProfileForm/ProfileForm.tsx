import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { updateUserProfile } from '../../store/slices/userSlice.ts';
import { Alert, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { profileSchema } from '../../validation/schemas';
import { FC } from 'react';

interface FormData {
  username: string;
  email: string;
  newPassword?: string;
  image?: string;
}

export const ProfileForm: FC = () => {
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      newPassword: '',
      image: user?.image || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const updateData: any = {
      username: data.username,
      email: data.email,
    };

    if (data.newPassword) {
      updateData.password = data.newPassword;
    }

    if (data.image) {
      updateData.image = data.image;
    }

    await dispatch(updateUserProfile(updateData));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: 'var(--white)',
        boxShadow:
          '0 1px 3px 0 var(--shadow), 0 1px 7px 0 rgba(0, 0, 0, 0.03), 0 3px 13px 0 rgba(0, 0, 0, 0.04), 0 5px 24px 0 rgba(0, 0, 0, 0.04), 0 9px 44px 0 rgba(0, 0, 0, 0.05), 0 22px 106px 0 rgba(0, 0, 0, 0.07)',
      }}
    >
      <Typography variant="h5" component="h1" align="center">
        Edit profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Username"
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username?.message}
        fullWidth
      />

      <TextField
        label="Email address"
        type="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      <TextField
        label="New password"
        type="password"
        {...register('newPassword')}
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
        fullWidth
      />

      <TextField
        label="Avatar image (url)"
        {...register('image')}
        error={!!errors.image}
        helperText={errors.image?.message}
        fullWidth
      />

      <Button type="submit" variant="contained" size="large" disabled={status === 'loading'} sx={{ mt: 2 }}>
        {status === 'loading' ? <CircularProgress size={24} color="inherit" /> : 'Save'}
      </Button>
    </Box>
  );
};
