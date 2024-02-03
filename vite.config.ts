import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      utils: '/src/utils',
      hooks: '/src/hooks',
      assets: '/src/assets',
      i18n: '/src/i18n',
      commnon: '/src/commnon',
      services: '/src/services',
      constants: '/src/constants',
      components: '/src/components',
    },
  },
});
