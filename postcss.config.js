import autoprefixer from 'autoprefixer';
import fontMagician from 'postcss-font-magician';
import normalize from 'postcss-normalize';

export default {
  plugins: [
    autoprefixer(),
    normalize(),
    fontMagician({
      variants: {
        Roboto: {
          300: ['normal'],
          400: ['normal'],
          700: ['normal'],
        },
        Open_Sans: {
          300: ['normal'],
          400: ['normal'],
          500: ['normal'],
          600: ['normal'],
          700: ['normal'],
        },
      },
      foundries: ['google'],
      display: 'swap',
    }),
  ],
};
