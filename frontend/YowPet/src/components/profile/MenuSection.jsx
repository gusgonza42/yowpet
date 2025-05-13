import React from 'react';
import { View } from 'react-native';
import { MenuItem } from './MenuItem';
import { styles } from './styles';

export const MenuSection = ({ items }) => {
  return (
    <View style={styles.MenuSection.menuContainer}>
      {items.map(item => (
        <MenuItem
          key={item.id}
          icon={item.icon}
          title={item.title}
          subtitle={item.subtitle}
          onPress={item.onPress}
          showArrow={item.showArrow}
        />
      ))}
    </View>
  );
};
