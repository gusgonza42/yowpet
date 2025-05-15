import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { YowPetTheme } from '@theme/Colors';
import { AccountHeader } from '@components/profile/account/AccountHeader';
import { FormField } from '@components/profile/account/FormField';
import { ActionButtons } from '@components/profile/account/ActionButtons';
import { userService } from '@service/profile/userService';

export default function AccountScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({}); // Corregido aquí
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    address: '',
    phoneNumber: '',
    birthDate: null,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (field, value) => {
    // Limpiar error cuando el usuario edita el campo
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: false,
      }));
    }

    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSave = async () => {
    try {
      // Validar campos requeridos
      const camposRequeridos = {
        firstName: 'Nombre',
        lastName: 'Apellidos',
        email: 'Email',
        city: 'Ciudad',
        address: 'Dirección',
        phoneNumber: 'Teléfono',
        birthDate: 'Fecha de nacimiento',
      };

      // Reiniciar errores
      const nuevosErrores = {};
      let tieneErrores = false;

      // Verificar cada campo
      Object.entries(camposRequeridos).forEach(([campo]) => {
        if (!formData[campo] || formData[campo].trim() === '') {
          nuevosErrores[campo] = true;
          tieneErrores = true;
        }
      });
      // Actualizar estado de errores
      setFieldErrors(nuevosErrores);

      // Si hay errores, detener la función
      if (tieneErrores) {
        return;
      }

      setIsLoading(true);

      // Continuar con la actualización del perfil
      const dataToUpdate = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        city: formData.city,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        birthDate: formData.birthDate,
      };

      const response = await userService.actualizarPerfil(dataToUpdate);

      if (!response || !response.data) {
        throw new Error('Error al actualizar el perfil');
      }

      const updatedData = response.data;
      setFormData({
        ...formData,
        ...updatedData,
      });

      setIsEditing(false);
      setFieldErrors({});

      // Mostrar mensaje bonito de éxito
      Alert.alert(
        '¡Perfil actualizado!',
        'Tus datos han sido actualizados correctamente.',
        [{ text: 'Aceptar' }]
      );
    } catch (error) {
      // Mostrar mensaje bonito de error
      Alert.alert(
        'Error al actualizar',
        error.response?.data?.message ||
          'No pudimos actualizar tu perfil. Por favor, intenta nuevamente.',
        [{ text: 'Entendido' }]
      );

      console.error('Error detallado al actualizar:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      console.log('Iniciando carga de perfil...');

      // Agregar un timeout a la petición
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('Timeout al cargar el perfil')),
          10000
        )
      );

      const response = await Promise.race([
        userService.obtenerPerfil(),
        timeoutPromise,
      ]);

      // Si la respuesta es undefined o null
      if (!response) {
        throw new Error('No se recibió respuesta del servidor');
      }

      // Si la respuesta tiene un error
      if (response.error) {
        throw new Error(response.error);
      }

      // Asumiendo que la respuesta viene directamente con los datos del usuario
      const profileData = response;
      console.log('Datos del perfil:', profileData);

      setFormData({
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        email: profileData.email || '',
        city:
          profileData.city && profileData.city !== 'No especificado'
            ? profileData.city
            : '',
        address:
          profileData.address && profileData.address !== 'No especificado'
            ? profileData.address
            : '',
        phoneNumber: profileData.phoneNumber || '',
        birthDate: profileData.birthDate || null,
      });

      // Resetear errores al cargar el perfil
      setFieldErrors({});
    } catch (error) {
      console.error('Error al cargar el perfil:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      // Mostrar un mensaje más amigable al usuario
      Alert.alert(
        'Error',
        'No se pudo cargar tu perfil. Por favor, intenta de nuevo más tarde.',
        [{ text: 'Entendido' }]
      );

      // Establecer valores vacíos pero mantener el formato
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        address: '',
        phoneNumber: '',
        birthDate: null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <AccountHeader onBack={() => router.back()} />

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="large"
                color={YowPetTheme.brand.primary}
              />
              <Text style={styles.loadingText}>
                {isEditing ? 'Actualizando perfil...' : 'Cargando datos...'}
              </Text>
            </View>
          </View>
        )}

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.formContainer}>
            <FormField
              label="Nombre"
              value={formData.firstName}
              icon={
                <Ionicons
                  name="person"
                  size={24}
                  color={YowPetTheme.brand.primary}
                />
              }
              isEditing={isEditing}
              onChange={value => handleChange('firstName', value)}
              isRequired={true}
              hasError={!!fieldErrors.firstName}
            />

            <FormField
              label="Apellidos"
              value={formData.lastName}
              icon={
                <Ionicons
                  name="people"
                  size={24}
                  color={YowPetTheme.brand.primary}
                />
              }
              isEditing={isEditing}
              onChange={value => handleChange('lastName', value)}
              isRequired={true}
              hasError={!!fieldErrors.lastName}
            />

            <FormField
              label="Email"
              value={formData.email}
              icon={
                <MaterialIcons
                  name="email"
                  size={24}
                  color={YowPetTheme.brand.primary}
                />
              }
              isEditing={isEditing}
              onChange={value => handleChange('email', value)}
              options={{ keyboardType: 'email-address' }}
              isRequired={true}
              hasError={!!fieldErrors.email}
            />

            <FormField
              label="Ciudad"
              value={formData.city}
              icon={
                <Ionicons
                  name="location"
                  size={24}
                  color={YowPetTheme.brand.primary}
                />
              }
              isEditing={isEditing}
              onChange={value => handleChange('city', value)}
              isRequired={true}
              hasError={!!fieldErrors.city}
            />

            <FormField
              label="Dirección"
              value={formData.address}
              icon={
                <Ionicons
                  name="home"
                  size={24}
                  color={YowPetTheme.brand.primary}
                />
              }
              isEditing={isEditing}
              onChange={value => handleChange('address', value)}
              isRequired={true}
              hasError={!!fieldErrors.address}
            />

            <FormField
              label="Teléfono"
              value={formData.phoneNumber}
              icon={
                <Ionicons
                  name="call"
                  size={24}
                  color={YowPetTheme.brand.primary}
                />
              }
              isEditing={isEditing}
              onChange={value => handleChange('phoneNumber', value)}
              options={{ keyboardType: 'phone-pad' }}
              isRequired={true}
              hasError={!!fieldErrors.phoneNumber}
            />

            <FormField
              label="Fecha de nacimiento"
              value={formData.birthDate}
              icon={
                <Ionicons
                  name="calendar"
                  size={24}
                  color={YowPetTheme.brand.primary}
                />
              }
              isEditing={isEditing}
              onChange={value => handleChange('birthDate', value)}
              options={{ isDatePicker: true }}
              isRequired={true}
              hasError={!!fieldErrors.birthDate}
            />

            <ActionButtons
              isEditing={isEditing}
              onSave={handleSave}
              onCancel={() => {
                setIsEditing(false);
                setFieldErrors({});
                loadProfile();
              }}
              onEdit={() => setIsEditing(true)}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: YowPetTheme.background.mainWhite,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: YowPetTheme.background.softBackground,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: YowPetTheme.background.softBackground,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 32,
  },
  formContainer: {
    padding: 16,
    gap: 12,
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 10,
  },
  loadingContainer: {
    backgroundColor: YowPetTheme.background.mainWhite,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: YowPetTheme.shadow.softShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: YowPetTheme.text.mainText,
    fontWeight: '500',
  },
});
