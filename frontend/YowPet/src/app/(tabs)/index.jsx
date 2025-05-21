import {
  StyleSheet, View,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { YowPetTheme } from '@theme/Colors';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { HomeHeader } from '@components/home/HomeHeader';
import { PetHighlight } from '@components/home/PetHighlight';
import { QuickAccess } from '@components/home/QuickAccess';
import { DailyPlans } from '@components/home/DailyPlans';
import { DailyTip } from '@components/home/DailyTip';
import { useState, useEffect } from 'react';
import { petService } from '../../services/profile/pet/petService';
import { ActivityIndicator, Text } from 'react-native';
import { userService } from '@/services/profile/userService';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    cargarMascotas();
  }, []);
  const cargarMascotas = async () => {
    try {
      setIsLoading(true);
      const userId = await userService.getUserIdFromToken();
      const response = await petService.obtenerMascotas(userId);
      setPets(response || []);
    } catch (error) {
      console.error('Error al cargar mascotas:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegisterPet = () => {
    router.push('/profile/pets/new');
  };
  const LoadingOverlay = () => (
    <View style={styles.overlayContainer}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={YowPetTheme.brand.accent} />
        <Text style={styles.overlayText}>Cargando mascotas...</Text>
      </View>
    </View>
  );

  return (
    <>
      <StatusBar
        backgroundColor={YowPetTheme.background.main}
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.safeArea}>
        {isLoading ? (
          <View style={styles.loadingScreen}>
            <ActivityIndicator size="large" color={YowPetTheme.brand.accent} />
            <Text style={styles.loadingText}>Cargando inicio...</Text>
          </View>
        ) : (
          <ScrollView style={styles.scrollView}>
            <HomeHeader user={user} />
            <PetHighlight
              pets={pets}
              onAddPet={handleRegisterPet}
              isLoading={isLoading}
            />
            <QuickAccess />
            <DailyPlans />
            <DailyTip />
          </ScrollView>
        )}
        {isLoading && <LoadingOverlay />}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: YowPetTheme.brand.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 80,
    backgroundColor: YowPetTheme.brand.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
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
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: YowPetTheme.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: YowPetTheme.brand.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: YowPetTheme.brand.white,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  loadingText: {
    color: YowPetTheme.brand.accent,
    fontSize: 16,
    marginTop: 12,
    fontWeight: '600',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlay: {
    backgroundColor: YowPetTheme.brand.primary,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  overlayText: {
    color: YowPetTheme.brand.accent,
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});