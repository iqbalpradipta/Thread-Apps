import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:8001/api/v1',
  headers: {
    'Content-type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
