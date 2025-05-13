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
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: YowPetTheme.background.mainWhite,
    borderBottomWidth: 1,
    borderBottomColor: YowPetTheme.border.softBorder,
    elevation: 4,
    shadowColor: YowPetTheme.shadow.softShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 2,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: YowPetTheme.text.mainText,
  },
});
