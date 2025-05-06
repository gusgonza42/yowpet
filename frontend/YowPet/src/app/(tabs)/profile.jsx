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
import { useNavigation } from '@react-navigation/native';
import { ProfileHeader } from '@components/profile/ProfileHeader';
import { MenuSection } from '@components/profile/MenuSection';
import { LogoutButton } from '@components/profile/LogoutButton';
import { AppFooter } from '@components/profile/AppFooter';
import { styles } from '@components/profile/styles';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;

  const menuItems = [
    {
      id: 'account',
      title: 'Mi cuenta',
      icon: (
        <Ionicons name="person" size={24} color={YowPetTheme.brand.primary} />
      ),
      onPress: () => navigation.navigate('AccountDetails'),
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
      onPress: () => navigation.navigate('PaymentMethods'),
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
      onPress: () => navigation.navigate('WorkProfile'),
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
      onPress: () => navigation.navigate('Security'),
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
      onPress: () => navigation.navigate('Help'),
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
