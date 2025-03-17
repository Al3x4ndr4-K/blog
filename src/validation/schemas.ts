import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Your password needs to be at least 6 characters')
    .max(40, 'Your password must not exceed 40 characters')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  acceptTerms: yup.boolean().oneOf([true], 'Please accept the terms'),
});

export const profileSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  newPassword: yup.string().optional(),
  image: yup.string().url('Enter a valid URL').optional(),
});

export const articleSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  body: yup.string().required('Article text is required'),
  tagList: yup.array().of(yup.string().required()).required().default([]),
});
