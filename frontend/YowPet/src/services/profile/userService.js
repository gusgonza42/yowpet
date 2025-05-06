import { axiosClient } from '../api/clienteAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const decodeJWT = token => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decodificando JWT:', error);
    return null;
  }
};

export const userService = {
  obtenerPerfil: async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      if (!token) {
        throw new Error('No hay token disponible');
      }

      // Obtener userId del JWT decodificado
      const decodedToken = decodeJWT(token);
      console.log('Datos del JWT:', decodedToken);
      const userId = decodedToken.userId;

      if (!userId) {
        throw new Error('No se pudo obtener el userId del token');
      }

      // Imprimir URL completa y headers
      const url = `${axiosClient.defaults.baseURL}/user/${userId}`;
      console.log('URL completa:', url);
      console.log('Token:', token);
      console.log('UserId:', userId);

      const response = await axiosClient.get(`/user/${userId}`);
      console.log('Respuesta del servidor:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Status:', error.response?.status);
      console.error('Mensaje:', error.response?.data);
      if (error.response?.status === 401) {
        await AsyncStorage.removeItem('@auth_token');
      }
      throw error;
    }
  },

  actualizarPerfil: async dataToUpdate => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      if (!token) {
        throw new Error('No hay token disponible');
      }

      // Obtener userId del JWT decodificado
      const decodedToken = decodeJWT(token);
      console.log('Datos del JWT:', decodedToken);
      const userId = decodedToken.userId;

      if (!userId) {
        throw new Error('No se pudo obtener el userId del token');
      }

      // Imprimir URL y datos a enviar
      const url = `${axiosClient.defaults.baseURL}/user/update/${userId}`;
      console.log('URL completa:', url);
      console.log('Datos a actualizar:', dataToUpdate);
      console.log('Token:', token);
      console.log('UserId:', userId);

      const response = await axiosClient.put(
        `/user/update/${userId}`,
        dataToUpdate
      );
      console.log('Respuesta del servidor:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Status:', error.response?.status);
      console.error('Mensaje:', error.response?.data);
      if (error.response?.status === 401) {
        await AsyncStorage.removeItem('@auth_token');
      }
      throw error;
    }
  },
};
