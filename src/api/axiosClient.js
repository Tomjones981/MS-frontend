import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://darkturquoise-worm-880823.hostingersite.com/api',
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;