import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import { ScreenContainer } from '@components/global/ScreenContainer';

export default function Register() {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Button
          mode="contained"
          onPress={() => router.replace('/(tabs)')}
          style={styles.button}
        >
          Registrarse
        </Button>
        <Button mode="text" onPress={() => router.back()} style={styles.button}>
          ¿Ya tienes cuenta? Inicia sesión
        </Button>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    width: '80%',
  },
});
