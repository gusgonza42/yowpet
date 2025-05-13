import axios from 'axios';
import { API_BASE_PATH, API_URL } from '@constants/ApiRouteLocal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosClient = axios.create({
  baseURL: `${API_URL}:8080${API_BASE_PATH}`,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor de peticiones
axiosClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('[AXIOS] Request:', {
      method: config.method,
      url: `${config.baseURL}${config.url}`,
      headers: config.headers,
    });
    return config;
  },
  error => {
    console.log('[AXIOS] Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
axiosClient.interceptors.response.use(
  response => {
    // Asegurarnos que la respuesta tenga data y sea un array si es necesario
    if (response.data === undefined) {
      response.data = [];
    } else if (
      response.data &&
      !Array.isArray(response.data) &&
      response.config.url.includes('/place/all')
    ) {
      response.data = [response.data];
    }

    console.log('[AXIOS] Response:', {
      status: response.status,
      dataType: typeof response.data,
      isArray: Array.isArray(response.data),
      length: Array.isArray(response.data) ? response.data.length : 'N/A',
      url: response.config.url,
    });

    return response;
  },
  error => {
    if (error.response) {
      // Asegurarnos que haya una respuesta con array vacío en caso de error
      error.response.data = error.response.data || [];

      console.log('[AXIOS] Response Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.log('[AXIOS] No Response:', {
        request: error.request,
        url: error.config?.url,
      });
    } else {
      console.log('[AXIOS] Error:', {
        message: error.message,
        url: error.config?.url,
      });
    }
    return Promise.reject(error);
  }
);