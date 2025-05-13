import { StyleSheet, Dimensions, Platform } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

// Obtenemos dimensiones de la pantalla para cálculos relativos
const { width, height } = Dimensions.get('window');
const isSmallDevice = height < 700; // Determinar si es un dispositivo pequeño
const isWeb = Platform.OS === 'web'; // Determinar si estamos en web

// Función auxiliar para ajustes específicos de plataforma
const getResponsiveValue = (mobileValue, webValue) => {
  return isWeb ? webValue : mobileValue;
};

export const styles = {
  CustomHeader: StyleSheet.create({
    headerContainer: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: getResponsiveValue(isSmallDevice ? 10 : 20, 24),
      maxWidth: isWeb ? 600 : '100%',
      alignSelf: 'center',
    },
    headerTitle: {
      fontSize: getResponsiveValue(isSmallDevice ? 28 : 32, 36),
      fontWeight: 'bold',
    },
    yowText: {
      color: YowPetTheme.brand.primary,
    },
    petText: {
      color: YowPetTheme.brand.orange,
    },
  }),

  authTabs: StyleSheet.create({
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: getResponsiveValue(10, 15),
      marginBottom: getResponsiveValue(isSmallDevice ? 12 : 20, 24),
      maxWidth: isWeb ? 500 : '100%',
      alignSelf: 'center',
    },
    tab: {
      padding: getResponsiveValue(isSmallDevice ? 8 : 10, 12),
      borderRadius: 20,
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 5,
      justifyContent: 'center',
      cursor: isWeb ? 'pointer' : 'default',
    },
    activeTab: {
      backgroundColor: YowPetTheme.brand.primary,
    },
    tabText: {
      fontWeight: '600',
      fontSize: getResponsiveValue(isSmallDevice ? 13 : 14, 15),
      color: YowPetTheme.text.subtleText,
      textAlign: 'center',
    },
    activeTabText: {
      color: YowPetTheme.brand.white,
    },
  }),

  auth: StyleSheet.create({
    screenContainer: {
      backgroundColor: YowPetTheme.background.mainWhite,
      minHeight: isWeb ? '100vh' : '100%',
    },
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: isWeb ? 20 : 0,
    },
    authContainer: {
      width: getResponsiveValue('90%', '90%'),
      maxWidth: isWeb ? 450 : undefined,
      backgroundColor: YowPetTheme.surface.medium,
      borderRadius: 25,
      padding: getResponsiveValue(16, 24),
      shadowColor: YowPetTheme.shadow.mediumShadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
      alignSelf: 'center',
      ...(isWeb && {
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
        margin: '0 auto',
      }),
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      opacity: 0.8,
      ...(isWeb && {
        objectFit: 'cover',
      }),
    },
  }),

  form: StyleSheet.create({
    formContainer: {
      width: '100%',
      alignItems: 'center',
      maxWidth: isWeb ? 400 : '100%',
      alignSelf: 'center',
    },
    input: {
      width: '100%',
      marginVertical: getResponsiveValue(isSmallDevice ? 4 : 6, 8),
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      height: getResponsiveValue(isSmallDevice ? 45 : 55, 50),
      ...(isWeb && {
        outline: 'none',
        fontSize: '16px',
        paddingLeft: 40, // Espacio para el icono izquierdo
        paddingRight: 40, // Espacio para el icono derecho (en caso de contraseña)
      }),
    },
    submitButton: {
      width: '100%',
      marginTop: getResponsiveValue(isSmallDevice ? 10 : 15, 20),
      borderRadius: 25,
      height: getResponsiveValue(isSmallDevice ? 40 : 50, 48),
      backgroundColor: YowPetTheme.brand.primary,
      cursor: isWeb ? 'pointer' : 'default',
    },
    submitButtonContent: {
      height: getResponsiveValue(isSmallDevice ? 40 : 50, 48),
    },
    submitButtonLabel: {
      fontSize: getResponsiveValue(isSmallDevice ? 14 : 16, 16),
      fontWeight: 'bold',
      letterSpacing: 1,
      color: YowPetTheme.brand.white,
    },
    disabledButton: {
      opacity: 0.7,
      cursor: isWeb ? 'not-allowed' : 'default',
    },
  }),

  footer: StyleSheet.create({
    forgotPasswordText: {
      marginTop: getResponsiveValue(isSmallDevice ? 10 : 15, 18),
      fontSize: getResponsiveValue(12, 14),
      color: '#657786',
      textTransform: 'uppercase',
      textAlign: 'center',
      ...(isWeb && {
        cursor: 'pointer',
        textDecoration: 'none',
      }),
    },
    termsText: {
      marginTop: getResponsiveValue(isSmallDevice ? 10 : 15, 18),
      fontSize: getResponsiveValue(11, 13),
      color: '#657786',
      textAlign: 'center',
      maxWidth: isWeb ? 350 : '100%',
      alignSelf: 'center',
    },
    linkText: {
      color: '#1E3A4C',
      fontWeight: 'bold',
      ...(isWeb && {
        cursor: 'pointer',
        textDecoration: 'none',
      }),
    },
  }),

  password: StyleSheet.create({
    input: {
      width: '100%',
      marginVertical: getResponsiveValue(isSmallDevice ? 4 : 6, 8),
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      height: getResponsiveValue(isSmallDevice ? 45 : 55, 50),
      ...(isWeb && {
        outline: 'none',
        fontSize: '16px',
        paddingLeft: 40, // Espacio para el icono izquierdo
        paddingRight: 40, // Espacio para el icono derecho
      }),
    },
  }),

  SocialButtons: StyleSheet.create({
    separator: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginVertical: getResponsiveValue(isSmallDevice ? 15 : 25, 28),
      maxWidth: isWeb ? 350 : '100%',
      alignSelf: 'center',
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: '#E1E8ED',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#AAB8C2',
      marginHorizontal: 10,
    },
    socialButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginBottom: isSmallDevice ? 5 : 0,
    },
    socialButton: {
      width: getResponsiveValue(isSmallDevice ? 36 : 40, 48),
      height: getResponsiveValue(isSmallDevice ? 36 : 40, 48),
      borderRadius: getResponsiveValue(isSmallDevice ? 18 : 20, 24),
      backgroundColor: YowPetTheme.surface.light,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: getResponsiveValue(10, 15),
      shadowColor: YowPetTheme.shadow.softShadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      elevation: 2,
      borderWidth: 1,
      borderColor: YowPetTheme.border.softBorder,
      ...(isWeb && {
        cursor: 'pointer',
        transition: 'transform 0.2s, background-color 0.2s',
        ':hover': {
          transform: 'scale(1.05)',
          backgroundColor: YowPetTheme.surface.medium,
        },
      }),
    },
    socialButtonText: {
      fontSize: getResponsiveValue(isSmallDevice ? 18 : 20, 22),
      fontWeight: 'bold',
      color: YowPetTheme.brand.primary,
    },
    errorText: {
      color: YowPetTheme.status.errorState,
      fontSize: getResponsiveValue(11, 12),
      alignSelf: 'flex-start',
      textAlign: 'center',
      marginTop: 2,
      marginBottom: getResponsiveValue(isSmallDevice ? 3 : 6, 8),
      marginLeft: 8,
      maxWidth: '100%',
    },
  }),
  icons: StyleSheet.create({
    leftIcon: {
      ...(isWeb && {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
        zIndex: 1,
      }),
    },
    rightIcon: {
      ...(isWeb && {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
        zIndex: 1,
      }),
    },
    inputWrapper: {
      ...(isWeb && {
        position: 'relative',
        width: '100%',
      }),
    },
  }),

  // Los estilos específicos para los inputs web
  webInputs: StyleSheet.create({
    inputContainer: {
      position: 'relative',
      width: '100%',
      marginVertical: 8,
    },
    label: {
      position: 'absolute',
      left: 12,
      top: -10,
      backgroundColor: '#fff',
      paddingHorizontal: 4,
      fontSize: 12,
      color: YowPetTheme.text.subtleText,
      zIndex: 1,
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: YowPetTheme.border.softBorder,
      borderRadius: 10,
      paddingLeft: 40,
      paddingRight: 40,
      fontSize: 16,
      backgroundColor: '#FFFFFF',
      outline: 'none',
    },
    errorBorder: {
      borderColor: YowPetTheme.status.errorState,
    },
    focusedBorder: {
      borderColor: YowPetTheme.brand.primary,
    },
    iconLeft: {
      position: 'absolute',
      left: 12,
      top: '50%',
      transform:
        Platform.OS === 'web' ? 'translateY(-12px)' : [{ translateY: -12 }],
      zIndex: 2,
    },
    iconRight: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform:
        Platform.OS === 'web' ? 'translateY(-12px)' : [{ translateY: -12 }],
      zIndex: 2,
      cursor: 'pointer',
    },
    placeholder: {
      color: '#aaa',
    },
  }),
  // Estilos específicos para web
  web: StyleSheet.create({
    mainContainer: {
      display: isWeb ? 'flex' : 'none',
      flexDirection: 'column',
      minHeight: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: YowPetTheme.background.mainWhite,
      padding: '20px',
    },
    formWrapper: {
      width: '100%',
      maxWidth: '450px',
      margin: '0 auto',
    },
    input: {
      fontSize: '16px',
      lineHeight: '24px',
      padding: '12px',
      borderRadius: '10px',
      outline: 'none',
      paddingLeft: '40px',
    },
    buttonHover: {
      transition: 'background-color 0.3s',
      ':hover': {
        backgroundColor: YowPetTheme.brand.primary || '#1565C0',
      },
    },
    inputContainer: {
      position: 'relative',
      width: '100%',
    },
    textInputWeb: {
      '::placeholder': {
        paddingLeft: '30px',
      },
    },
    authTabsWrapper: {
      display: 'flex',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto 24px',
    },
    responsiveContainer: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
  }),
};

// Agregar evento de redimensionamiento para web
if (Platform.OS === 'web') {
  Dimensions.addEventListener('change', () => {
    // Esto forzará una actualización cuando cambie el tamaño de la ventana en web
    const { width, height } = Dimensions.get('window');
    console.log('Dimensiones cambiadas:', { width, height });
    // Aquí podrías implementar un sistema de actualización de estado global si lo necesitas
  });
}
