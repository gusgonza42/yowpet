import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { userService } from '@service/profile/userService';

export const ProfileHeader = ({ user, screenWidth }) => {
  const router = useRouter();
  const isSmallScreen = screenWidth < 360;
  const isVerySmallScreen = screenWidth < 320;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        if (user?.userId) {
          const datos = await userService.obtenerPerfil();
          setUserData(datos);
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      }
    };

    cargarDatosUsuario();
  }, [user]);

  const dynamicStyles = {
    profileSection: {
      ...styles.ProfileHeader.profileSection,
      flexDirection: isVerySmallScreen ? 'column' : 'row',
      alignItems: isVerySmallScreen ? 'center' : 'center',
    },
    profileInfo: {
      ...styles.ProfileHeader.profileInfo,
      marginLeft: isVerySmallScreen ? 0 : 16,
      marginTop: isVerySmallScreen ? 10 : 0,
      alignItems: isVerySmallScreen ? 'center' : 'flex-start',
    },
    quickLinksContainer: {
      ...styles.ProfileHeader.quickLinksContainer,
      flexDirection: isSmallScreen ? 'column' : 'row',
      marginTop: isSmallScreen ? 10 : 15,
    },
    quickLink: {
      ...styles.ProfileHeader.quickLink,
      marginTop: isSmallScreen ? 8 : 0,
      width: isSmallScreen ? '100%' : undefined,
      flex: isSmallScreen ? 0 : 1,
    },
  };

  const nombreCompleto = userData
    ? `${userData.firstName || ''} ${userData.lastName || ''}`
    : 'Cargando...';

  return (
    <View style={styles.ProfileHeader.header}>
      <View style={dynamicStyles.profileSection}>
        <View style={styles.ProfileHeader.avatarContainer}>
          <Image
            source={require('@assets/logos/icon.png')}
            style={styles.ProfileHeader.avatar}
            defaultSource={require('@assets/logos/icon_fondo.png')}
          />
          <TouchableOpacity style={styles.ProfileHeader.addButtonContainer}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={dynamicStyles.profileInfo}>
          <Text style={styles.ProfileHeader.profileName}>{nombreCompleto}</Text>
          <Text style={styles.ProfileHeader.profileEmail}>
            {user?.email || 'notemail@yowpet.cat'}
          </Text>
        </View>
      </View>

      <View style={dynamicStyles.quickLinksContainer}>
        <TouchableOpacity
          style={dynamicStyles.quickLink}
          onPress={() => router.push('/profile/pets')}
        >
          <View
            style={[
              styles.ProfileHeader.quickLinkIcon,
              { backgroundColor: '#f0e7fd' },
            ]}
          >
            <MaterialIcons
              name="pets"
              size={22}
              color={YowPetTheme.brand.primary}
            />
          </View>
          <Text style={styles.ProfileHeader.quickLinkText}>Mis mascotas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={dynamicStyles.quickLink}
          onPress={() => router.push('/profile/club')}
        >
          <View
            style={[
              styles.ProfileHeader.quickLinkIcon,
              { backgroundColor: '#ffeee6' },
            ]}
          >
            <Ionicons name="star-outline" size={22} color="#ff6b00" />
          </View>
          <Text style={styles.ProfileHeader.quickLinkText}>YowPet Club</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
