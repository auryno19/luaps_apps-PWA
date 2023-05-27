import CONFIG from '../global/config';

const favLikeButton = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
`;

const favLikedButton = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;

const detail = (restaurant) => `
     <div class="detailImg">
              <img src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}" alt="${restaurant.name}">
              <div class="detailRate">
                  <p>Rating : ${restaurant.rating} / 5</p>
              </div>
          </div>
        
        <div class="detailCity">
            ${restaurant.city} City
        </div>
        <div class="detailAddress">
        ${restaurant.address}
        </div>
        <div class="detailResto">
          <h2>Description</h2>
          <p style="text-align: justify;">${restaurant.description}</p>
          <hr></hr>
          <h2>Menus</h2>
          <div class="detailMenu">
            <div class="food">
              <h2>Foods</h2>
              <div class="detailFood" id="detailFood"></div>
            </div>
            <div class="drink">
              <h2>Drinks</h2>
              <div class="detailDrink" id="detailDrink"></div>
            </div>
          </div>
          <hr align= "center"></hr>
          <h2>Testimonial</h2>
          <div class="detailReview" id="detailReview"></div>
        </div>
        <div id="likeButtonContainer"></div>
`;
const createRestaurantItem = (r) => `
    <div class="listResto">
            <div class="restoImgGradient">
            <img class="restoImg lazyload" data-src="${CONFIG.BASE_IMAGE_URL}${r.pictureId}" alt="${r.name} ${r.city}" title="${r.name} ${r.city}">
            </div>
            <div class="cityResto">
                <img class="locationIcon" src="./images/icons/location.png">
                ${r.city}
            </div>
            <div class="rating">
                Rating : 
                ${r.rating}
            </div>
            <div class="restoContent">
                <h1 class="restoTitle"><a href="#" id="${r.id}">${r.name}</a></h1>
                <div class="restoDesc">${r.description.slice(0, 170)}...</div>
            </div>
        </div>
`;

export {
  createRestaurantItem, detail, favLikeButton, favLikedButton,
};
