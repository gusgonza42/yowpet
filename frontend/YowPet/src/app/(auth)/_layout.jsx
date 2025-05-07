import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 200,
        contentStyle: { backgroundColor: 'white' },
        presentation: 'card',
      }}
    >
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="auth" />
    </Stack>
  );
}
