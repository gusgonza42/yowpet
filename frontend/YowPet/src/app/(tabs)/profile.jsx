import React from 'react';
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
  const screenHeight = Dimensions.get('window').height;

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

  return (
    <ScreenContainer backgroundColor={YowPetTheme.background.mainWhite}>
      <SafeAreaView style={styles.ProfileScreen.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ProfileScreen.scrollView}
        >
          <ProfileHeader user={user} />
          <MenuSection items={menuItems} />
          <LogoutButton onPress={logout} />
          <AppFooter version="1.0.0" />
        </ScrollView>
      </SafeAreaView>
    </ScreenContainer>
  );
}
