// frontend/src/lib/api.js
import axios from 'axios';
import { getToken } from './auth';

const API = axios.create({
  baseURL: 'http://127.0.0.1:5000', // backend address
});

// attach token automatically for protected endpoints
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

export default API;
