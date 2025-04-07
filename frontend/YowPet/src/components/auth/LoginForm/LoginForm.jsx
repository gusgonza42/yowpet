import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { router } from 'expo-router';
import { styles } from '@components/auth/LoginForm/styles';

export function LoginForm() {
  return (
    <View style={styles.formContainer}>
      <TextInput
        label="Email"
        style={styles.button}
        keyboardType="email-address"
      />
      <TextInput label="Contraseña" style={styles.button} secureTextEntry />
      <Button
        mode="contained"
        onPress={() => router.replace('/(tabs)')}
        style={styles.button}
      >
        Iniciar Sesión
      </Button>
    </View>
  );
}
