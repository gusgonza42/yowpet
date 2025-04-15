import { Animated, StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { useRef, useState } from 'react';
import { YowPetTheme } from '@theme/Colors';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { LoginHeader } from '@components/auth/LoginForm/LoginHeader';
import { router } from 'expo-router';
import { APP_ROUTES } from '@constants/Routes';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeAnimation = toValue => {
    Animated.timing(fadeAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleModeChange = newValue => {
    fadeAnimation(0);
    setTimeout(() => {
      setIsLogin(newValue === 'login');
      fadeAnimation(1);
    }, 200);
  };
  const handleSubmit = () => {
    // Aquí puedes agregar la lógica de validación y autenticación
    if (isLogin) {
      // Lógica de inicio de sesión
      router.replace(APP_ROUTES.TABS.HOME);
    } else {
      // Lógica de registro
      router.replace(APP_ROUTES.TABS.HOME);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <LoginHeader />
        <View style={styles.authContainer}>
          <SegmentedButtons
            value={isLogin ? 'login' : 'register'}
            onValueChange={handleModeChange}
            style={styles.segmentedButton}
            buttons={[
              {
                value: 'login',
                label: 'Iniciar Sesión',
                icon: 'login',
              },
              {
                value: 'register',
                label: 'Registrarse',
                icon: 'account-plus',
              },
            ]}
          />
          <View style={styles.buttonContainer}>
            <Button
              mode={isLogin ? 'contained' : 'outlined'}
              style={[
                styles.button,
                isLogin && styles.activeButton,
                { borderColor: YowPetTheme.brand.primary },
              ]}
              onPress={() => handleModeChange(true)}
              icon="login"
              buttonColor={YowPetTheme.brand.primary}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              textColor={
                isLogin ? YowPetTheme.brand.white : YowPetTheme.brand.primary
              }
            >
              Iniciar Sesión
            </Button>
            <Button
              mode={!isLogin ? 'contained' : 'outlined'}
              style={[
                styles.button,
                !isLogin && styles.activeButton,
                { borderColor: YowPetTheme.brand.primary },
              ]}
              onPress={() => handleModeChange(false)}
              icon="account-plus"
              buttonColor={YowPetTheme.brand.primary}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              textColor={
                !isLogin ? YowPetTheme.brand.white : YowPetTheme.brand.primary
              }
            >
              Registrarse
            </Button>
          </View>

          <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
            {!isLogin && (
              <TextInput
                label="Nombre completo"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="account" />}
                outlineColor={YowPetTheme.border.softBorder}
                activeOutlineColor={YowPetTheme.brand.primary}
                textColor={YowPetTheme.text.mainText}
              />
            )}
            <TextInput
              label="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="email" />}
              keyboardType="email-address"
              autoCapitalize="none"
              outlineColor={YowPetTheme.border.softBorder}
              activeOutlineColor={YowPetTheme.brand.primary}
              textColor={YowPetTheme.text.mainText}
            />
            <TextInput
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="lock" />}
              right={<TextInput.Icon icon="eye" />}
              outlineColor={YowPetTheme.border.softBorder}
              activeOutlineColor={YowPetTheme.brand.primary}
              textColor={YowPetTheme.text.mainText}
            />
            {!isLogin && (
              <TextInput
                label="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="lock-check" />}
                right={<TextInput.Icon icon="eye" />}
                outlineColor={YowPetTheme.border.softBorder}
                activeOutlineColor={YowPetTheme.brand.primary}
                textColor={YowPetTheme.text.mainText}
              />
            )}
            <Button
              mode="contained"
              style={styles.submitButton}
              contentStyle={styles.submitButtonContent}
              labelStyle={styles.submitButtonLabel}
              buttonColor={YowPetTheme.brand.primary}
              textColor={YowPetTheme.brand.white}
              onPress={handleSubmit}
            >
              {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </Button>
          </Animated.View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  authContainer: {
    width: '100%',
    alignItems: 'center',
  },
  segmentedButton: {
    width: '90%',
    marginVertical: 20,
    backgroundColor: YowPetTheme.background.mainWhite,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 2,
  },
  activeButton: {
    elevation: 4,
    shadowColor: YowPetTheme.shadow.mediumShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonContent: {
    height: 45,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    marginVertical: 6,
    backgroundColor: YowPetTheme.background.mainWhite,
  },
  submitButton: {
    width: '100%',
    marginTop: 20,
    borderRadius: 12,
    elevation: 4,
  },
  submitButtonContent: {
    height: 50,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
