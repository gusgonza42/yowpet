import { StyleSheet } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

export const styles = {
  // Estilos generales para OnboardingItem
  onboardingItem: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: YowPetTheme.background.mainWhite,
    },
  }),

  // Estilos para DecorationShape
  decorationShape: StyleSheet.create({
    backgroundShape: {
      position: 'absolute',
      height: '50%',
      zIndex: 1,
      backgroundColor: 'transparent', // Se establece dinámicamente
      borderBottomLeftRadius: 100,
    },
    decorationShape: {
      position: 'absolute',
      zIndex: 1,
      backgroundColor: 'transparent', // Se establece dinámicamente
      borderRadius: 50,
    },
  }),

  // Estilos para OnboardingContent
  onboardingContent: StyleSheet.create({
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 50,
      zIndex: 2,
    },
    petImage: {
      width: '80%',
      height: 300,
      marginTop: 50,
    },
    textContainer: {
      alignItems: 'center',
      marginVertical: 40,
      paddingHorizontal: 30,
    },
    logoText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: YowPetTheme.brand.primary,
      marginBottom: 15,
    },
    petText: {
      color: YowPetTheme.brand.orange,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      color: YowPetTheme.text.mainText,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
      gap: 100,
    },
    skipButton: {
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderRadius: 25,
      backgroundColor: YowPetTheme.brand.orange,
      minWidth: 120,
      alignItems: 'center',
    },
    skipText: {
      color: YowPetTheme.brand.support,
      fontSize: 16,
      fontWeight: '600',
    },
    continueButton: {
      backgroundColor: YowPetTheme.brand.primary,
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderRadius: 25,
    },
    continueText: {
      color: YowPetTheme.text.invertedText,
      fontSize: 16,
      fontWeight: '600',
    },
    emptySpace: {
      width: 100,
    },
  }),

  // Estilos para OnboardingPagination
  pagination: StyleSheet.create({
    paginationContainer: {
      position: 'absolute',
      bottom: 180,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      height: 12,
      borderRadius: 6,
      marginHorizontal: 6,
    },
    activeDot: {
      backgroundColor: '#003E52',
    },
    inactiveDot: {
      backgroundColor: '#D1D1D1',
    },
  }),

  // Estilos para la pantalla principal de Onboarding
  onboardingScreen: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
  }),
};
