import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

import { Ionicons } from '@expo/vector-icons';

export const ActionButtons = ({ isEditing, onSave, onCancel, onEdit }) => (
  <View style={styles.buttonContainer}>
    {isEditing ? (
      <>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Ionicons name="checkmark-circle" size={22} color="white" />
          <Text style={styles.saveButtonText}>Guardar cambios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Ionicons
            name="close-circle"
            size={22}
            color={YowPetTheme.text.mainText}
          />
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </>
    ) : (
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Ionicons name="create-outline" size={22} color="white" />
        <Text style={styles.editButtonText}>Editar perfil</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
    gap: 16,
  },
  editButton: {
    backgroundColor: YowPetTheme.brand.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 5,
    shadowColor: YowPetTheme.shadow.mediumShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: YowPetTheme.brand.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 5,
    shadowColor: YowPetTheme.shadow.mediumShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: YowPetTheme.background.mainWhite,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: YowPetTheme.border.normalBorder,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: YowPetTheme.text.mainText,
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 8,
  },
});
