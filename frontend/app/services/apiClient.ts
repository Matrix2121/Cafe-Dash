import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../common/constants';

const customAPI = axios.create({
    baseURL:  process.env.API_URL
});

// Add request interceptor to inject JWT token
customAPI.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle 401 errors
customAPI.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('jwt');
      // You might want to redirect to login here
    }
    return Promise.reject(error);
  }
);

export default customAPI;