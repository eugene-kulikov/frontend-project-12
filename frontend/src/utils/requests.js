import axios from 'axios';
import getUserInfo from './common.js';

export default {
  get(url, params) {
    return axios.get(url, { params, headers: { Authorization: `Bearer ${getUserInfo().token}` } })
      .then((response) => response.data || {});
  },
  post(url, body, params) {
    return axios.post(url, body, { params, headers: { Authorization: `Bearer ${getUserInfo().token}` } })
      .then((response) => response.data || {});
  },
  put(url, data) {
    return axios.put(url, data, { headers: { Authorization: `Bearer ${getUserInfo().token}` } })
      .then((response) => response.data || {});
  },
  delete(url) {
    return axios.delete(url, { headers: { Authorization: `Bearer ${getUserInfo().token}` } })
      .then((response) => response.data || {});
  },
};
