import axios from 'axios';

const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` };

export default {
  get(url, params) {
    return axios.get(url, { params, headers })
      .then((response) => response.data || {});
  },
  post(url, body, params) {
    return axios.post(url, body, { params, headers })
      .then((response) => response.data || {});
  },
  put(url, data) {
    return axios.put(url, data, { headers })
      .then((response) => response.data || {});
  },
  delete(url) {
    return axios.delete(url, { headers })
      .then((response) => response.data || {});
  },
};
