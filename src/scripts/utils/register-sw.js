import { Workbox } from 'workbox-window';

const registerSw = async () => {
  if (!('serviceWorker' in navigator)) {
    alert('Browser anda tidak suppoer service worker');
  }

  const wb = new Workbox('sw.workbox.js');

  try {
    await wb.register();
    console.log('service worker installed');
  } catch (error) {
    console.log('Failed install service worker');
  }
};

export default registerSw;
