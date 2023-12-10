import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
export default defineConfig({
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/))  return null

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        })
      },
    },
    react(),
  ],


  // build: {
  //   outDir: 'dist', // Adjust this to your desired output directory
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, 'index.html'),
  //       register: resolve(__dirname, 'src/pages/Register/index.html'),
  //       App1: resolve(__dirname, 'src/pages/App1/index.js'),
  //       App2: resolve(__dirname, 'src/pages/App2/index.js'),
  //       dashboard: resolve(__dirname, 'src/pages/Dashboard/Dashboard.js'),
  //       Login: resolve(__dirname, 'src/pages/Login/login.js'),
  //       ChangePassword: resolve(__dirname, 'src/pages/Setting/ChangePassword.js'),
  //       Profile: resolve(__dirname, 'src/pages/Setting/Profile.js'),
  //       NotFound: resolve(__dirname, 'src/pages/NotFound.js'),
  //     },
  //   },
  // },


})