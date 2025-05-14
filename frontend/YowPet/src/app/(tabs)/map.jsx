import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAxiosFetch } from '@/services/api/getfetch';
import MapMarker from '@components/Map/MapMarker';
import DetailModal from '@components/Map/ViewDetailModal';
import { useRequest } from '@/services/api/fetchingdata';
import { mapStyles, modalStyles, getDynamicMapStyles } from '@/components/Map/styles';
import { YowPetTheme } from '@theme/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

export default function MapScreen() {
  const mapRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [location, setLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const { datos, loading, error, refetch } = useAxiosFetch(
    'place/all',
    refreshKey,
    false,
  );
  const { requestData, loading: saving } = useRequest();
  const [locationAddress, setLocationAddress] = useState('');
  const [locationPostalCode, setLocationPostalCode] = useState('');

  // Estados para modal y selección de ubicación
  const [isModalVisible, setModalVisible] = useState(false);
  const [newLocation, setNewLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [locationName, setLocationName] = useState('');
  const [locationFilter, setLocationFilter] = useState('Veterinarios');
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const filters = ['Veterinarios', 'Tiendas', 'Pet-Friendly', 'Parques'];
  const [searchQuery, setSearchQuery] = useState('');
  // Estado para controlar si seguir la ubicación del usuario
  const [followUserLocation, setFollowUserLocation] = useState(true);

  const [isLoading, setIsLoading] = useState(true); // Estado para el loader
  const [mapType, setMapType] = useState('standard');
  const insets = useSafeAreaInsets();
  const dynamicStyles = getDynamicMapStyles(insets);

  useEffect(() => {
    (async () => {
      setIsLoading(true); // Iniciar carga
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission denied');
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      } catch (error) {
        console.error('Error getting location:', error);
      } finally {
        setIsLoading(false); // Finalizar carga siempre, incluso si hay error
      }
    })();
  }, []);

  // Función para ajustar el mapa a los marcadores filtrados
  const fitMapToFilteredMarkers = useCallback((markers) => {
    if (!markers || markers.length === 0 || !location) return;

    // Encontramos los marcadores cercanos a la ubicación actual
    // (establezco un radio máximo de 50km para considerarlos "cercanos")
    const nearbyMarkers = markers.filter(marker => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        marker.latitude,
        marker.longitude,
      );
      return distance <= 50; // 50km como radio máximo
    });

    // Si no hay marcadores cercanos, usamos todos
    const markersToShow = nearbyMarkers.length > 0 ? nearbyMarkers : markers;

    // Si solo hay un marcador, centramos en él con zoom cercano
    if (markersToShow.length === 1) {
      mapRef.current?.animateToRegion({
        latitude: markersToShow[0].latitude,
        longitude: markersToShow[0].longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      return;
    }

    // Aseguramos de incluir la ubicación del usuario en los límites
    const latitudes = [...markersToShow.map(m => m.latitude), location.latitude];
    const longitudes = [...markersToShow.map(m => m.longitude), location.longitude];

    // Calculamos los límites para incluir todos los marcadores y la ubicación del usuario
    let minLat = Math.min(...latitudes);
    let maxLat = Math.max(...latitudes);
    let minLng = Math.min(...longitudes);
    let maxLng = Math.max(...longitudes);

    // Añadimos un margen
    const latPadding = (maxLat - minLat) * 0.3;
    const lngPadding = (maxLng - minLng) * 0.3;

    // Aseguramos que al menos haya un mínimo de delta para el zoom
    const latDelta = Math.max(maxLat - minLat + latPadding * 2, 0.05);
    const lngDelta = Math.max(maxLng - minLng + lngPadding * 2, 0.05);

    mapRef.current?.animateToRegion({
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    });
  }, [location]);

// Función auxiliar para calcular distancias entre coordenadas (en km)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useFocusEffect(
    useCallback(() => {
      console.log('Pantalla de mapa enfocada - actualizando datos');
      refetch();
      return () => {
      };
    }, []),
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent', true); // El segundo parámetro indica que sea completamente transparente
    } else if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('dark-content');
    }

    return () => {
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(false);
        StatusBar.setBackgroundColor('#000000');
      }
    };
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const foundMarker = datos.find(marker =>
      marker.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (foundMarker && mapRef.current) {
      // Desactivar seguimiento cuando se busca una ubicación
      setFollowUserLocation(false);

      mapRef.current.animateToRegion({
        latitude: foundMarker.latitude,
        longitude: foundMarker.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      setSelectedMarker(foundMarker);
    } else {
      Alert.alert(
        'No encontrado',
        'No se encontró ningún marcador con ese nombre.',
      );
    }
  };

  const handleAddLocation = async () => {
    if (!newLocation.latitude || !newLocation.longitude || !locationName) {
      Alert.alert('Error', 'Por favor ingresa toda la información requerida.');
      return;
    }

    const body = {
      name: locationName,
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
      filter: locationFilter,
      address: locationAddress,
      addresscode: locationPostalCode,
    };

    await requestData('POST', 'place/create', body);
    setRefreshKey(prevKey => prevKey + 1);
    setModalVisible(false);
    setNewLocation({ latitude: null, longitude: null });
    setLocationName('');
    setLocationAddress('');
    setLocationPostalCode('');
  };

  const filteredMarkers =
    selectedFilter === 'All'
      ? datos
      : datos.filter(m => m.filter === selectedFilter);

  const handleSelectLocation = async e => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const coords = { latitude, longitude };

    // Desactivar seguimiento cuando se selecciona manualmente una ubicación
    setFollowUserLocation(false);

    setNewLocation(coords);
    setIsSelectingLocation(false);
    setModalVisible(true);

    const { address, addressCode } = await getAddressFromCoords(coords);
    setLocationAddress(address);
    setLocationPostalCode(addressCode);
  };

  const getAddressFromCoords = async ({ latitude, longitude }) => {
    try {
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (geocode.length > 0) {
        const { street, city, postalCode, region, name } = geocode[0];
        return {
          address: `${name || street}, ${city}, ${region}`,
          addressCode: postalCode || '',
        };
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
    return { address: '', addressCode: '' };
  };

  // Función para manejar el arrastre del mapa
  const handleMapDrag = () => {
    // Desactivar el seguimiento de la ubicación del usuario cuando el usuario mueve el mapa
    setFollowUserLocation(false);
  };

  return (
    <View style={mapStyles.container}>
      {isLoading ? (
        <View style={mapStyles.loaderContainer}>
          <ActivityIndicator size="large" color={YowPetTheme.brand.accent} />
          <Text style={mapStyles.loaderText}>Cargando mapa...</Text>
        </View>
      ) : (
        <>
          <View
            style={[dynamicStyles.topBar, Platform.OS === 'ios' && { zIndex: 10 }]}
          >
            {selectedFilter !== 'All' ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedFilter('All');
                    setSearchQuery('');
                  }}
                  style={mapStyles.iconButton}
                >
                  <Text style={mapStyles.iconText}>
                    <AntDesign name="arrowleft" size={20} color="black" />
                  </Text>
                </TouchableOpacity>
                <View style={mapStyles.searchContainershortened}>
                  <TextInput
                    placeholder="🔍 Buscar aquí..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={() => handleSearch()}
                    style={mapStyles.searchInput}
                    returnKeyType="search"
                  />
                </View>
              </>
            ) : (
              <View style={mapStyles.searchContainer}>
                <TextInput
                  placeholder="🔍 Buscar aquí..."
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitEditing={() => handleSearch()}
                  style={mapStyles.searchInput}
                  returnKeyType="search"
                />
              </View>
            )}
          </View>

          {isSelectingLocation && (
            <View style={{
              position: 'absolute',
              top: '15%', // Posicionado más arriba (antes era 50%)
              left: '5%',
              right: '5%',
              width: '90%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              paddingVertical: 12,
              paddingHorizontal: 15,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
              flexDirection: 'row',
              marginHorizontal: 'auto',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 8,
            }}>
              <MaterialCommunityIcons
                name="map-marker-plus"
                size={24}
                color="white"
                style={{ marginRight: 10 }}
              />
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                flexShrink: 1,
              }}>
                Toca en el mapa para elegir ubicación
              </Text>
            </View>
          )}

          {/* Mapa */}
          {location && (
            <MapView
              ref={mapRef}
              style={{ flex: 1 }}
              showsUserLocation
              zoomEnabled={true}
              showsMyLocationButton={false}
              mapType={mapType}
              followsUserLocation={followUserLocation}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              onPress={isSelectingLocation ? handleSelectLocation : null}
              onPanDrag={handleMapDrag}
              onRegionChangeComplete={handleMapDrag}
            >
              {filteredMarkers.map(marker => {
                let pinColor, icon;
                switch (marker.filter) {
                  case 'Veterinarios':
                    pinColor = '#E53935';
                    icon = 'hospital-building';
                    break;
                  case 'Tiendas':
                    pinColor = '#1E88E5';
                    icon = 'store';
                    break;
                  case 'Pet-Friendly':
                    pinColor = '#FF9800';
                    icon = 'dog';
                    break;
                  case 'Parques':
                    pinColor = '#43A047';
                    icon = 'tree';
                    break;
                  default:
                    pinColor = 'gray';
                    icon = 'map-marker';
                }

                return (
                  <MapMarker
                    key={marker.id}
                    marker={marker}
                    pinColor={pinColor}
                    icon={icon}
                    onPress={() => setSelectedMarker(marker)}
                  />
                );
              })}
              {newLocation.latitude && newLocation.longitude && (
                <Marker coordinate={newLocation} pinColor="purple" />
              )}
            </MapView>
          )}

          {/* Botón para añadir ubicación */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[
              dynamicStyles.addbutton,
              Platform.OS === 'ios' && { zIndex: 8 },
            ]}
          >
            <Text style={mapStyles.addbuttontext}>
              <AntDesign name="plus" size={24} color="white" />
            </Text>
          </TouchableOpacity>

          {/* Botón para volver a la ubicación del usuario */}
          <TouchableOpacity
            onPress={() => {
              setFollowUserLocation(true);
              if (location && mapRef.current) {
                mapRef.current.animateToRegion({
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                });
              }
            }}
            style={[
              dynamicStyles.addbutton,
              dynamicStyles.userLocationButton,
              Platform.OS === 'ios' && { zIndex: 8 },
            ]}
          >
            <Text style={mapStyles.addbuttontext}>
              <AntDesign name="enviromento" size={24} color="white" />
            </Text>
          </TouchableOpacity>

          {/* Botón para cambiar el tipo de mapa */}
          <TouchableOpacity
            onPress={() => {
              // Cambia cíclicamente entre los diferentes tipos de mapa
              setMapType(prevType => {
                switch (prevType) {
                  case 'standard':
                    return 'satellite';
                  case 'satellite':
                    return 'hybrid';
                  case 'hybrid':
                    return 'terrain';
                  case 'terrain':
                    return 'standard';
                  default:
                    return 'standard';
                }
              });
            }}
            style={[
              dynamicStyles.addbutton,
              dynamicStyles.mapTypeButton,
              Platform.OS === 'ios' && { zIndex: 8 },
            ]}
          >
            <Text style={mapStyles.addbuttontext}>
              <AntDesign name="eye" size={24} color="white" />
            </Text>
          </TouchableOpacity>

          {/* Botones de filtro */}
          <View
            style={[
              dynamicStyles.filterBox,
              Platform.OS === 'ios' && { zIndex: 7 },
            ]}
          >
            {filters.map(filter => {
              // Determinar qué icono usar según el filtro
              let iconName;
              let englishLabel;
              let activeColor;

              switch (filter) {
                case 'Veterinarios':
                  iconName = 'hospital-building';
                  englishLabel = 'Veterinarios';
                  activeColor = '#E53935';
                  break;
                case 'Tiendas':
                  iconName = 'store';
                  englishLabel = 'Tiendas';
                  activeColor = '#1E88E5';
                  break;
                case 'Pet-Friendly':
                  iconName = 'paw';
                  englishLabel = 'PetFriendly';
                  activeColor = '#FF9800';
                  break;
                case 'Parques':
                  iconName = 'tree';
                  englishLabel = 'Parques';
                  activeColor = '#43A047';
                  break;
                default:
                  iconName = 'map-marker';
                  englishLabel = filter;
                  activeColor = YowPetTheme.brand.accent;
              }
              const isSelected = selectedFilter === filter;

              return (
                <TouchableOpacity
                  key={filter}
                  onPress={() => {
                    // Si ya está seleccionado, lo deseleccionamos
                    if (selectedFilter === filter) {
                      setSelectedFilter('All');
                      setSearchQuery('');
                    } else {
                      setSelectedFilter(filter);
                      // Filtramos los marcadores por el filtro seleccionado
                      const markersOfThisFilter = datos.filter(m => m.filter === filter);

                      // Ajustamos el mapa para mostrar estos marcadores alrededor de tu ubicación
                      if (markersOfThisFilter.length > 0) {
                        fitMapToFilteredMarkers(markersOfThisFilter);
                      }
                    }
                  }}
                  style={[
                    mapStyles.filterButton,
                    {
                      borderTopLeftRadius: filter === filters[0] ? 45 : 15,
                      borderBottomLeftRadius: filter === filters[0] ? 45 : 15,
                      borderTopRightRadius: filter === filters[filters.length - 1] ? 45 : 15,
                      borderBottomRightRadius: filter === filters[filters.length - 1] ? 45 : 15,
                    },
                    isSelected && {
                      backgroundColor: `${activeColor}30`,  // Opacidad al 30%
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={iconName}
                    size={22}
                    color={isSelected ? activeColor : YowPetTheme.brand.support}
                  />
                  <Text
                    style={[
                      mapStyles.filterText,
                      {
                        fontSize: 13,
                        fontWeight: '600',
                        letterSpacing: -0.5, // Reduce el espacio entre letras
                        color: isSelected ? activeColor : YowPetTheme.brand.support,
                      },
                      isSelected && {
                        fontWeight: 'bold',
                      },
                    ]}
                    numberOfLines={1}
                    adjustsFontSizeToFit // Se ajustará automáticamente
                    minimumFontScale={0.7} // No reducirá más allá del 70%
                  >
                    {englishLabel}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Modal de detalles */}
          <DetailModal
            selectedMarker={selectedMarker}
            onClose={() => setSelectedMarker(null)}
          />

          {/* Modal para añadir ubicación */}
          <Modal
            visible={isModalVisible}
            transparent
            animationType="slide"
            statusBarTranslucent={Platform.OS === 'ios'}
            onRequestClose={() => setModalVisible(false)}
          >
            {saving ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                }}
              >
                <ActivityIndicator size="large" color={YowPetTheme.brand.accent} />
                <Text style={{ fontSize: 18, marginTop: 15, color: YowPetTheme.brand.support }}>Guardando
                  ubicación...</Text>
              </View>
            ) : (
              <Pressable
                style={modalStyles.container}
                onPress={() => {
                  setModalVisible(false);
                  setNewLocation({ latitude: null, longitude: null });
                }}
              >
                <View style={modalStyles.content} onStartShouldSetResponder={() => true}>
                  <View style={modalStyles.modalHeader}>
                    <Text style={modalStyles.title}>Nueva Ubicación</Text>
                    <TouchableOpacity
                      style={modalStyles.closeModalButton}
                      onPress={() => {
                        setModalVisible(false);
                        setNewLocation({ latitude: null, longitude: null });
                      }}
                    >
                      <AntDesign name="closecircle" size={24} color={YowPetTheme.brand.support} />
                    </TouchableOpacity>
                  </View>

                  {/* Información sobre ubicación seleccionada */}
                  {newLocation.latitude && newLocation.longitude && (
                    <View style={modalStyles.locationInfoContainer}>
                      <Text style={modalStyles.locationInfoText}>
                        <AntDesign name="enviromento" size={14}
                                   color="#4A6585" /> {locationAddress || 'Ubicación seleccionada'}
                      </Text>
                      {locationPostalCode ? (
                        <Text style={[modalStyles.locationInfoText, { marginTop: 5 }]}>
                          <AntDesign name="creditcard" size={14} color="#4A6585" /> Código postal: {locationPostalCode}
                        </Text>
                      ) : null}
                    </View>
                  )}

                  {/* Nombre de la ubicación */}
                  <TextInput
                    placeholder="Nombre del lugar"
                    placeholderTextColor="#999"
                    style={modalStyles.input}
                    value={locationName}
                    onChangeText={setLocationName}
                  />

                  {/* Selección de filtro */}
                  <View style={modalStyles.filterContainer}>
                    <Text style={modalStyles.filterLabel}>Categoría:</Text>
                    <View style={[modalStyles.filterOptions, { overflow: 'scroll' }]}>
                      {filters.map(filter => {
                        // Determinar qué icono usar según el filtro
                        let iconName, activeColor;

                        switch (filter) {
                          case 'Veterinarios':
                            iconName = 'hospital-building';
                            activeColor = '#E53935';
                            break;
                          case 'Tiendas':
                            iconName = 'store';
                            activeColor = '#1E88E5';
                            break;
                          case 'Pet-Friendly':
                            iconName = 'paw';
                            activeColor = '#FF9800';
                            break;
                          case 'Parques':
                            iconName = 'tree';
                            activeColor = '#43A047';
                            break;
                          default:
                            iconName = 'map-marker';
                            activeColor = YowPetTheme.brand.accent;
                        }

                        const isSelected = locationFilter === filter;

                        return (
                          <TouchableOpacity
                            key={filter}
                            onPress={() => setLocationFilter(filter)}
                            style={[
                              modalStyles.filterOption,
                              isSelected ?
                                { backgroundColor: `${activeColor}15`, borderColor: activeColor } :
                                modalStyles.filterOptionInactive,
                            ]}
                          >
                            <MaterialCommunityIcons
                              name={iconName}
                              size={20}
                              color={isSelected ? activeColor : YowPetTheme.brand.support}
                              style={{ marginBottom: 3 }}
                            />
                            <Text
                              style={[
                                modalStyles.filterText,
                                {
                                  fontSize: 13,
                                  fontWeight: '600',
                                  letterSpacing: -0.5, // Reduce el espacio entre letras
                                  color: isSelected ? activeColor : YowPetTheme.brand.support,
                                },
                                isSelected && { fontWeight: 'bold' },
                              ]}
                              numberOfLines={1}
                              adjustsFontSizeToFit // Se ajustará automáticamente
                              minimumFontScale={0.7} // No reducirá más allá del 70%
                            >
                              {filter}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {/* Botón para seleccionar ubicación en el mapa */}
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setIsSelectingLocation(true);
                    }}
                    style={[
                      modalStyles.actionButton,
                      modalStyles.selectLocationButton,
                    ]}
                  >
                    <AntDesign name="enviromento" size={20} color="#4A89F3" style={modalStyles.buttonIcon} />
                    <Text style={[modalStyles.buttonText, modalStyles.selectLocationText]}>
                      Seleccionar en el mapa
                    </Text>
                  </TouchableOpacity>

                  {/* Botón para guardar */}
                  <TouchableOpacity
                    onPress={handleAddLocation}
                    style={[modalStyles.actionButton, modalStyles.saveButton]}
                    disabled={!newLocation.latitude || !newLocation.longitude || !locationName}
                  >
                    <AntDesign name="save" size={20} color="white" style={modalStyles.buttonIcon} />
                    <Text style={[modalStyles.buttonText, modalStyles.saveButtonText]}>
                      Guardar ubicación
                    </Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            )}
          </Modal>
        </>
      )}
    </View>
  );
}