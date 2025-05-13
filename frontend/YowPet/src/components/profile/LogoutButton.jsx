import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

export const LogoutButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.LogoutButton.logoutButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name="log-out-outline" size={20} color="#de3b3b" />
      <Text style={styles.LogoutButton.logoutText}>Cerrar sesión</Text>
    </TouchableOpacity>
  );
};
