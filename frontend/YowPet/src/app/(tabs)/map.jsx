import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Modal, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { mapstyles } from '@/components/auth/LoginForm/styles';
import { useLocalSearchParams } from 'expo-router';
import MapMarker from '../Map/MapMarker';
import {  useAxiosFetch } from '@/services/api/getfetch';

export default function MapScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [location, setLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null); 
  const[refreshKey, setRefreshKey] = useState(0);
  const { datos, loading, error } = useAxiosFetch('place/all', refreshKey);
  


  // if (loading) {
  //   return <Text>Cargando...</Text>;
  // }
  // if (error) {
  //   return <Text>Error: {error.message}</Text>;
  // }

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
      ? datos
      : datos.filter(m => m.filter === selectedFilter);

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
        animationfilter="slide"
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
              {selectedMarker?.name}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 8 }}>
              {selectedMarker?.address}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 8 }}>
              {selectedMarker?.addresscode}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 8 }}>
              {selectedMarker?.filter}
            </Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
