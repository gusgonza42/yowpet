import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const { user, loading } = useAuth();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@onboarding_complete');
      setHasSeenOnboarding(value === 'true');
    } catch (err) {
      console.log('Error al verificar onboarding:', err);
    } finally {
      setCheckingOnboarding(false);
    }
  };

  if (loading || checkingOnboarding) return null;

  if (!hasSeenOnboarding) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  return <Redirect href={user ? '/(tabs)' : '/(auth)/auth'} />;
}
