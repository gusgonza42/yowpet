import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { mapstyles } from '@/components/auth/LoginForm/styles';
import AntDesign from '@expo/vector-icons/AntDesign'; // Assuming you have your request hook
import { useRequest } from '@/services/api/fetchingdata';
import { useAxiosFetch } from '@/services/api/getfetch';
import MapMarker from '../Map/MapMarker';
import DetailModal from '../Map/ViewDetailModal';

export default function MapScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [location, setLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const { datos, loading, error } = useAxiosFetch('place/all', refreshKey);
  const { requestData, loading: saving } = useRequest();
  const [locationAddress, setLocationAddress] = useState('');
  const [locationPostalCode, setLocationPostalCode] = useState('');

  // States for modal and location input
  const [isModalVisible, setModalVisible] = useState(false);
  const [newLocation, setNewLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [locationName, setLocationName] = useState('');
  const [locationFilter, setLocationFilter] = useState('Veterinarios');
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const filters = ['Veterinarios', 'Tiendas', 'Pet-Friendly', 'Parques'];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const handleAddLocation = async () => {
    if (!newLocation.latitude || !newLocation.longitude || !locationName) {
      Alert.alert('Error', 'Please enter all the required information.');
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
    setRefreshKey(prevKey => prevKey + 1); // Refresh markers
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

  return (
    <View style={mapstyles.container}>
      {/* Top Bar */}
      <View style={mapstyles.topBar}>{/* Add your top bar UI here */}</View>

      {isSelectingLocation && (
        <Text
          style={{ textAlign: 'center', backgroundColor: 'white', padding: 8 }}
        >
          Tap on the map to choose location
        </Text>
      )}

      {/* Map */}
      {location && (
        <MapView
          style={{ flex: 1 }}
          showsUserLocation
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={isSelectingLocation ? handleSelectLocation : null} // Enable location selection if button is pressed
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
          {/* Show the new location pin */}
          {newLocation.latitude && newLocation.longitude && (
            <Marker coordinate={newLocation} pinColor="purple" />
          )}
        </MapView>
      )}

      {/* Add location Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)} // Show the modal
        style={mapstyles.addbutton}
      >
        <Text style={mapstyles.addbuttontext}>
          <AntDesign name="plus" size={24} color="white" />
        </Text>
      </TouchableOpacity>

      {/* Filter Buttons */}
      <View style={mapstyles.filterBox}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[
              mapstyles.filterButton,
              selectedFilter === filter && mapstyles.selectedButton,
            ]}
          >
            <Text
              style={[
                mapstyles.filterText,
                selectedFilter === filter && mapstyles.selectedText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Popup Modal */}
      <DetailModal
        selectedMarker={selectedMarker}
        onClose={() => setSelectedMarker(null)}
      />

      {/* Bottom Popup Modal for Add Location */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        {saving ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 18 }}>Saving...</Text>
          </View>
        ) : (
          <Pressable
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
            onPress={() => {
              setModalVisible(false);
              setNewLocation({ latitude: null, longitude: null });
            }}
          >
            <View
              style={{
                backgroundColor: '#fff',
                padding: 16,
                paddingBottom: 32,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                maxHeight: '50%',
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Add New Location
              </Text>

              {/* Location Name Input */}
              <TextInput
                placeholder="Location Name"
                style={{ marginTop: 16, borderBottomWidth: 1, padding: 8 }}
                value={locationName}
                onChangeText={setLocationName}
              />

              {/* Location Filter Selection */}
              <View style={{ marginTop: 16 }}>
                <Text>Select Filter:</Text>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  {['Veterinarios', 'Tiendas', 'Pet-Friendly', 'Parques'].map(
                    filter => (
                      <TouchableOpacity
                        key={filter}
                        onPress={() => setLocationFilter(filter)}
                        style={{
                          backgroundColor:
                            locationFilter === filter ? 'lightblue' : 'gray',
                          paddingVertical: 6,
                          paddingHorizontal: 10,
                          marginRight: 10,
                          borderRadius: 8,
                        }}
                      >
                        <Text>{filter}</Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </View>

              {/* Select Location Button */}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false); // Close the modal
                  setIsSelectingLocation(true); // Enable selecting on map
                }}
                style={{
                  backgroundColor: 'orange',
                  paddingVertical: 12,
                  marginTop: 20,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  Select Location on Map
                </Text>
              </TouchableOpacity>

              {/* Confirm Button */}
              <TouchableOpacity
                onPress={handleAddLocation}
                style={{
                  backgroundColor: 'green',
                  paddingVertical: 12,
                  marginTop: 20,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  Save Location
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        )}
      </Modal>
    </View>
  );
}
