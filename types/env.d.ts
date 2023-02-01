/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const Component: DefineComponent<{}, {}, unknown>;
  export default Component;
}
declare module 'md5';
declare module 'path-browserify';
declare module 'wow.js';
declare module 'animate.css';
declare module '@kangc/v-md-editor/lib/theme/vuepress.js';
declare module '@kangc/v-md-editor';
declare module 'prismjs';


