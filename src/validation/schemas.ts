import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Enter a valid email'),
  password: yup.string().required('Password is required'),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Minimum 3 characters')
    .max(20, 'Maximum 20 characters'),
  email: yup.string().required('Email is required').email('Enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Minimum 6 characters')
    .max(40, 'Maximum 40 characters'),
  repeatPassword: yup
    .string()
    .required('Repeat password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  acceptTerms: yup.boolean().oneOf([true], 'You must agree to the terms'),
});

export const profileSchema = yup.object().shape({
  username: yup.string().required('Email is required'),
  email: yup.string().required('Email is required').email('Enter a valid email'),
  newPassword: yup
    .string()
    .transform((value) => (value === '' ? undefined : value))
    .optional()
    .test('password-length', 'Minimum 6 characters', (value) => {
      if (!value) return true;
      return value.length >= 6;
    })
    .test('password-max-length', 'Maximum 40 characters', (value) => {
      if (!value) return true;
      return value.length <= 40;
    }),
  image: yup.string().url('Enter a valid URL').optional(),
});
