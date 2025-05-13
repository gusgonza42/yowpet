import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { YowPetTheme } from '@theme/Colors';

export const FormField = ({
  label,
  value,
  icon,
  isEditing,
  onChange,
  options = {},
}) => {
  const { keyboardType, secureTextEntry, isDatePicker } = options;
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (event.type === 'dismissed') {
      return;
    }
    if (selectedDate) {
      // Formatear la fecha para que coincida con el formato esperado por el servidor
      const formattedDate = selectedDate.toISOString().split('T')[0];
      onChange(formattedDate);
    }
  };

  const getPlaceholderText = () => {
    switch (label) {
      case 'Usuario':
        return 'Agrega tu nombre de usuario';
      case 'Ciudad':
        return 'Agrega tu ciudad';
      case 'Dirección':
        return 'Agrega tu dirección';
      case 'Teléfono':
        return 'Agrega tu teléfono';
      case 'Fecha de nacimiento':
        return 'Agrega tu fecha de nacimiento';
      default:
        return '';
    }
  };

  const formatDate = dateString => {
    if (!dateString) return getPlaceholderText();
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return getPlaceholderText();
      }
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return getPlaceholderText();
    }
  };
  const displayValue = () => {
    if (!value || value === '') return getPlaceholderText();
    if (secureTextEntry) return '********';
    if (isDatePicker) return formatDate(value);
    return value;
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.fieldContent}>
        <Text style={styles.label}>{label}</Text>
        {isEditing ? (
          isDatePicker ? (
            <>
              <TouchableOpacity onPress={() => setShowPicker(true)}>
                <View style={styles.input}>
                  <Text style={[styles.value, !value && styles.placeholder]}>
                    {displayValue()}
                  </Text>
                </View>
              </TouchableOpacity>
              {showPicker && (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </>
          ) : (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              placeholder={getPlaceholderText()}
              placeholderTextColor={YowPetTheme.text.softText}
            />
          )
        ) : (
          <Text style={[styles.value, !value && styles.placeholder]}>
            {displayValue()}
          </Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: YowPetTheme.background.mainWhite,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: YowPetTheme.shadow.softShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  fieldContent: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: YowPetTheme.text.softText,
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    color: YowPetTheme.text.mainText,
    padding: 0,
  },
  value: {
    fontSize: 16,
    color: YowPetTheme.text.mainText,
  },
  placeholder: {
    color: YowPetTheme.text.softText,
    fontStyle: 'italic',
  },
});
