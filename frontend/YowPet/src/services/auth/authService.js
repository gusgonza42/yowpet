import { axiosClient } from '@/services/api/clienteAxios';

  export const authService = {
    // Auth
    login: credentials => axiosClient.post('/login', credentials),

    // Registro
    register: userData => axiosClient.post('/register', userData),

    // Recuperar contraseña
    forgotPassword: email => axiosClient.post('/forgot-password', { email }),

    // Verificar token
    verifyToken: () => axiosClient.get('/validation'),
  };