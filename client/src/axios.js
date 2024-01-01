import axios from 'axios';

export const makeRequest = axios.create({
  baseURL: 'https://click-api-haq2.onrender.com/api/',
  withCredentials: true,
});
