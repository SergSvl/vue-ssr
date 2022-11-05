import getApp from './app';

const getServerApp = async ({ url }) => {
  console.log('getServerApp url-1: ', url);
  const { app, router, store } = await getApp();
  await router.push(url);
  // console.log('getServerApp router-2: ', router.getRoutes());
  console.log('getServerApp prosecc.isServer: ', prosecc.isServer);
  return { app, router, store } ;
}

export default getServerApp;


