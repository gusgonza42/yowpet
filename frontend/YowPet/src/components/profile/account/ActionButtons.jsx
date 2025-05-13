// src/components/account/ActionButtons.jsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

export const ActionButtons = ({ isEditing, onSave, onCancel, onEdit }) => (
  <View style={styles.buttonContainer}>
    {isEditing ? (
      <>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Guardar cambios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </>
    ) : (
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Text style={styles.editButtonText}>Editar perfil</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    marginBottom: 32,
    paddingHorizontal: 16,
    gap: 12,
  },
  editButton: {
    backgroundColor: YowPetTheme.brand.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: YowPetTheme.brand.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: YowPetTheme.background.mainWhite,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
  },
  cancelButtonText: {
    color: YowPetTheme.text.mainText,
    fontSize: 16,
    fontWeight: '600',
  },
});
