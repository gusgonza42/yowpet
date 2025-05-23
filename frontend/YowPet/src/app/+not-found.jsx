import { Link, Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ScreenContainer style={styles.container}>
        <Text style={styles.title}>¡Esta página no existe!</Text>
        <Link href="/(auth)/auth" style={styles.link}>
          <Text style={styles.linkText}>Volver al inicio</Text>
        </Link>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: '#2e78b7',
  },
});
