import axios from 'axios';

export const nextServer = axios.create({
  baseURL:
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_API_BASE_URL
      : '/api',
  withCredentials: true,
});
