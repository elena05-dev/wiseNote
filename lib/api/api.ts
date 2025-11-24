import axios from 'axios';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});
console.log(
  '🔥 NEXT_PUBLIC_API_BASE_URL =',
  process.env.NEXT_PUBLIC_API_BASE_URL,
);
console.log('🔥 nextServer.baseURL =', nextServer.defaults.baseURL);
