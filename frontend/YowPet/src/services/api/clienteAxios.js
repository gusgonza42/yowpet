import axios from 'axios';
import { API_URL } from '@constants/ApiRouteLocal';

// Crear instancia de Axios con configuración personalizada
export const axiosClient = axios.create({
  baseURL: `http://${API_URL}:8080`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para peticiones
axiosClient.interceptors.request.use(
  config => {
    // Aquí puedes añadir headers, tokens, etc.
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
