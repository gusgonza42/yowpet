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
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.log('Error decodificando JWT:', error);
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

      console.log('Token encontrado:', token);
      console.log('Token limpio:', token.trim());

      const decodedToken = decodeJWT(token);
      console.log('Datos del JWT:', decodedToken);

      const userId = decodedToken?.userId;
      console.log('UserId:', userId);

      if (!userId) {
        throw new Error('No se pudo obtener el userId del token');
      }

      const url = `/user/${userId}`;
      console.log('URL completa:', `${axiosClient.defaults.baseURL}${url}`);

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      console.log('[AXIOS] Headers:', headers);

      const response = await axiosClient({
        method: 'GET',
        url: url,
        headers: headers,
        timeout: 10000,
      });

      console.log('Respuesta del servidor:', response?.data);

      if (!response?.data) {
        throw new Error('No se recibieron datos del servidor');
      }

      return response.data;
    } catch (error) {
      console.log('Error al obtener perfil:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error;
    }
  },

  // Agregar esto a userService.js
  actualizarPerfil: async (datosUsuario) => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');

      if (!token) {
        throw new Error('No hay token disponible');
      }

      const decodedToken = decodeJWT(token);
      const userId = decodedToken?.userId;

      if (!userId) {
        throw new Error('No se pudo obtener el userId del token');
      }

      // Estructura los datos según el procedimiento almacenado
      const datosActualizacion = {
        firstName: datosUsuario.firstName,
        lastName: datosUsuario.lastName,
        address: datosUsuario.address,
        telephone: datosUsuario.phoneNumber,
        city: datosUsuario.city,
        birthdate: datosUsuario.birthDate,
        username: datosUsuario.username,
      };

      // Si hay contraseña nueva, incluirla
      if (datosUsuario.password && datosUsuario.password !== '********') {
        datosActualizacion.password = datosUsuario.password;
      }

      const response = await axiosClient.put(`/user/${userId}`, datosActualizacion);

      console.log('Perfil actualizado:', response.data);
      return response;
    } catch (error) {
      console.error('Error al actualizar perfil:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error;
    }
  },
};


