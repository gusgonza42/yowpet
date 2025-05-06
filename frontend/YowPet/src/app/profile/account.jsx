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

      // Solo incluir contraseña si se ha modificado
      if (formData.password && formData.password !== '********') {
        dataToUpdate.password = formData.password;
      }

      const response = await userService.actualizarPerfil(dataToUpdate);

      // Verificar si la respuesta está en data
      const updatedData = response.data || response;

      if (!updatedData) {
        throw new Error('No se recibieron datos del servidor');
      }

      // Actualizar el formulario con los datos actualizados
      setFormData({
        firstName: updatedData.firstName || '',
        lastName: updatedData.lastName || '',
        username: updatedData.username || '',
        email: updatedData.email || '',
        password: '********',
        confirmPassword: '********',
        city: updatedData.city === 'No especificado' ? '' : updatedData.city,
        address:
          updatedData.address === 'No especificado' ? '' : updatedData.address,
        phoneNumber: updatedData.phoneNumber || '',
        birthDate: updatedData.birthDate,
      });

      setIsEditing(false);
      alert('Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert(error.response?.data?.message || 'Error al actualizar el perfil');
    }
  };

  const loadProfile = async () => {
    try {
      const response = await userService.obtenerPerfil();

      // Verificar si la respuesta está en data
      const userData = response.data || response;

      if (!userData) {
        throw new Error('No se recibieron datos del servidor');
      }

      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        username: userData.username || '',
        email: userData.email || '',
        password: '********',
        confirmPassword: '********',
        city: userData.city === 'No especificado' ? '' : userData.city,
        address: userData.address === 'No especificado' ? '' : userData.address,
        phoneNumber: userData.phoneNumber || '',
        birthDate: userData.birthDate,
      });
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
      alert('Error al cargar el perfil del usuario');
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
