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

  // Obtener información del usuario actual
  getUserInfo: async token => {
    try {
      const config = token
        ? {
            headers: { Authorization: `Bearer ${token}` },
          }
        : {};
      const response = await axiosClient.get('/api/users/profile', config);
      return response;
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      throw error;
    }
  },

  // Actualizar información de usuario
  updateUserProfile: userData =>
    axiosClient.put('/api/users/profile', userData),

  // Actualizar contraseña
  updatePassword: passwordData =>
    axiosClient.put('/api/users/password', passwordData),

  // Refrescar token
  refreshToken: () => axiosClient.post('/refresh-token'),

  // Cerrar sesión
  logout: () => axiosClient.post('/logout'),

  // Validar disponibilidad de email
  checkEmailAvailability: email =>
    axiosClient.get(`/check-email?email=${email}`),

  // Validar disponibilidad de username
  checkUsernameAvailability: username =>
    axiosClient.get(`/check-username?username=${username}`),
};
