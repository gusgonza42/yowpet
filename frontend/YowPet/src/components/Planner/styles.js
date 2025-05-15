import { Dimensions, Platform, StyleSheet } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

// Obtenemos dimensiones de la pantalla para cálculos relativos
const { width, height } = Dimensions.get('window');
const isSmallDevice = height < 700;
const isIOS = Platform.OS === 'ios';

// Función para obtener estilos dinámicos basados en insets
export const getDynamicMapStyles = (insets = { bottom: 0, top: 0 }) => {
  const bottomPadding = Platform.select({
    ios: 1 + insets.bottom,
    android: 20 + insets.bottom,
    default: 20,
  });

  const topPadding = Platform.select({
    ios: 20 + insets.top,
    android: 25 + insets.top,
    default: 40,
  });

  return {
    // Estilos dinámicos para barra superior
    topBar: {
      position: 'absolute',
      top: topPadding,
      left: 10,
      right: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: YowPetTheme.brand.white,
      borderRadius: 50,
      padding: 5,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 6,
      zIndex: 999,
      marginTop: Platform.OS === 'android' ? -1 : 0, // Ajuste para eliminar la línea blanca

    },

    // Estilos dinámicos para filterBox
    filterBox: {
      position: 'absolute',
      bottom: 90 + bottomPadding,
      left: 10,
      right: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#F5F5F7',
      borderRadius: 50,
      paddingVertical: 3,
      paddingHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 10,
      overflow: 'hidden',
    },

    // Botones flotantes con posición dinámica
    addbutton: {
      position: 'absolute',
      right: 20,
      bottom: 100 + bottomPadding, // Posición dinámica
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: YowPetTheme.brand.orange,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 6,
      zIndex: 12,
    },
  };
};

export const Calender = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: YowPetTheme.brand.secondary,
    paddingVertical: 20,
    padding: 16
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 20,
  },
  reminderContainer: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  reminderCard: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  reminderText: {
    fontSize: 16
  },
});

export const Modalnotifi = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  addButton: {
    backgroundColor: YowPetTheme.brand.primary,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});