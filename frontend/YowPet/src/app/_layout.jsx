import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@/context/AuthContext';

export default function Layout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'none', // Desactiva la animación inicial
          }}
        >
          <Stack.Screen
            name="(auth)"
            options={{
              animation: 'none',
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              animation: 'none',
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
