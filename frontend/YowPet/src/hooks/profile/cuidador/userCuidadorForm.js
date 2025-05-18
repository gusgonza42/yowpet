import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import {
  checkCaregiverStatus,
  activateCaregiver,
  getCaregiverData,
  createCaregiverProfile,
  disableCaregiverProfile,
} from '@service/profile/cuidador/cuidadorService';

export const useCaregiver = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isActivated, setIsActivated] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);
  const [formData, setFormData] = useState({
    speciality: '',
    experience: '',
    hourlyRate: '',
    description: '',
    availability: [],
    services: [],
  });

  useEffect(() => {
    fetchCaregiverStatus();
  }, []);

  const fetchCaregiverStatus = async () => {
    if (!user?.userId) {
      console.error('No hay ID de usuario disponible');
      setLoading(false);
      return;
    }

    try {
      const isActive = await checkCaregiverStatus(user.userId);
      setIsActivated(isActive);

      if (isActive) {
        try {
          const caregiverData = await getCaregiverData(user.userId);
          setFormData({
            speciality: caregiverData.speciality || '',
            experience: caregiverData.experienceYears?.toString() || '',
            hourlyRate: caregiverData.hourlyRate?.toString() || '',
            description: caregiverData.description || '',
            services: caregiverData.serviceWorker?.split(', ') || [],
            availability: [],
          });

          // Si ya tiene datos completos del perfil
          if (
            caregiverData.speciality &&
            caregiverData.experienceYears &&
            caregiverData.hourlyRate &&
            caregiverData.description &&
            caregiverData.serviceWorker
          ) {
            setProfileComplete(true);
          }
        } catch (error) {
          console.error('Error al obtener datos del cuidador:', error.message);
          Alert.alert(
            'Error',
            'No se pudo obtener la información del cuidador'
          );
        }
      }
    } catch (error) {
      console.error('Error al verificar estado del cuidador:', error.message);
      setIsActivated(false);
      Alert.alert('Error', 'No se pudo verificar el estado del perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleActivateProfile = async () => {
    setLoading(true);
    try {
      const success = await activateCaregiver(user.userId);
      if (success) {
        setIsActivated(true);
        Alert.alert(
          '¡Perfil Activado!',
          'Ahora completa tus datos como cuidador'
        );
      }
    } catch (error) {
      console.error('Error al activar perfil:', error);
      Alert.alert('Error', 'No se pudo activar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = async () => {
    if (
      !formData.speciality ||
      !formData.experience ||
      !formData.hourlyRate ||
      !formData.description ||
      formData.services.length === 0
    ) {
      Alert.alert(
        'Error',
        'Por favor completa todos los campos obligatorios y selecciona al menos un servicio'
      );
      return;
    }

    setLoading(true);
    try {
      const caregiverData = {
        speciality: formData.speciality,
        experienceYears: parseInt(formData.experience),
        hourlyRate: parseFloat(formData.hourlyRate),
        rating: 0,
        review: '',
        description: formData.description,
        serviceWorker: formData.services.join(', '),
        statusActiveWork: true,
      };

      console.log('Datos de cuidador:', caregiverData);

      const success = await createCaregiverProfile(user.userId, caregiverData);
      if (success) {
        setProfileComplete(true);
        Alert.alert(
          '¡Perfil Completado!',
          'Tus datos han sido guardados correctamente',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error al crear perfil:', error);
      Alert.alert(
        'Error',
        'No se pudieron guardar los datos. Inténtalo de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDisableProfile = async () => {
    setLoading(true);
    setShowConfirmModal(false);

    try {
      const success = await disableCaregiverProfile(user.userId);
      if (success) {
        setIsActivated(false);
        setProfileComplete(false);
        Alert.alert(
          'Perfil Desactivado',
          'Has dejado de ser cuidador. Puedes volver a activar tu perfil cuando lo desees.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error al desactivar perfil:', error);
      Alert.alert('Error', 'No se pudo desactivar el perfil de cuidador');
    } finally {
      setLoading(false);
    }
  };

  const toggleService = service => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const toggleDay = day => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day],
    }));
  };

  const editProfile = () => {
    setProfileComplete(false);
  };

  return {
    loading,
    isActivated,
    profileComplete,
    formData,
    showConfirmModal,
    setShowConfirmModal,
    setFormData,
    handleActivateProfile,
    handleCreateProfile,
    handleDisableProfile,
    toggleService,
    toggleDay,
    editProfile,
  };
};
