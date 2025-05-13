import { Dimensions, Platform, StyleSheet } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

const { width, height } = Dimensions.get('window');
const isSmallDevice = height < 700;
const isWeb = Platform.OS === 'web';

const getResponsiveValue = (mobileValue, webValue) => {
  return isWeb ? webValue : mobileValue;
};

// Función mejorada para obtener valores adaptativos en pantallas grandes
const getWebResponsiveValue = (defaultValue, wideValue, ultraWideValue) => {
  if (!isWeb) return defaultValue;
  if (width > 1600) return ultraWideValue || wideValue;
  return width > 1200 ? wideValue : defaultValue;
};

export const styles = {
  ProfileHeader: StyleSheet.create({
    header: {
      paddingHorizontal: getResponsiveValue(20, 30),
      paddingTop: getResponsiveValue(10, 15),
      paddingBottom: 0,
      backgroundColor: YowPetTheme.background.mainWhite,
      ...(isWeb && {
        maxWidth: getWebResponsiveValue('800px', '1200px', '90%'),
        marginTop: 0,
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
      }),
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: getResponsiveValue(20, 30),
      ...(isWeb && {
        flexWrap: 'wrap',
        justifyContent: width > 768 ? 'flex-start' : 'center',
      }),
    },
    avatarContainer: {
      position: 'relative',
    },
    avatar: {
      width: getResponsiveValue(isSmallDevice ? 60 : 70, 85),
      height: getResponsiveValue(isSmallDevice ? 60 : 70, 85),
      borderRadius: getResponsiveValue(isSmallDevice ? 30 : 35, 42.5),
      backgroundColor: '#E1E1E1',
    },
    addButtonContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: YowPetTheme.brand.primary,
      width: getResponsiveValue(isSmallDevice ? 22 : 24, 28),
      height: getResponsiveValue(isSmallDevice ? 22 : 24, 28),
      borderRadius: getResponsiveValue(isSmallDevice ? 11 : 12, 14),
      justifyContent: 'center',
      alignItems: 'center',
      cursor: isWeb ? 'pointer' : 'default',
    },
    profileInfo: {
      marginLeft: getResponsiveValue(16, 20),
      flex: 1,
      ...(isWeb && {
        textAlign: width > 768 ? 'left' : 'center',
        marginLeft: width > 768 ? getResponsiveValue(16, 20) : 0,
        marginTop: width > 768 ? 0 : 10,
      }),
    },
    profileName: {
      fontSize: getResponsiveValue(isSmallDevice ? 18 : 20, 22),
      fontWeight: 'bold',
      color: YowPetTheme.text.mainText,
    },
    profileEmail: {
      fontSize: getResponsiveValue(isSmallDevice ? 13 : 14, 15),
      color: YowPetTheme.text.subtleText,
      marginTop: 4,
    },
    quickLinksContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: getResponsiveValue(15, 20),
      marginBottom: getResponsiveValue(15, 20),
      ...(isWeb && {
        flexWrap: 'wrap',
        rowGap: 10,
        columnGap: 10,
        justifyContent: width > 1200 ? 'flex-start' : 'space-between',
      }),
    },
    quickLink: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: YowPetTheme.background.subtle,
      paddingVertical: getResponsiveValue(16, 20),
      paddingHorizontal: getResponsiveValue(10, 15),
      borderRadius: 12,
      marginHorizontal: 5,
      height: getResponsiveValue(isSmallDevice ? 90 : 100, 110),
      cursor: isWeb ? 'pointer' : 'default',
      ...(isWeb && {
        transition: 'transform 0.2s, background-color 0.2s',
        minWidth: getWebResponsiveValue('120px', '180px', '220px'),
        flexGrow: 0,
        flexShrink: 0,
        flexBasis:
          width > 1600
            ? '18%'
            : width > 1200
              ? '22%'
              : width > 768
                ? '30%'
                : 'calc(50% - 20px)',
        marginTop: 5,
        marginRight: 5,
        marginBottom: 5,
        marginLeft: 5,
      }),
    },
    quickLinkIcon: {
      width: getResponsiveValue(isSmallDevice ? 45 : 50, 55),
      height: getResponsiveValue(isSmallDevice ? 45 : 50, 55),
      borderRadius: getResponsiveValue(isSmallDevice ? 22.5 : 25, 27.5),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    quickLinkText: {
      fontSize: getResponsiveValue(isSmallDevice ? 14 : 16, 17),
      fontWeight: '600',
      color: YowPetTheme.text.mainText,
      textAlign: 'center',
    },
  }),

  MenuItem: StyleSheet.create({
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: getResponsiveValue(isSmallDevice ? 14 : 16, 18),
      paddingHorizontal: getResponsiveValue(isSmallDevice ? 14 : 16, 18),
      borderBottomWidth: 1,
      borderBottomColor: YowPetTheme.background.subtle,
      cursor: isWeb ? 'pointer' : 'default',
      ...(isWeb && {
        transition: 'background-color 0.2s',
      }),
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuItemTextContainer: {
      marginLeft: 16,
      flex: 1,
    },
    menuItemTitle: {
      fontSize: getResponsiveValue(isSmallDevice ? 15 : 16, 17),
      color: YowPetTheme.text.mainText,
    },
    menuItemSubtitle: {
      fontSize: getResponsiveValue(isSmallDevice ? 11 : 12, 13),
      color: YowPetTheme.text.subtleText,
      marginTop: 2,
    },
  }),

  MenuSection: StyleSheet.create({
    menuContainer: {
      backgroundColor: YowPetTheme.background.mainWhite,
      borderRadius: 12,
      marginHorizontal: getResponsiveValue(20, 30),
      marginTop: 0,
      marginBottom: 10,
      paddingVertical: 5,
      ...(isWeb && {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: getWebResponsiveValue('800px', '1200px', '90%'),
        marginTop: 0,
        marginRight: 'auto',
        marginBottom: 10,
        marginLeft: 'auto',
      }),
    },
  }),

  LogoutButton: StyleSheet.create({
    logoutButton: {
      backgroundColor: '#fff0f0',
      marginHorizontal: getResponsiveValue(isSmallDevice ? 80 : 90, 120),
      marginVertical: getResponsiveValue(isSmallDevice ? 15 : 20, 25),
      paddingVertical: getResponsiveValue(isSmallDevice ? 8 : 10, 12),
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ffcece',
      flexDirection: 'row',
      justifyContent: 'center',
      cursor: isWeb ? 'pointer' : 'default',
      ...(isWeb && {
        transition: 'background-color 0.2s, transform 0.2s',
        maxWidth: getWebResponsiveValue('320px', '400px', '450px'),
        marginTop: 20,
        marginRight: 'auto',
        marginBottom: 20,
        marginLeft: 'auto',
      }),
    },
    logoutText: {
      color: '#de3b3b',
      fontSize: getResponsiveValue(isSmallDevice ? 15 : 16, 17),
      fontWeight: '600',
      marginLeft: 8,
    },
  }),

  AppFooter: StyleSheet.create({
    footerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: getResponsiveValue(isSmallDevice ? 0 : 5, 10),
      rowGap: 8,
      marginVertical: getResponsiveValue(5, 10),
      ...(isWeb && {
        maxWidth: getWebResponsiveValue('800px', '1200px', '90%'),
        marginTop: 5,
        marginRight: 'auto',
        marginBottom: 5,
        marginLeft: 'auto',
      }),
    },
    brandPrimary: {
      color: YowPetTheme.brand.primary,
      fontWeight: '500',
      fontSize: getResponsiveValue(isSmallDevice ? 15 : 16, 18),
    },
    brandSecondary: {
      color: '#ff6b00',
      fontWeight: '500',
      fontSize: getResponsiveValue(isSmallDevice ? 15 : 16, 18),
    },
    versionNumber: {
      fontSize: getResponsiveValue(isSmallDevice ? 12 : 14, 15),
      color: YowPetTheme.text.subtleText,
    },
  }),

  ProfileScreen: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: YowPetTheme.background.mainWhite,
      ...(isWeb && {
        maxWidth: getWebResponsiveValue('1200px', '90%', '95%'),
        marginTop: 0,
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
      }),
    },
    scrollView: {
      paddingBottom: 100,
    },
  }),

  // Estilos específicos para web con mejoras de responsividad
  web: StyleSheet.create({
    profileContainer: {
      display: isWeb ? 'flex' : 'none',
      flexDirection: 'column',
      maxWidth: getWebResponsiveValue('900px', '90%', '95%'),
      marginTop: 0,
      marginRight: 'auto',
      marginBottom: 0,
      marginLeft: 'auto',
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
      backgroundColor: YowPetTheme.background.mainWhite,
    },
    responsiveContainer: {
      width: '100%',
      maxWidth: getWebResponsiveValue('1200px', '90%', '95%'),
      marginTop: 0,
      marginRight: 'auto',
      marginBottom: 0,
      marginLeft: 'auto',
      paddingTop: 0,
      paddingRight: 20,
      paddingBottom: 0,
      paddingLeft: 20,
    },
    menuItemHover: {
      transition: 'background-color 0.2s',
      cursor: 'pointer',
    },
    quickLinkHover: {
      transition: 'transform 0.2s',
      cursor: 'pointer',
    },
    // Nuevos estilos para pantallas grandes
    contentLayout: {
      display: 'flex',
      flexDirection: width > 1200 ? 'row' : 'column',
      rowGap: 20,
      columnGap: 20,
    },
    sidebar: {
      flexGrow: width > 1200 ? 0 : 1,
      flexShrink: width > 1200 ? 0 : 1,
      flexBasis: width > 1600 ? 350 : width > 1200 ? 300 : 'auto',
      order: width > 1200 ? 1 : 2,
    },
    mainContent: {
      flex: width > 1200 ? 1 : '1',
      order: width > 1200 ? 2 : 1,
    },
    // Para distribución en columnas en pantallas grandes
    columnLayout: {
      display: 'grid',
      gridTemplateColumns:
        width > 1600
          ? 'repeat(5, 1fr)'
          : width > 1200
            ? 'repeat(4, 1fr)'
            : width > 768
              ? 'repeat(3, 1fr)'
              : width > 480
                ? 'repeat(2, 1fr)'
                : '1fr',
      rowGap: 20,
      columnGap: 20,
    },
  }),
};

// Mejorar el sistema de redimensionamiento para web
if (Platform.OS === 'web') {
  let resizeTimeout;

  Dimensions.addEventListener('change', () => {
    // Implementamos un debounce para evitar demasiadas actualizaciones
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const { width, height } = Dimensions.get('window');
      console.log('Dimensiones actualizadas:', { width, height });

      // Aquí podrías implementar una función para actualizar el estado global
      // Por ejemplo: updateLayoutState({ width, height });
    }, 200);
  });
}
