import axios from 'axios';

export const nextServer = axios.create({
  baseURL: 'https://notehub-backend-rj4e.onrender.com/',
  withCredentials: true,
});
