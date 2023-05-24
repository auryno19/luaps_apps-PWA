import API_ENDPOINT from '../global/api_endpoint';

class RestaurantApi {
  static async getAll() {
    const response = await fetch(API_ENDPOINT.getAll);
    const responseJson = await response.json();
    return responseJson;
  }

  static async get(id) {
    const response = await fetch(API_ENDPOINT.get(id));
    const responseJson = await response.json();
    return responseJson;
  }
}

export default RestaurantApi;
