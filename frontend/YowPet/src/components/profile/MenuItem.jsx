import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';
import { styles } from './styles';

export const MenuItem = ({ icon, title, subtitle, onPress, showArrow }) => {
  return (
    <TouchableOpacity
      style={styles.MenuItem.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.MenuItem.menuItemLeft}>
        {icon}
        <View style={styles.MenuItem.menuItemTextContainer}>
          <Text style={styles.MenuItem.menuItemTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.MenuItem.menuItemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {showArrow && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={YowPetTheme.text.subtleText}
        />
      )}
    </TouchableOpacity>
  );
};
