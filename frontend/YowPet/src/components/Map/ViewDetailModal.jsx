import React from 'react';
import { Modal, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { modalStyles } from '@/components/Map/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { YowPetTheme } from '@theme/Colors';

const DetailModal = ({ selectedMarker, onClose }) => {
  if (!selectedMarker) return null;

  // Determinar icono y color según el filtro
  let iconName, activeColor;

  switch (selectedMarker.filter) {
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

  return (
    <Modal
      visible={!!selectedMarker}
      transparent
      animationType="slide"
      statusBarTranslucent={Platform.OS === 'ios'}
      onRequestClose={onClose}
    >
      <Pressable style={modalStyles.container} onPress={onClose}>
        <View style={modalStyles.content} onStartShouldSetResponder={() => true}>
          <View style={modalStyles.headerContainer}>
            <MaterialCommunityIcons
              name={iconName}
              size={32}
              color={activeColor}
              style={modalStyles.headerIcon}
            />
            <Text style={modalStyles.title}>{selectedMarker.name}</Text>
          </View>

          <View style={modalStyles.infoContainer}>
            {selectedMarker.address && (
              <View style={modalStyles.infoRow}>
                <MaterialCommunityIcons name="map-marker" size={20} color={activeColor} />
                <Text style={modalStyles.infoText}>{selectedMarker.address}</Text>
              </View>
            )}

            {selectedMarker.addresscode && (
              <View style={modalStyles.infoRow}>
                <MaterialCommunityIcons name="map-marker-radius" size={20} color={activeColor} />
                <Text style={modalStyles.infoText}>CP: {selectedMarker.addresscode}</Text>
              </View>
            )}

            <View style={modalStyles.infoRow}>
              <MaterialCommunityIcons name="tag" size={20} color={activeColor} />
              <Text style={modalStyles.infoText}>{selectedMarker.filter}</Text>
            </View>
          </View>

          <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
            <Text style={modalStyles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default DetailModal;