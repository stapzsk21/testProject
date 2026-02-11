import react from '@vitejs/plugin-react';
import { copy } from 'fs-extra';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';

  return {
    css: {
      devSourcemap: true,
    },
    plugins: [
      react({
        // Включаем Fast Refresh
        fastRefresh: true,
      }),
      {
        name: 'copy-favicon',
        closeBundle: async () => {
          if (isProduction) {
            await copy(
              resolve(__dirname, 'src/assets/favicon'),
              resolve(__dirname, 'build/favicon'),
              { overwrite: true }
            );
            console.log('Favicon folder copied to build directory');
          }
        },
      },
      {
        name: 'copy-email-images',
        closeBundle: async () => {
          if (isProduction) {
            await copy(
              resolve(__dirname, 'src/assets/images/email'),
              resolve(__dirname, 'build/images/email'),
              { overwrite: true }
            );
            console.log('Email images folder copied to build/images directory');
          }
        },
      },
      {
        name: 'copy-htaccess',
        closeBundle: async () => {
          if (isProduction) {
            await copy(resolve(__dirname, '.htaccess'), resolve(__dirname, 'build/.htaccess'), {
              overwrite: true,
            });
            console.log('.htaccess file copied to build directory');
          }
        },
      },
      {
        name: 'copy-robots',
        closeBundle: async () => {
          if (isProduction) {
            await copy(resolve(__dirname, 'robots.txt'), resolve(__dirname, 'build/robots.txt'), {
              overwrite: true,
            });
            console.log('robots.txt file copied to build directory');
          }
        },
      },
      {
        name: 'copy-data-json',
        closeBundle: async () => {
          if (isProduction) {
            await copy(
              resolve(__dirname, 'src/assets/json/data.json'),
              resolve(__dirname, 'build/data.json'),
              { overwrite: true }
            );
            console.log('data.json copied to build directory');
          }
        },
      },
    ],
    server: {
      // Включаем HMR
      hmr: true,
      // Автоматически открываем браузер
      open: true,
      // Настраиваем порт
      host: true,
      port: 3000,
      // Включаем горячую перезагрузку
      watch: {
        usePolling: true,
      },
    },
    assetsInclude: ['**/*.csv', '**/*.php'],

    base: './', // Используем абсолютные пути вместо относительных

    build: {
      outDir: 'build',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: !isProduction,
      minify: isProduction ? 'esbuild' : false,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            // Разделяем большие зависимости на отдельные чанки
            papaparse: ['papaparse'],
          },
          // Убрали хеширование из имен файлов
          entryFileNames: 'js/[name].js',
          chunkFileNames: 'js/[name].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const extType = info[info.length - 1];
            if (extType === 'csv') {
              return `data/[name][extname]`;
            }
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
              return `media/[name][extname]`;
            } else if (/\.(png|jpe?g|gif|svg|webp|ico)(\?.*)?$/i.test(assetInfo.name)) {
              return `images/[name][extname]`;
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              return `fonts/[name][extname]`;
            } else if (extType === 'css') {
              return `css/[name][extname]`;
            }
            return `assets/[name][extname]`;
          },
        },
      },
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@assets': resolve(__dirname, './src/assets'),
        '@pages': resolve(__dirname, './src/pages'),
        '@constants': resolve(__dirname, './src/constants'),
        '@store': resolve(__dirname, './src/store'),
      },
    },

    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'papaparse'],
    },

    esbuild: {
      jsxInject: `import React from 'react'`,
    },
  };
});
