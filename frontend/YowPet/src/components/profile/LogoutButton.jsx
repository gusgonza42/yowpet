import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

export const LogoutButton = ({ onPress, screenWidth }) => {
  const isSmallScreen = screenWidth < 360;

  const dynamicStyles = {
    logoutButton: {
      ...styles.LogoutButton.logoutButton,
      marginHorizontal: isSmallScreen
        ? 30
        : styles.LogoutButton.logoutButton.marginHorizontal,
    },
  };

  return (
    <TouchableOpacity
      style={dynamicStyles.logoutButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name="log-out-outline" size={20} color="#de3b3b" />
      <Text style={styles.LogoutButton.logoutText}>Cerrar sesión</Text>
    </TouchableOpacity>
  );
};
