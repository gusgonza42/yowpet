import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

export const AppFooter = ({ version = '1.0.0' }) => {
  return (
    <View style={styles.AppFooter.footerContainer}>
      <Text>
        <Text style={styles.AppFooter.brandPrimary}>Yow</Text>
        <Text style={styles.AppFooter.brandSecondary}>Pet</Text>
      </Text>
      <Text style={styles.AppFooter.versionNumber}>Versión {version}</Text>
    </View>
  );
};
