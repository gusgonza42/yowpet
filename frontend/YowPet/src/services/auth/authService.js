import { axiosClient } from '@/services/api/clienteAxios';

export const authService = {
  // Login
  login: credentials => axiosClient.post('/auth/login', credentials),

  // Registro
  register: userData => axiosClient.post('/auth/register', userData),

  // Recuperar contraseña
  forgotPassword: email => axiosClient.post('/auth/forgot-password', { email }),

  // Verificar token
  verifyToken: () => axiosClient.get('/auth/verify'),
};
