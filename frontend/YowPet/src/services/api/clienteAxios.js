import axios from 'axios';
import { API_URL, API_BASE_PATH } from '@constants/ApiRouteLocal';
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
    // Aquí puedes añadir headers, tokens, etc.
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error al obtener el token:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
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
