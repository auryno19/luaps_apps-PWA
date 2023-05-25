import FavoriteRestaurant from '../data/favorite';
import { renderResto } from './listPage';

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

export default Like;
