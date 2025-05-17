import { axiosClient } from '@service/api/clienteAxios';

// Verificar si el usuario es cuidador
export const checkCaregiverStatus = async (userId) => {
  try {
    const response = await axiosClient.get(`/caregiver/check/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error en checkCaregiverStatus:', error);
    throw error;
  }
};

// Activar perfil de cuidador
export const activateCaregiver = async (userId) => {
  try {
    const response = await axiosClient.post(`/caregiver/activate/${userId}`);
    return response.status === 200;
  } catch (error) {
    console.error('Error en activateCaregiver:', error);
    throw error;
  }
};

// Obtener datos del cuidador
export const getCaregiverData = async (userId) => {
  try {
    const response = await axiosClient.get(`/caregiver/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error en getCaregiverData:', error);
    throw error;
  }
};

// Crear o actualizar perfil de cuidador
export const createCaregiverProfile = async (userId, caregiverData) => {
  try {
    const response = await axiosClient.post(`/caregiver/create/${userId}`, caregiverData);
    return response.status === 200;
  } catch (error) {
    console.error('Error en createCaregiverProfile:', error);
    throw error;
  }
};

// Desactivar perfil de cuidador
export const disableCaregiverProfile = async (userId) => {
  try {
    // Cambiado de PUT a DELETE para coincidir con el backend
    const response = await axiosClient.delete(`/caregiver/disabled/${userId}`);
    return response.status === 200;
  } catch (error) {
    console.error('Error en disableCaregiverProfile:', error);
    throw error;
  }
};