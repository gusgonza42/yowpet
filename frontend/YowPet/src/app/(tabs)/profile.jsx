import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ProfileHeader } from '@components/profile/ProfileHeader';
import { MenuSection } from '@components/profile/MenuSection';
import { LogoutButton } from '@components/profile/LogoutButton';
import { AppFooter } from '@components/profile/AppFooter';
import { styles } from '@components/profile/styles';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  // Actualizar dimensiones cuando cambia la orientación
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const menuItems = [
    {
      id: 'account',
      title: 'Mi cuenta',
      icon: (
        <Ionicons name="person" size={24} color={YowPetTheme.brand.primary} />
      ),
      onPress: () => router.push('/profile/account'),
      showArrow: true,
    },
    {
      id: 'payment',
      title: 'Métodos de pago',
      icon: (
        <MaterialIcons
          name="payment"
          size={24}
          color={YowPetTheme.brand.primary}
        />
      ),
      onPress: () => router.push('/profile/payment'),
      showArrow: true,
    },
    {
      id: 'profile',
      title: 'Perfil de trabajo',
      icon: (
        <MaterialCommunityIcons
          name="briefcase-outline"
          size={24}
          color={YowPetTheme.brand.primary}
        />
      ),
      subtitle: '¡Actívalo para recibir facturas!',
      onPress: () => router.push('/profile/work'),
      showArrow: true,
    },
    {
      id: 'security',
      title: 'Seguridad',
      icon: (
        <MaterialIcons
          name="security"
          size={24}
          color={YowPetTheme.brand.primary}
        />
      ),
      subtitle: 'Revisa todos los recursos',
      onPress: () => router.push('/profile/security'),
      showArrow: true,
    },
    {
      id: 'help',
      title: 'Ayuda',
      icon: (
        <MaterialIcons
          name="help-outline"
          size={24}
          color={YowPetTheme.brand.primary}
        />
      ),
      onPress: () => router.push('/profile/help'),
      showArrow: true,
    },
  ];

  const dynamicStyles = {
    container: {
      ...styles.ProfileScreen.container,
      paddingBottom: dimensions.height < 700 ? 80 : 100,
    },
  };

  return (
    <ScreenContainer backgroundColor={YowPetTheme.background.mainWhite}>
      <SafeAreaView style={dynamicStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            ...styles.ProfileScreen.scrollView,
            paddingBottom: dimensions.height < 600 ? 50 : 100,
          }}
        >
          <ProfileHeader user={user} screenWidth={dimensions.width} />
          <MenuSection items={menuItems} />
          <LogoutButton onPress={logout} screenWidth={dimensions.width} />
          <AppFooter version="1.0.0" />
        </ScrollView>
      </SafeAreaView>
    </ScreenContainer>
  );
}
