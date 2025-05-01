import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Modal, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { mapstyles } from '@/components/auth/LoginForm/styles';
import { useLocalSearchParams } from 'expo-router';
import MapMarker from '../Map/MapMarker';

export default function MapScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [location, setLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null); // 🟡 Modal state

  const markerData = [
    {
      id: 1,
      type: 'Veterinarios',
      title: 'Clinica Vet Barcelona',
      latitude: 41.4109,
      longitude: 2.1692,
    },
    {
      id: 2,
      type: 'Tiendas',
      title: 'Pet Shop Central',
      latitude: 41.4115,
      longitude: 2.1688,
    },
    {
      id: 3,
      type: 'Pet-Friendly',
      title: 'Dog Cafe BCN',
      latitude: 41.4103,
      longitude: 2.1697,
    },
    {
      id: 4,
      type: 'Parques',
      title: 'Parque Canino Sur',
      latitude: 41.4121,
      longitude: 2.1701,
    },
    {
      id: 5,
      type: 'Veterinarios',
      title: 'Vet Express',
      latitude: 41.41,
      longitude: 2.168,
    },
    {
      id: 6,
      type: 'Tiendas',
      title: 'Mascotas y Más',
      latitude: 41.4112,
      longitude: 2.1699,
    },
    {
      id: 7,
      type: 'Pet-Friendly',
      title: 'Bark & Brew',
      latitude: 41.4118,
      longitude: 2.1705,
    },
    {
      id: 8,
      type: 'Parques',
      title: 'Jardines Felices',
      latitude: 41.4123,
      longitude: 2.1675,
    },
    {
      id: 9,
      type: 'Veterinarios',
      title: 'Animal Care Center',
      latitude: 41.4108,
      longitude: 2.1702,
    },
    {
      id: 10,
      type: 'Tiendas',
      title: 'Todo para Tu Mascota',
      latitude: 41.4099,
      longitude: 2.1691,
    },
    {
      id: 11,
      type: 'Pet-Friendly',
      title: 'Café Perruno',
      latitude: 41.411,
      longitude: 2.1703,
    },
    {
      id: 12,
      type: 'Parques',
      title: 'Plaza de las Mascotas',
      latitude: 41.4102,
      longitude: 2.1684,
    },
  ];

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

  const filteredMarkers =
    selectedFilter === 'All'
      ? markerData
      : markerData.filter(m => m.type === selectedFilter);

  return (
    <View style={mapstyles.container}>
      {/* Top Bar */}
      <View style={mapstyles.topBar}>
        {selectedFilter !== 'All' ? (
          <>
            <TouchableOpacity
              onPress={() => setSelectedFilter('All')}
              style={mapstyles.iconButton}
            >
              <Text style={mapstyles.iconText}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('Search')}
              style={mapstyles.iconButtonsearch}
            >
              <Text style={mapstyles.iconText}>🔍 Buscar Aqui ...</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => console.log('Search')}
            style={mapstyles.iconButtonsearchfull}
          >
            <Text style={mapstyles.iconText}>🔍 Buscar Aqui ...</Text>
          </TouchableOpacity>
        )}
      </View>

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
        >
          {filteredMarkers.map(marker => {
            let pinColor, icon;
            switch (marker.type) {
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
        </MapView>
      )}

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
      <Modal
        visible={!!selectedMarker}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedMarker(null)}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
          onPress={() => setSelectedMarker(null)}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 16,
              paddingBottom: 32,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: '30%',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {selectedMarker?.title}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 8 }}>
              Dirección genérica o añade info aquí.
            </Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
