import 'element-plus/dist/index.css';
import 'vue3-el-pro-table/dist/vue3-el-pro-table.css';
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import Vue3ProTable from 'vue3-el-pro-table';
import router from './router';

createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(Vue3ProTable)
  .mount('#app');
