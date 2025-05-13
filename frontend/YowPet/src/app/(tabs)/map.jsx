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
import { mapStyles, modalStyles } from '@/components/Map/styles';
import { YowPetTheme } from '@theme/Colors';

export default function MapScreen() {
  const mapRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [location, setLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const { datos, loading, error, refetch } = useAxiosFetch(
    'place/all',
    refreshKey,
    false
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

  useEffect(() => {
    console.log('Filtro cambiado a:', selectedFilter);
    refetch();
  }, [selectedFilter]);

  useFocusEffect(
    useCallback(() => {
      console.log('Pantalla de mapa enfocada - actualizando datos');
      refetch();
      return () => {};
    }, [])
  );

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const foundMarker = datos.find(marker =>
      marker.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        'No se encontró ningún marcador con ese nombre.'
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
            style={[mapStyles.topBar, Platform.OS === 'ios' && { zIndex: 10 }]}
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
            <Text
              style={{
                textAlign: 'center',
                backgroundColor: 'white',
                padding: 8,
                zIndex: Platform.OS === 'ios' ? 5 : 1,
              }}
            >
              Toca en el mapa para elegir ubicación
            </Text>
          )}

          {/* Mapa */}
          {location && (
            <MapView
              ref={mapRef}
              style={{ flex: 1 }}
              showsUserLocation
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
                    pinColor = 'red';
                    icon = 'hospital-building';
                    break;
                  case 'Tiendas':
                    pinColor = 'blue';
                    icon = 'store';
                    break;
                  case 'Pet-Friendly':
                    pinColor = 'green';
                    icon = 'dog';
                    break;
                  case 'Parques':
                    pinColor = 'cyan';
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
              mapStyles.addbutton,
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
              mapStyles.addbutton,
              { bottom: 250, backgroundColor: '#3498db' },
              Platform.OS === 'ios' && { zIndex: 8 },
            ]}
          >
            <Text style={mapStyles.addbuttontext}>
              <AntDesign name="enviromento" size={24} color="white" />
            </Text>
          </TouchableOpacity>

          {/* Botones de filtro */}
          <View
            style={[
              mapStyles.filterBox,
              Platform.OS === 'ios' && { zIndex: 7 },
            ]}
          >
            {filters.map(filter => (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                style={[
                  mapStyles.filterButton,
                  selectedFilter === filter && mapStyles.selectedButton,
                ]}
              >
                <Text
                  style={[
                    mapStyles.filterText,
                    selectedFilter === filter && mapStyles.selectedText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
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
                }}
              >
                <Text style={{ fontSize: 18 }}>Guardando...</Text>
              </View>
            ) : (
              <Pressable
                style={modalStyles.container}
                onPress={() => {
                  setModalVisible(false);
                  setNewLocation({ latitude: null, longitude: null });
                }}
              >
                <View style={modalStyles.content}>
                  <Text style={modalStyles.title}>Añadir nueva ubicación</Text>

                  {/* Nombre de la ubicación */}
                  <TextInput
                    placeholder="Nombre de la ubicación"
                    style={modalStyles.input}
                    value={locationName}
                    onChangeText={setLocationName}
                  />

                  {/* Selección de filtro */}
                  <View style={modalStyles.filterContainer}>
                    <Text style={modalStyles.filterLabel}>
                      Seleccionar filtro:
                    </Text>
                    <View style={modalStyles.filterOptions}>
                      {filters.map(filter => (
                        <TouchableOpacity
                          key={filter}
                          onPress={() => setLocationFilter(filter)}
                          style={[
                            modalStyles.filterOption,
                            locationFilter === filter
                              ? modalStyles.filterOptionActive
                              : modalStyles.filterOptionInactive,
                          ]}
                        >
                          <Text>{filter}</Text>
                        </TouchableOpacity>
                      ))}
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
                    <Text style={modalStyles.buttonText}>
                      Seleccionar ubicación en el mapa
                    </Text>
                  </TouchableOpacity>

                  {/* Botón para guardar */}
                  <TouchableOpacity
                    onPress={handleAddLocation}
                    style={[modalStyles.actionButton, modalStyles.saveButton]}
                  >
                    <Text style={modalStyles.buttonText}>
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
