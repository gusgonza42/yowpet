import { axiosClient } from '../../api/clienteAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const petService = {
  registrarMascota: async (data, userId) => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');

      if (!token) {
        throw new Error('No hay token disponible');
      }

      // Formatear los datos según la estructura requerida
      const petData = {
        animalCategory: data.animalCategory,
        ownerId: userId,
        breed: data.breed || 1,
        status: 1,
        name: data.name,
        birthDate: new Date(data.birthDate).toISOString(),
        gender: data.gender,
        sterilized: data.sterilized ? 1 : 0,
        profilePicture: data.profilePicture || null,
        description: data.description || null,
        emergencyContact: data.emergencyContact || null,
        sterilizedAsInt: data.sterilized ? 1 : 0,
      };

      const response = await axiosClient({
        method: 'POST',
        url: '/pet/create',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: petData,
        timeout: 10000,
      });

      console.log('Respuesta del servidor:', response?.data);
      return response.data;
    } catch (error) {
      console.error('Error al registrar mascota:', error);
      throw error;
    }
  },

  obtenerMascotas: async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');

      if (!token) {
        throw new Error('No hay token disponible');
      }

      const response = await axiosClient({
        method: 'GET',
        url: '/pet/all',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      });

      return response.data;
    } catch (error) {
      console.error('Error al obtener mascotas:', error);
      throw error;
    }
  },

  obtenerMascota: async petId => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');

      if (!token) {
        throw new Error('No hay token disponible');
      }

      const response = await axiosClient({
        method: 'GET',
        url: `/pet/${petId}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      });

      return response.data;
    } catch (error) {
      console.error('Error al obtener mascota:', error);
      throw error;
    }
  },
  actualizarMascota: async (petId, data) => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');

      if (!token) {
        throw new Error('No hay token disponible');
      }

      const petData = {
        id: parseInt(petId),
        name: data.name,
        animalCategory: parseInt(data.animalCategory),
        breed: parseInt(data.breed),
        birthDate: data.birthDate,
        gender: data.gender,
        sterilized: data.sterilized ? 1 : 0,
        status: 1,
        ownerId: data.ownerId,
        profilePicture: data.profilePicture || null,
        description: data.description || '',
        emergencyContact: data.emergencyContact || '',
      };

      console.log('Datos simplificados a enviar:', petData);

      const response = await axiosClient({
        method: 'PUT',
        url: `/pet/update/${petId}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: petData,
      });

      return response.data;
    } catch (error) {
      console.error(
        'Error detallado al actualizar mascota:',
        error.response?.data || error
      );
      throw error;
    }
  },
};
