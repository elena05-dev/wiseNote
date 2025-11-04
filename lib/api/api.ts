import axios from 'axios';
console.log('📡 API base URL:', process.env.NEXT_PUBLIC_API_URL);
export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});
