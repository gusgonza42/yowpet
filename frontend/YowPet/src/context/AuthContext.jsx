import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { YowPetTheme } from '@theme/Colors';
import { useRouter, useSegments } from 'expo-router';
import { APP_ROUTES } from '@constants/Routes';

const AuthContext = createContext(null);

const useProtectedRoute = user => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (user && inAuthGroup) {
      router.replace(APP_ROUTES.TABS.HOME, {
        animation: 'none',
      });
    } else if (!user && inTabsGroup) {
      router.replace(APP_ROUTES.AUTH.AUTH, {
        animation: 'none',
      });
    }
  }, [user, segments]);
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useProtectedRoute(user);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@auth_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async userData => {
    setIsAuthenticating(true);
    try {
      await AsyncStorage.setItem('@auth_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    setIsAuthenticating(true);
    try {
      await AsyncStorage.removeItem('@auth_user');
      setUser(null);
      return true;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (loading || isAuthenticating) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={YowPetTheme.brand.primary} />
      </View>
    );
  }

  const value = {
    user,
    loading,
    isAuthenticating,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
