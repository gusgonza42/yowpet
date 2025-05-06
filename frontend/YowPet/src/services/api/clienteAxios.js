import axios from 'axios';
import { API_BASE_PATH, API_URL } from '@constants/ApiRouteLocal';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crear instancia de Axios con configuración personalizada
export const axiosClient = axios.create({
  baseURL: `http://${API_URL}:8080${API_BASE_PATH}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para peticiones
axiosClient.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Error al obtener el token:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
