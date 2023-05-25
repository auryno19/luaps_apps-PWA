import LikeButtonPresenter from '../utils/like-button-presenter';
import { detail } from '../template/template-creator';
import API_ENDPOINT from '../global/api_endpoint';

const showResponseMessage = (message = 'Periksa Koneksi Anda!') => {
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

export default getDetailResto;
