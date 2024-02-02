import axios from 'axios';
import queryString from 'qs';
import { API_BASE_URL, KEY_TOKEN } from './config';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params, { encode: true }),
});

export const token = localStorage.getItem(KEY_TOKEN);

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(KEY_TOKEN);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
