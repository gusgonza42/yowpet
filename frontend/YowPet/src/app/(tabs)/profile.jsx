import { Platform, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { APP_ROUTES } from '@constants/Routes';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';

export default function ProfileScreen() {
  return (
    <ScreenContainer backgroundColor={YowPetTheme.background.mainWhite}>
      <View style={styles.header}>
        <Avatar.Image size={100} source={require('@assets/logos/icon.png')} />
        <Text style={styles.title}>John Doe</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Información Personal</Text>
          <Text style={styles.infoText}>Email: john@example.com</Text>
          <Text style={styles.infoText}>Teléfono: +1234567890</Text>
        </View>
      </View>

      <Button
        mode="contained"
        onPress={() => router.replace(APP_ROUTES.AUTH.AUTH)}
        style={styles.button}
        contentStyle={styles.buttonContent}
        icon="logout"
      >
        Cerrar Sesión
      </Button>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: YowPetTheme.text.mainText,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  infoCard: {
    backgroundColor: YowPetTheme.surface.light,
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    ...Platform.select({
      ios: {
        shadowColor: YowPetTheme.shadow.mediumShadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: YowPetTheme.text.mainText,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: YowPetTheme.text.subtleText,
  },
  button: {
    marginTop: 20,
    marginBottom: 100,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: YowPetTheme.button.dangerButton,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
