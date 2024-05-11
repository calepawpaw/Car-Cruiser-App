import { defineConfig, } from 'vite';
import { resolve } from 'path'

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        edit: resolve(__dirname, 'src/edit.html'),
        index: resolve(__dirname, 'src/index.html'),
        login: resolve(__dirname, 'src/login.html'),
        main: resolve(__dirname, 'src/main.html'),
        notification: resolve(__dirname, 'src/notification.html'),
        page1: resolve(__dirname, 'src/page1.html'),
        page2: resolve(__dirname, 'src/page2.html'),
        page3: resolve(__dirname, 'src/page3.html'),
        page4: resolve(__dirname, 'src/page4.html'),
        profile: resolve(__dirname, 'src/profile.html'),
        register: resolve(__dirname, 'src/register.html'),
        rent: resolve(__dirname, 'src/rent.html'),
        transaction: resolve(__dirname, 'src/transaction.html'),
        edit1: resolve(__dirname, 'src/edit1.html'),
        notification1: resolve(__dirname, 'src/notification1.html'),
        admin: resolve(__dirname, 'src/admin.html'),
        transaction1: resolve(__dirname, 'src/transaction1.html'),
        profile1: resolve(__dirname, 'src/profile1.html'),
      },
      },
      
      
      
  }


});
