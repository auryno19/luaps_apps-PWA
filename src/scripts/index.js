/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime';
import '../styles/main.css';
import { getResto } from './page/listPage';
import app from './page/app';
import registerSw from './utils/register-sw';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// drawer
const menu = document.querySelector('#menu');
const body = document.querySelector('body');
const menuNavbar = document.querySelector('#menuNavbar');

menu.addEventListener('click', (event) => {
  menuNavbar.classList.toggle('sidebar');
  event.stopPropagation();
  event.preventDefault();
});

body.addEventListener('click', () => {
  menuNavbar.classList.remove('sidebar');
});

const all = document.querySelector('#itemMobileAll');
all.addEventListener('click', () => {
  getResto();
  const title = document.querySelector('#restoTitle');
  title.innerText = 'Explore Resturant';
  document.querySelector('#detailCategory').innerText = '';
});

// const fav = document.querySelector('#itemMobileFavorite');
// fav.addEventListener('click', () => {
//   Like.afterRender();
// });

getResto();
registerSw();

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
