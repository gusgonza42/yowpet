import React from 'react';
import { View, TextInput as RNTextInput, Platform, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { YowPetTheme } from '@theme/Colors';
import { styles } from '@components/auth/styles';
import { AntDesign } from '@expo/vector-icons';

export const WebTextInput = ({
  label,
  value,
  onChangeText,
  onBlur,
  icon,
  error,
  errorColor,
  keyboardType = 'default',
  autoCapitalize = 'none',
}) => {
  // Mapeo entre iconos de React Native Paper y AntDesign
  const getAntDesignIcon = () => {
    const iconMap = {
      account: 'user',
      'account-outline': 'user',
      email: 'mail',
      'email-outline': 'mail',
      mail: 'mail',
      lock: 'lock',
      'lock-outline': 'lock',
      'lock-check': 'lock1',
    };

    return iconMap[icon] || icon;
  };

  // Renderizado específico para web
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webInputs.inputContainer}>
        {value && <Text style={styles.webInputs.label}>{label}</Text>}
        <View style={styles.icons.inputWrapper}>
          <View style={styles.webInputs.iconLeft}>
            <AntDesign
              name={getAntDesignIcon()}
              size={20}
              color={YowPetTheme.text.subtleText}
            />
          </View>
          <RNTextInput
            style={[
              styles.webInputs.input,
              error && styles.webInputs.errorBorder,
            ]}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            placeholder={label}
            placeholderTextColor="#aaa"
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
          />
        </View>
      </View>
    );
  }

  // Renderizado para móvil (original)
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      mode="outlined"
      style={styles.form.input}
      left={<TextInput.Icon icon={icon} />}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      outlineColor={error ? errorColor : YowPetTheme.border.softBorder}
      activeOutlineColor={error ? errorColor : YowPetTheme.brand.primary}
      textColor={YowPetTheme.text.mainText}
      error={error}
    />
  );
};
