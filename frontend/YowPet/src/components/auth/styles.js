import { StyleSheet } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

export const styles = {
  CustomHeader: StyleSheet.create({
    headerContainer: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: 20,
    },
    headerTitle: {
      fontSize: 32,
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
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    tab: {
      padding: 10,
      borderRadius: 20,
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 5,
      justifyContent: 'center',
    },
    activeTab: {
      backgroundColor: YowPetTheme.brand.primary,
    },
    tabText: {
      fontWeight: '600',
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
    },
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
    authContainer: {
      width: '90%',
      backgroundColor: YowPetTheme.surface.medium,
      borderRadius: 25,
      padding: 16,
      shadowColor: YowPetTheme.shadow.mediumShadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
    },
  }),

  form: StyleSheet.create({
    formContainer: {
      width: '100%',
      alignItems: 'center',
    },
    input: {
      width: '100%',
      marginVertical: 6,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      height: 55,
    },
    submitButton: {
      width: '100%',
      marginTop: 15,
      borderRadius: 25,
      height: 50,
      backgroundColor: YowPetTheme.brand.primary,
    },
    submitButtonContent: {
      height: 50,
    },
    submitButtonLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 1,
      color: YowPetTheme.brand.white,
    },
  }),

  footer: StyleSheet.create({
    forgotPasswordText: {
      marginTop: 15,
      fontSize: 12,
      color: '#657786',
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    termsText: {
      marginTop: 15,
      fontSize: 12,
      color: '#657786',
      textAlign: 'center',
    },
    linkText: {
      color: '#1E3A4C',
      fontWeight: 'bold',
    },
  }),

  password: StyleSheet.create({
    input: {
      width: '100%',
      marginVertical: 6,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      height: 55,
    },
  }),

  SocialButtons: StyleSheet.create({
    separator: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginVertical: 25,
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
    },
    socialButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: YowPetTheme.surface.light,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      shadowColor: YowPetTheme.shadow.softShadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      elevation: 2,
      borderWidth: 1,
      borderColor: YowPetTheme.border.softBorder,
    },
    socialButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: YowPetTheme.brand.primary,
    },
    errorText: {
      color: YowPetTheme.status.errorState,
      fontSize: 12,
      alignSelf: 'flex-start',
      marginTop: 2,
      marginBottom: 6,
      marginLeft: 8,
    },
  }),
};
