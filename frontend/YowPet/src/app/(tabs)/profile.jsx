import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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
      id: 'discounts',
      title: 'Códigos descuento',
      icon: (
        <MaterialIcons
          name="local-offer"
          size={24}
          color={YowPetTheme.brand.primary}
        />
      ),
      onPress: () => navigation.navigate('DiscountCodes'),
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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Header con información del perfil */}
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                <Image
                  source={require('@assets/logos/icon.png')}
                  style={styles.avatar}
                  defaultSource={require('@assets/logos/icon_fondo.png')}
                />
                <TouchableOpacity style={styles.addButtonContainer}>
                  <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>
                  {user?.fullName || 'Tester YowPet'}
                </Text>
                <Text style={styles.profileEmail}>
                  {user?.email || 'notemail@yowpet.cat'}
                </Text>
              </View>
            </View>

            {/* Secciones de Mis mascotas y YowPet Club */}
            <View style={styles.quickLinksContainer}>
              <TouchableOpacity
                style={styles.quickLink}
                onPress={() => navigation.navigate('MyPets')}
              >
                <View
                  style={[styles.quickLinkIcon, { backgroundColor: '#f0e7fd' }]}
                >
                  <MaterialIcons
                    name="pets"
                    size={22}
                    color={YowPetTheme.brand.primary}
                  />
                </View>
                <Text style={styles.quickLinkText}>Mis mascotas</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickLink}
                onPress={() => navigation.navigate('YowPetClub')}
              >
                <View
                  style={[styles.quickLinkIcon, { backgroundColor: '#ffeee6' }]}
                >
                  <Ionicons name="star-outline" size={22} color="#ff6b00" />
                </View>
                <Text style={styles.quickLinkText}>YowPet Club</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Elementos del menú */}
          <View style={styles.menuContainer}>
            <>
              {menuItems.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    {item.icon}
                    <View style={styles.menuItemTextContainer}>
                      <Text style={styles.menuItemTitle}>{item.title}</Text>
                      {item.subtitle && (
                        <Text style={styles.menuItemSubtitle}>
                          {item.subtitle}
                        </Text>
                      )}
                    </View>
                  </View>
                  {item.showArrow && (
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={YowPetTheme.text.subtleText}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </>
          </View>

          {/* Botón de cerrar sesión */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={20} color="#de3b3b" />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>

          {/* Versión de la App */}
          <View style={styles.footerContainer}>
            <Text>
              <Text
                style={{
                  color: YowPetTheme.brand.primary,
                  fontWeight: '500',
                  fontSize: 16,
                }}
              >
                Yow
              </Text>
              <Text
                style={{ color: '#ff6b00', fontWeight: '500', fontSize: 16 }}
              >
                Pet
              </Text>
            </Text>
            <Text style={styles.versionNumber}>Versión 1.0.0</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 0,
    backgroundColor: YowPetTheme.background.mainWhite,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E1E1E1',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: YowPetTheme.brand.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: YowPetTheme.text.mainText,
  },
  profileEmail: {
    fontSize: 14,
    color: YowPetTheme.text.subtleText,
    marginTop: 4,
  },
  quickLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
  },
  quickLink: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: YowPetTheme.background.subtle,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginHorizontal: 5,
    height: 100,
  },
  quickLinkIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickLinkText: {
    fontSize: 16,
    fontWeight: '600',
    color: YowPetTheme.text.mainText,
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: YowPetTheme.background.mainWhite,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 10,
    paddingVertical: 5,
    shadowColor: YowPetTheme.shadow.mediumShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: YowPetTheme.background.subtle,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    color: YowPetTheme.text.mainText,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: YowPetTheme.text.subtleText,
    marginTop: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    gap: 8,
  },
  versionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  versionNumber: {
    fontSize: 14,
    color: YowPetTheme.text.subtleText,
  },
  logoutButton: {
    backgroundColor: '#fff0f0',
    marginHorizontal: 90,
    marginBottom: 20,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffcece',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#de3b3b20',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  logoutText: {
    color: '#de3b3b',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
