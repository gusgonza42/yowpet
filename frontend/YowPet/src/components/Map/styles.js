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
      bottom: 180 + bottomPadding, // Posición dinámica
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

    // Estilos dinámicos para botón de ubicación
    userLocationButton: {
      bottom: 250 + bottomPadding,
      backgroundColor: '#3498db',
    },

    // Estilos dinámicos para botón de tipo de mapa
    mapTypeButton: {
      bottom: 320 + bottomPadding,
      backgroundColor: '#27ae60',
    },
  };
};

// Estilos fijos (que no necesitan adaptarse dinámicamente)
export const mapStyles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: YowPetTheme.brand.white,
  },

  // Contenedor de búsqueda
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: YowPetTheme.brand.white,
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    marginHorizontal: 5,
  },

  // Versión reducida del contenedor de búsqueda
  searchContainershortened: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: YowPetTheme.brand.white,
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    marginHorizontal: 5,
  },

  // Input de búsqueda
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: YowPetTheme.brand.orange,
    height: 40,
    paddingVertical: isIOS ? 10 : 0,
  },

  // Botón de filtro individual
  filterButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginHorizontal: 2,
    flexDirection: 'column',
    height: 60,
  },

  // Texto de filtro
  filterText: {
    fontSize: isSmallDevice ? 12 : 14,
    fontWeight: '500',
    color: YowPetTheme.brand.support,
    marginTop: 5,
  },

  // Botón seleccionado
  selectedButton: {
    backgroundColor: YowPetTheme.brand.accent,
  },

  // Texto de botón seleccionado
  selectedText: {
    color: YowPetTheme.brand.white,
    fontWeight: 'bold',
  },

  // Texto del botón de añadir
  addbuttontext: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },

  // Botón de ícono
  iconButton: {
    padding: 5,
    borderRadius: 20,
    justifyContent: 'center',
  },

  // Texto de ícono
  iconText: {
    fontSize: 20,
  },

  // Contenedor para el loader
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: YowPetTheme.brand.white,
  },

  // Texto del loader
  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: YowPetTheme.brand.support,
    fontWeight: '500',
  },
});

// Mantenemos los otros estilos sin cambios
export const styleMarker = StyleSheet.create({
  customMarkerContainer: {
    alignItems: 'center',
  },
  markerCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerTail: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 0,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -5,
  },
});

// Estilos para los modales
export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    backgroundColor: YowPetTheme.brand.white,
    padding: 24,
    paddingBottom: isIOS ? 50 : 32,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '80%', // Limita la altura máxima
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: YowPetTheme.brand.support,
    textAlign: 'center',
  },
  input: {
    marginVertical: 12,
    borderWidth: 1,
    padding: 14,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    borderColor: '#E0E0E0',
    fontSize: 16,
  },
  filterContainer: {
    marginTop: 20,
  },
  filterLabel: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '600',
    color: YowPetTheme.brand.support,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  filterOption: {
    paddingVertical: 8,
    paddingHorizontal: 6, // Reducido
    marginRight: 4, // Reducido
    marginBottom: 10,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  filterOptionActive: {
    backgroundColor: `${YowPetTheme.brand.accent}30`, // Color con opacidad
    borderWidth: 2,
    borderColor: YowPetTheme.brand.accent,
  },
  filterOptionInactive: {
    backgroundColor: '#F0F0F0',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterText: {
    color: YowPetTheme.brand.support,
    fontWeight: '500',
    fontSize: 11, // Reducido
    textAlign: 'center',
  },
  filterTextActive: {
    color: YowPetTheme.brand.accent,
    fontWeight: 'bold',
  },
  actionButton: {
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectLocationButton: {
    backgroundColor: '#EAF2FF',
    borderWidth: 1,
    borderColor: '#C1D9FE',
  },
  saveButton: {
    backgroundColor: YowPetTheme.brand.accent,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  saveButtonText: {
    color: 'white',
  },
  buttonIcon: {
    marginRight: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  closeModalButton: {
    padding: 5,
  },
  locationInfoContainer: {
    backgroundColor: '#F8F8FF',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#4A89F3',
  },
  locationInfoText: {
    color: '#4A6585',
    fontSize: 14,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerIcon: {
    marginRight: 12,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    marginLeft: 10,
    color: YowPetTheme.brand.support,
    flex: 1,
  },
  closeButton: {
    backgroundColor: YowPetTheme.brand.accent,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

});

export default { mapStyles, styleMarker, modalStyles };