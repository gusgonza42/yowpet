import { StyleSheet } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

export const styles = {
  // Estilos generales para OnboardingItem
  onboardingItem: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: YowPetTheme.brand.mainWhite,
    },
  }),

  // Estilos para DecorationShape
  decorationShape: StyleSheet.create({
    backgroundShape: {
      position: 'absolute',
      height: '50%',
      zIndex: 1,
      backgroundColor: 'transparent',
      borderBottomLeftRadius: 100,
    },
    decorationShape: {
      position: 'absolute',
      zIndex: 1,
      backgroundColor: 'transparent',
      borderRadius: 50,
    },
  }),

  // Estilos para OnboardingContent
  onboardingContent: StyleSheet.create({
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 40,
      zIndex: 2,
    },
    petImage: {
      width: 500,
      height: 500,
      alignSelf: 'center',
      marginBottom: 40,
      marginTop: -30,
    },
    textContainer: {
      alignItems: 'center',
      marginVertical: 0,
      paddingHorizontal: 10,
    },
    logoText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: YowPetTheme.brand.primary,
      marginBottom: 5,
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
      marginVertical: 40,
      borderRadius: 9,
      marginHorizontal: 10,
    },
    activeDot: {
      backgroundColor: YowPetTheme.brand.primary,
    },
    inactiveDot: {
      backgroundColor: YowPetTheme.brand.accent,
    },
  }),

  // Estilos para la pantalla principal de Onboarding
  onboardingScreen: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: YowPetTheme.background.mainWhite,
    },
  }),
};
