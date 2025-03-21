import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  password: yup.string().trim().required('Password is required'),
});

export const registerSchema = yup.object().shape({
  username: yup.string().trim().required('Username is required'),
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .trim()
    .min(6, 'Your password needs to be at least 6 characters')
    .max(40, 'Your password must not exceed 40 characters')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  acceptTerms: yup.boolean().oneOf([true], 'Please accept the terms'),
});

export const profileSchema = yup.object().shape({
  username: yup.string().trim().required('Username is required'),
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  newPassword: yup.string().trim().optional(),
  image: yup.string().trim().url('Enter a valid URL').optional(),
});

export const articleSchema = yup.object().shape({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().required('Description is required'),
  body: yup.string().trim().required('Article text is required'),
  tagList: yup.array().of(yup.string().trim().required()).required().default([]),
});
