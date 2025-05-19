import {
  StyleSheet,
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
      const response = await petService.obtenerMascotas();
      setPets(response || []);
    } catch (error) {
      console.error('Error al cargar mascotas:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegisterPet = () => {
    router.push('/profile/pets');
  };

  return (
    <>
      <StatusBar
        backgroundColor={YowPetTheme.background.main}
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.safeArea}>
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
});
