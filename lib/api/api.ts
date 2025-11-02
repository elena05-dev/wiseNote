import axios from 'axios';

export const nextServer = axios.create({
  baseURL: 'https://wise-note-backend.onrender.com',
  withCredentials: true,
});
