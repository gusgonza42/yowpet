import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { YowPetTheme } from '@theme/Colors';
import { useRouter, useSegments } from 'expo-router';
import { APP_ROUTES } from '@constants/Routes';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

const useProtectedRoute = user => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (user && inAuthGroup) {
      router.replace(APP_ROUTES.TABS.HOME, { animation: 'none' });
    } else if (!user && inTabsGroup) {
      router.replace(APP_ROUTES.AUTH.AUTH, { animation: 'none' });
    }
  }, [user, segments]);
};

const processUserData = rawUserData => {
  let decodedData = {};
  if (rawUserData.token) {
    try {
      decodedData = jwtDecode(rawUserData.token);
      console.log('Token decodificado:', decodedData);

    } catch (error) {
      console.error('Error al decodificar token:', error);
    }
  }

  return {
    ...rawUserData,
    // Verifica ambos formatos posibles: id o userId
    userId: decodedData.id || decodedData.userId || decodedData.sub || rawUserData.userId || rawUserData.id,
    email: decodedData.email || decodedData.mail || rawUserData.email,
    firstName: rawUserData.firstName || '',
    lastName: rawUserData.lastName || '',
    username: rawUserData.username || rawUserData.email?.split('@')[0] || '',
    token: rawUserData.token,
    roles: rawUserData.roles || [],
  };
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
      const userDataString = await AsyncStorage.getItem('@auth_user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveUserData = async userData => {
    const processedData = processUserData(userData);
    try {
      await AsyncStorage.multiSet([
        ['@auth_token', processedData.token],
        ['@auth_userId', processedData.userId.toString()],
        ['@auth_email', processedData.email],
        ['@auth_user', JSON.stringify(processedData)],
      ]);
      setUser(processedData);
      return true;
    } catch (error) {
      console.error('Error al guardar datos:', error);
      return false;
    }
  };

  const login = async rawUserData => {
    setIsAuthenticating(true);
    try {
      return await saveUserData(rawUserData);
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const register = async rawUserData => {
    setIsAuthenticating(true);
    try {
      return await saveUserData(rawUserData);
    } catch (error) {
      console.error('Error en registro:', error);
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    setIsAuthenticating(true);
    try {
      await AsyncStorage.clear();
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
      <View style={authContextStyles.loaderContainer}>
        <View style={authContextStyles.loaderWrapper}>
          <ActivityIndicator size={36} color={YowPetTheme.brand.primary} />
        </View>
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticating,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

const authContextStyles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: YowPetTheme.brand.white,
  },
  loaderWrapper: {
    padding: 8,
  },
});