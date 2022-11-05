import { createSSRApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const getApp = async () => {
  const app = createSSRApp(App).use(store).use(router);
  const products = await store.dispatch('module1/getProducts');
  console.log('products: ', products);
  return { app, router, store };
}

export default getApp;
