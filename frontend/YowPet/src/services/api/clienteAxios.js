import axios from 'axios';
import { API_URL, API_BASE_PATH } from '@constants/ApiRouteLocal';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crear instancia de Axios con configuración personalizada
export const axiosClient = axios.create({
  baseURL: `${API_URL}:8080${API_BASE_PATH}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para peticiones
axiosClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token.trim()}`;
    }

    console.log('[AXIOS] Request URL:', config.baseURL + config.url);
    console.log('[AXIOS] Headers:', config.headers);

    return config;
  },
  error => Promise.reject(error)
);


// Interceptor para respuestas
axiosClient.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      // Manejar error de autenticación
      console.log('Error de autenticación');
    }
    return Promise.reject(error);
  }
);