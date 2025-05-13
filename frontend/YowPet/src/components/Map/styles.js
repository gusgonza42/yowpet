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
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 999,
    },

    // Estilos dinámicos para filterBox
    filterBox: {
      position: 'absolute',
      bottom: 90 + bottomPadding, // Ajuste dinámico según dispositivo
      left: 10,
      right: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: YowPetTheme.brand.accent,
      borderRadius: 50,
      padding: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 10,
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
    backgroundColor: '#A0B3FF',
    padding: 16,
    paddingBottom: isIOS ? 90 : 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    marginTop: 16,
    borderBottomWidth: 1,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  filterContainer: {
    marginTop: 16,
  },
  filterLabel: {
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  filterOption: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  filterOptionActive: {
    backgroundColor: 'lightblue',
  },
  filterOptionInactive: {
    backgroundColor: 'gray',
  },
  actionButton: {
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectLocationButton: {
    backgroundColor: '#F6BBA9',
  },
  saveButton: {
    backgroundColor: '#FBE186',
  },
  buttonText: {
    fontWeight: 'bold',
    color: YowPetTheme.brand.support,
  },
});

export default { mapStyles, styleMarker, modalStyles };