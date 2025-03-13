import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().required('Email обязателен').email('Введите корректный email'),
  password: yup.string().required('Пароль обязателен'),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('Имя пользователя обязательно')
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов'),
  email: yup.string().required('Email обязателен').email('Введите корректный email'),
  password: yup.string().required('Пароль обязателен').min(6, 'Минимум 6 символов').max(40, 'Максимум 40 символов'),
  repeatPassword: yup
    .string()
    .required('Повторите пароль')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  acceptTerms: yup.boolean().oneOf([true], 'Необходимо согласиться с условиями'),
});

export const profileSchema = yup.object().shape({
  username: yup.string().required('Имя пользователя обязательно'),
  email: yup.string().required('Email обязателен').email('Введите корректный email'),
  newPassword: yup.string().min(6, 'Минимум 6 символов').max(40, 'Максимум 40 символов').nullable(),
  image: yup.string().url('Введите корректный URL').nullable(),
});
