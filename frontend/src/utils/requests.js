import axios from 'axios';
import { toast } from 'react-toastify';
import { getUserInfo } from './common.js';

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

// eslint-disable-next-line consistent-return
export function getErrorMessage(error, t) {
  const { request, response } = error;
  if (response) {
    const { status } = response;
    switch (status) {
      case 401:
        return t('validation.invalidData');
      case 409:
        return t('validation.userExist');
      default:
        return `${t('validation.unknownError')}: ${response.statusText}`;
    }
  } else if (request) {
    toast.error(t('toast.error.network'));
  } else {
    toast.error(t('toast.error.wrongSettingUp'));
  }
}
