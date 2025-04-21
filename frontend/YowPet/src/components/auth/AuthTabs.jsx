import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '@components/auth/styles';

export const AuthTabs = memo(({ isLogin, onModeChange }) => {
  return (
    <View style={styles.authTabs.tabContainer}>
      <TouchableOpacity
        style={[styles.authTabs.tab, isLogin && styles.authTabs.activeTab]}
        onPress={() => onModeChange('login')}
        accessibilityRole="button"
        accessibilityLabel="Iniciar sesión"
        accessibilityState={{ selected: isLogin }}
      >
        <Text
          style={[
            styles.authTabs.tabText,
            isLogin && styles.authTabs.activeTabText,
          ]}
        >
          Inicia Sesión
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.authTabs.tab, !isLogin && styles.authTabs.activeTab]}
        onPress={() => onModeChange('register')}
        accessibilityRole="button"
        accessibilityLabel="Registrarse"
        accessibilityState={{ selected: !isLogin }}
      >
        <Text
          style={[
            styles.authTabs.tabText,
            !isLogin && styles.authTabs.activeTabText,
          ]}
        >
          Registrate
        </Text>
      </TouchableOpacity>
    </View>
  );
});
