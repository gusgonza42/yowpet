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
  isRequired = false,
  hasError = false,
}) => {
  const { keyboardType, secureTextEntry, isDatePicker } = options;
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || (value ? new Date(value) : new Date());

    // Ocultar el selector inmediatamente en Android
    if (Platform.OS === 'android') {
      setShowPicker(false);

      if (event.type === 'dismissed') {
        return;
      }
    }

    // Actualizar el valor directamente tanto en iOS como en Android
    const formattedDate = currentDate.toISOString().split('T')[0];
    onChange(formattedDate);

    // En iOS, cerrar el picker después de un breve retraso
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        setShowPicker(false);
      }, 500);
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
    <View style={[styles.card, hasError && styles.cardError]}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.fieldContent}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {isRequired && <Text style={styles.required}>*</Text>}
        </View>

        {isEditing ? (
          isDatePicker ? (
            <>
              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                activeOpacity={0.6}
                style={[styles.datePickerButton, hasError && styles.inputError]}
              >
                <Text style={[styles.value, !value && styles.placeholder]}>
                  {displayValue()}
                </Text>
              </TouchableOpacity>

              {showPicker && (
                <View style={Platform.OS === 'ios' ? styles.iosPicker : null}>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={value ? new Date(value) : new Date()}
                    mode="date"
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                    style={Platform.OS === 'ios' ? styles.iosDatePicker : {}}
                    themeVariant="light"
                  />
                </View>
              )}
            </>
          ) : (
            <TextInput
              style={[styles.input, hasError && styles.inputError]}
              value={value}
              onChangeText={onChange}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              placeholder={getPlaceholderText()}
              placeholderTextColor={YowPetTheme.text.softText}
            />
          )
        ) : (
          <Text
            style={[
              styles.value,
              !value && styles.placeholder,
              hasError && styles.valueError,
            ]}
          >
            {displayValue()}
          </Text>
        )}

        {hasError && isEditing && (
          <Text style={styles.errorText}>Este campo es obligatorio</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: YowPetTheme.background.mainWhite,
    borderRadius: 16,
    padding: 18,
    elevation: 3,
    shadowColor: YowPetTheme.shadow.mediumShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    marginBottom: 2, // Espacio entre tarjetas
    borderLeftWidth: 3,
    borderLeftColor: YowPetTheme.brand.primary,
  },
  cardError: {
    borderColor: YowPetTheme.status.errorState,
    borderWidth: 1,
    borderLeftColor: YowPetTheme.status.errorState,
    backgroundColor: YowPetTheme.background.softError,
  },
  iconContainer: {
    marginRight: 18,
    justifyContent: 'center',
    backgroundColor: YowPetTheme.background.softBackground,
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
  },
  fieldContent: {
    flex: 1,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: YowPetTheme.brand.primary,
  },
  required: {
    color: YowPetTheme.brand.orange,
    fontSize: 15,
    marginLeft: 4,
  },
  input: {
    fontSize: 16,
    color: YowPetTheme.text.mainText,
    padding: 8,
    backgroundColor: YowPetTheme.background.softBackground,
    borderRadius: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
  },
  datePickerButton: {
    paddingVertical: 10,
    backgroundColor: YowPetTheme.background.softBackground,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
  },
});
