import getApp from './app';

(async () => {
  const { app, router } = await getApp();
  await router.isReady();
  console.log('getApp prosecc.isServer: ', prosecc.isServer);
  app.mount('#app');
})();

