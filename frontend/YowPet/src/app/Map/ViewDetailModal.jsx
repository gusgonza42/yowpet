import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';

const DetailModal = ({ selectedMarker, onClose }) => {
  return (
    <Modal
      visible={!!selectedMarker}
      transparent
      animationfilter="slide"
      onRequestClose={onClose}
    >
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
        onPress={onClose}
      >
        <View
          style={{
            backgroundColor: '#A0B3FF',
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
  );
};
export default DetailModal;
