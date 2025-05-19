import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';

export const AccountHeader = ({ onBack }) => (
  <View style={styles.header}>
    <Ionicons
      name="arrow-back"
      size={24}
      color={YowPetTheme.text.mainText}
      onPress={onBack}
      style={styles.backButton}
    />
    <View style={styles.titleContainer}>
      <Text style={styles.headerTitle}>Mi Cuenta</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: YowPetTheme.brand.primary,
    borderBottomWidth: 0,
    elevation: 6,
    shadowColor: YowPetTheme.shadow.strongShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 2,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
    color: YowPetTheme.background.mainWhite,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: YowPetTheme.background.mainWhite,
  },
});
