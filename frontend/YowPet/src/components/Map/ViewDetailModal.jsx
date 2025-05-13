import React from 'react';
import { Modal, Platform, Pressable, Text, View } from 'react-native';
import { modalStyles } from '@/components/Map/styles';

const DetailModal = ({ selectedMarker, onClose }) => {
  return (
    <Modal
      visible={!!selectedMarker}
      transparent
      animationType="slide"
      statusBarTranslucent={Platform.OS === 'ios'}
      onRequestClose={onClose}
    >
      <Pressable style={modalStyles.container} onPress={onClose}>
        <View style={modalStyles.content}>
          <Text style={modalStyles.title}>{selectedMarker?.name}</Text>
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
  );
};

export default DetailModal;
