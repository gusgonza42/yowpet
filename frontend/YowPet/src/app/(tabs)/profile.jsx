import { Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import { APP_ROUTES } from '@constants/Routes';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';

export default function ProfileScreen() {
  // Usamos directamente COLORS para evitar problemas con el tema
  return (
    <ScreenContainer
      style={{ backgroundColor: YowPetTheme.background.mainWhite }}
    >
      <Text style={[styles.title, { color: YowPetTheme.text.primary }]}>
        Perfil Screen
      </Text>
      <Button
        mode="contained"
        onPress={() => router.replace(APP_ROUTES.AUTH.LOGIN)}
        style={[
          styles.button,
          { backgroundColor: YowPetTheme.button.dangerButton },
        ]}
        icon="logout"
      >
        Cerrar Sesión
      </Button>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
  },
});
