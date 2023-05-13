
// const CONFIG = require('./config');
import CONFIG from './config';

const API_ENDPOINT = {
  getAll: `${CONFIG.BASE_URL}/list`,
  get: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
};

export default API_ENDPOINT;
