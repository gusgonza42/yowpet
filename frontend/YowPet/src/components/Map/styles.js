import { Dimensions, Platform, StyleSheet } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

// Obtenemos dimensiones de la pantalla para cálculos relativos
const { width, height } = Dimensions.get('window');
const isSmallDevice = height < 700;
const isIOS = Platform.OS === 'ios';

export const mapStyles = StyleSheet.create({
  // Estilos para el contenedor principal del mapa
  container: {
    flex: 1,
    backgroundColor: YowPetTheme.brand.orange,
  },

  // Estilos para la barra superior flotante - estilo similar al filterBox
  topBar: {
    position: 'absolute',
    top: isIOS ? 50 : 40, // Ajustado para notch en iOS
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
    zIndex: 999, // Mayor z-index para flotar sobre todo
  },

  // Contenedor de búsqueda - estilo similar al filtro
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

  // Versión reducida del contenedor de búsqueda (cuando hay filtro activo)
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
    paddingVertical: isIOS ? 10 : 0, // Ajuste específico para iOS
  },

  // Icono de búsqueda
  searchIcon: {
    marginRight: 8,
  },

  // Estilos para botones de filtro
  filterBox: {
    position: 'absolute',
    bottom: 90,
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
    zIndex: 10, // Actualizado para mantener jerarquía correcta
    marginBottom: isIOS ? 20 : 0, // Más espacio en la parte inferior para iOS
  },

  // Botón individual de filtro
  filterButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 2,
  },

  // Estilo de texto para filtros
  filterText: {
    fontSize: isSmallDevice ? 12 : 14,
    fontWeight: '500',
    color: YowPetTheme.brand.support,
  },

  // Estilo para botón seleccionado el mismo color que el fondo por ahora
  selectedButton: {
    backgroundColor: YowPetTheme.brand.accent,
  },

  // Estilo para texto de botón seleccionado
  selectedText: {
    color: YowPetTheme.brand.white,
    fontWeight: 'bold',
  },

  // Botón para añadir ubicación - posición más alta
  addbutton: {
    position: 'absolute',
    right: 20,
    bottom: 180, // Movido más arriba desde 80 a 180
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
    zIndex: 12, // Ajustado para mantener jerarquía correcta
  },

  // Texto del botón de añadir
  addbuttontext: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },

  // Estilo para el botón de icono (back button)
  iconButton: {
    padding: 5,
    borderRadius: 20,
    justifyContent: 'center',
  },

  // Texto de icono
  iconText: {
    fontSize: 20,
  },

  // Agregamos un padding en el contenido principal para compensar el topBar flotante
  mapContentContainer: {
    flex: 1,
    paddingTop: isIOS ? 90 : 80, // Ajustado según la altura del topBar
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: YowPetTheme.brand.white, // Fondo blanco o el que prefieras
  },
  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: YowPetTheme.brand.support,
    fontWeight: '500',
  },
});

// Estilos específicos para los marcadores del mapa
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
    paddingBottom: isIOS ? 90 : 32, // Más padding en iOS para evitar conflicto con el indicador home
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
