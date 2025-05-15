import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';
import { styles } from './styles';

export const MenuItem = ({ icon, title, subtitle, onPress, showArrow }) => {
  const { width } = Dimensions.get('window');
  const isSmallScreen = width < 360;

  const dynamicStyles = {
    menuItem: {
      ...styles.MenuItem.menuItem,
      paddingVertical: isSmallScreen
        ? 12
        : styles.MenuItem.menuItem.paddingVertical,
    },
    menuItemTextContainer: {
      ...styles.MenuItem.menuItemTextContainer,
      marginLeft: isSmallScreen ? 12 : 16,
    },
  };

  return (
    <TouchableOpacity
      style={dynamicStyles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.MenuItem.menuItemLeft}>
        {icon}
        <View style={dynamicStyles.menuItemTextContainer}>
          <Text style={styles.MenuItem.menuItemTitle} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.MenuItem.menuItemSubtitle} numberOfLines={1}>
              {subtitle}
            </Text>
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
