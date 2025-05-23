import { axiosClient } from '@/services/api/clienteAxios';

export const authService = {
  // Auth
  login: async credentials => {
    try {
      const response = await axiosClient.post('/login', credentials);
      console.log('======= Respuesta completa del login =======');
      console.log('Response:', JSON.stringify(response, null, 2));
      console.log('Response data:', JSON.stringify(response.data, null, 2));
      return response;
    } catch (error) {
     console.warn('Error en login:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },

  // Registro
  register: async userData => {
    try {
      console.log('Datos enviados al registro:', userData);
      const response = await axiosClient.post('/register', userData);
      console.log('======= Respuesta completa del registro =======');
      console.log('Response:', JSON.stringify(response, null, 2));
      console.log('Response data:', JSON.stringify(response.data, null, 2));
      return response;
    } catch (error) {
     console.warn('Error en registro:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },
};
