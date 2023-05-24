import 'regenerator-runtime';
import '../styles/main.css';
import FavoriteRestaurant from './data/favorite';
import registerSw from './utils/register-sw';
import LikeButtonPresenter from './utils/like-button-presenter';
import API_ENDPOINT from './global/api_endpoint';
import { detail, list } from './template/template-creator';

// drawer
const menu = document.querySelector('#menu');
const body = document.querySelector('body');
const menuNavbar = document.querySelector('#menuNavbar');

menu.addEventListener('click', (event) => {
  menuNavbar.classList.toggle('sidebar');
  event.stopPropagation();
});

body.addEventListener('click', () => {
  menuNavbar.classList.remove('sidebar');
});

const showResponseMessage = (message = 'Check your internet connection') => {
  alert(message);
};

//   Detail Resto
const renderDetail = (restaurant) => {
  const title = document.querySelector('#restoTitle');
  document.querySelector('#restoList').innerHTML = '';
  title.innerText = '';
  title.innerText = restaurant.name;

  document.querySelector('#detailResto').innerHTML = detail(restaurant);

  // category
  let detailCategory = '';
  restaurant.categories.forEach((c) => {
    detailCategory += `
        ${c.name},  
      `;
  });
  document.querySelector('#detailCategory').innerHTML = `<p id="detailCategorySlice"> ${detailCategory} </p>`;
  const category = document.querySelector('#detailCategorySlice').innerText;
  document.querySelector('#detailCategorySlice').innerText = `${category.slice(0, -1)}`;

  // food
  let detailFood = '';
  restaurant.menus.foods.forEach((f) => {
    detailFood += `
        <p>${f.name}</p>
      `;
  });
  document.querySelector('#detailFood').innerHTML = detailFood;

  // drink
  let detailDrink = '';
  restaurant.menus.drinks.forEach((d) => {
    detailDrink += `
        <p>${d.name}</p>
      `;
  });
  document.querySelector('#detailDrink').innerHTML = detailDrink;

  // testimoni
  let detailReview = '';
  restaurant.customerReviews.forEach((r) => {
    detailReview += `
        <h3>${r.name}</h3>
        <h5>${r.date}</h5>
        <p>" ${r.review} "</p>
      `;
  });
  document.querySelector('#detailReview').innerHTML = detailReview;

  // likeButton
  LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    restaurant: {
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description,
      pictureId: restaurant.pictureId,
      city: restaurant.city,
      rating: restaurant.rating,
    },
  });
};

const getDetailResto = (idResto) => {
  fetch(API_ENDPOINT.get(idResto))
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        renderDetail(responseJson.restaurant);
      }
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

// all
const renderResto = (restaurants) => {
  let dataList = '';
  restaurants.forEach((r) => {
    dataList += list(r);
  });
  document.querySelector('#detailResto').innerHTML = '';
  document.querySelector('#restoList').innerHTML = dataList;

  const titleResto = document.querySelectorAll('.restoTitle');
  titleResto.forEach((h1) => {
    h1.addEventListener('click', (event) => {
      const idResto = event.target.id;
      getDetailResto(idResto);
    });
  });
};

// list Restaurant
const getResto = () => {
  fetch(API_ENDPOINT.getAll)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        renderResto(responseJson.restaurants);
      }
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const all = document.querySelector('#itemMobileAll');
all.addEventListener('click', () => {
  getResto();
  const title = document.querySelector('#restoTitle');
  title.innerText = 'Explore Resturant';
  document.querySelector('#detailCategory').innerText = '';
});

// favorite
const Like = {
  async afterRender() {
    const restaurants = await FavoriteRestaurant.getAllRestaurants();
    if (restaurants.length === 0) {
      const title = document.querySelector('#restoTitle');
      title.innerText = 'My Favorite';
      document.querySelector('#detailResto').innerHTML = '';
      document.querySelector('#restoList').innerHTML = '';
      document.querySelector('#detailCategory').innerText = 'Anda belum memiliki daftar Favorit';
    } else {
      renderResto(restaurants);
      const title = document.querySelector('#restoTitle');
      title.innerText = 'My Favorite';
      document.querySelector('#detailCategory').innerText = '';
    }
  },
};

const fav = document.querySelector('#itemMobileFavorite');
fav.addEventListener('click', () => {
  Like.afterRender();
});

getResto();
registerSw();
