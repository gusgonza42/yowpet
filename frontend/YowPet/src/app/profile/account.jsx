import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
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
  const [formData, setFormData] = useState({
    firstName: 'Cargando...',
    lastName: 'Cargando...',
    username: 'Cargando...',
    email: 'Cargando...',
    password: '********',
    confirmPassword: '********',
    city: 'Cargando...',
    address: 'Cargando...',
    phoneNumber: 'Cargando...',
    birthDate: null,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (formData.password !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      const dataToUpdate = {
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        username: formData.username || '',
        email: formData.email || '',
        city: formData.city || 'No especificado',
        address: formData.address || 'No especificado',
        phoneNumber: formData.phoneNumber || '',
        birthDate: formData.birthDate || null,
      };

      if (formData.password && formData.password !== '********') {
        dataToUpdate.password = formData.password;
      }

      const response = await userService.actualizarPerfil(dataToUpdate);
      console.log('Respuesta actualización:', response);

      if (!response || !response.data) {
        throw new Error('Error al actualizar el perfil');
      }

      const updatedData = response.data;
      setFormData({
        ...formData,
        ...updatedData,
        password: '********',
        confirmPassword: '********',
      });

      setIsEditing(false);
      alert('Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error detallado al actualizar:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert(
        error.response?.data?.message ||
          error.message ||
          'Error al actualizar el perfil'
      );
    }
  };

  const loadProfile = async () => {
    try {
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

      console.log('Respuesta raw del servidor:', response);

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
        username: profileData.username || '',
        email: profileData.email || '',
        password: '********',
        confirmPassword: '********',
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
    } catch (error) {
      console.error('Error al cargar el perfil:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        stack: error.stack,
      });

      // Mostrar un mensaje más amigable al usuario
      alert(
        'No se pudo cargar tu perfil. Por favor, intenta de nuevo más tarde.'
      );

      // Establecer valores vacíos pero mantener el formato
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '********',
        confirmPassword: '********',
        city: '',
        address: '',
        phoneNumber: '',
        birthDate: null,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <AccountHeader onBack={() => router.back()} />
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
            />

            <FormField
              label="Usuario"
              value={formData.username}
              icon={
                <MaterialIcons
                  name="alternate-email"
                  size={24}
                  color={YowPetTheme.brand.primary}
                />
              }
              isEditing={isEditing}
              onChange={value => handleChange('username', value)}
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
            />

            <FormField
              label="Contraseña"
              value={formData.password}
              icon={
                <MaterialIcons
                  name="lock"
                  size={24}
                  color={YowPetTheme.brand.primary}
                />
              }
              isEditing={isEditing}
              onChange={value => handleChange('password', value)}
              options={{ secureTextEntry: true }}
            />

            {isEditing && (
              <FormField
                label="Confirmar contraseña"
                value={formData.confirmPassword}
                icon={
                  <MaterialIcons
                    name="lock"
                    size={24}
                    color={YowPetTheme.brand.primary}
                  />
                }
                isEditing={isEditing}
                onChange={value => handleChange('confirmPassword', value)}
                options={{ secureTextEntry: true }}
              />
            )}

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
            />

            <ActionButtons
              isEditing={isEditing}
              onSave={handleSave}
              onCancel={() => {
                setIsEditing(false);
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
    backgroundColor: YowPetTheme.brand.primary,
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
});
