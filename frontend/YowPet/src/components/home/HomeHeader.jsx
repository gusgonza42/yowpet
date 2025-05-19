import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { YowPetTheme } from '@theme/Colors';
import { useState, useEffect } from 'react';
import { userService } from '@service/profile/userService';

export function HomeHeader({ user }) {
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

  const getDisplayName = () => {
    if (userData?.firstName) return userData.firstName;
    if (user?.email) return user.email.split('@')[0];
    return 'Usuario';
  };

  const getAvatarLetter = () => {
    if (userData?.firstName) return userData.firstName.charAt(0);
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  return (
    <View style={styles.header}>
      <View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeYow}>¡Bienvenido/a a </Text>
          <Text style={styles.yow}>Yow</Text>
          <Text style={styles.pet}>Pet</Text>
          <Text style={styles.welcomeYow}>!</Text>
        </View>
        <Text style={styles.greeting}>Hola, {getDisplayName()} 👋</Text>
        <Text style={styles.subtitle}>¿Cómo están tus mascotas hoy?</Text>
      </View>
      <Pressable style={styles.profileButton}>
        {user?.photoUrl ? (
          <Image source={{ uri: user.photoUrl }} style={styles.profileImage} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarText}>{getAvatarLetter()}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  welcomeYow: {
    fontSize: 14,
    color: YowPetTheme.brand.support,
    fontWeight: '600',
  },
  yow: {
    fontSize: 14,
    color: YowPetTheme.brand.primary,
    fontWeight: '600',
  },
  pet: {
    fontSize: 14,
    color: YowPetTheme.brand.orange,
    fontWeight: '600',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: YowPetTheme.text.mainText,
  },
  subtitle: {
    fontSize: 16,
    color: YowPetTheme.text.softText,
    marginTop: 4,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: YowPetTheme.brand.accent,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 25,
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: YowPetTheme.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  avatarText: {
    color: YowPetTheme.brand.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
