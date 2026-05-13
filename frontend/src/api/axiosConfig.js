import axios from 'axios';

const API = "https://yield-sullen-dinghy.ngrok-free.dev";

const api = axios.create({
  baseURL: `${API}/api`,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
