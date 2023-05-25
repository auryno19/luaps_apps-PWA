import API_ENDPOINT from '../global/api_endpoint';
import { list } from '../template/template-creator';
import getDetailResto from './detailPage';

const showResponseMessage = (message = 'Check your internet connection') => {
  alert(message);
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

export { getResto, renderResto };
