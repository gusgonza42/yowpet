import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerTitle: 'Login',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Register',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
