declare module 'postcss-normalize' {
  import { Plugin } from 'postcss';
  const normalize: () => Plugin;
  export default normalize;
}
