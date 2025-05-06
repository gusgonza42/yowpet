import React from 'react';
import { View, TextInput as RNTextInput, Platform, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { YowPetTheme } from '@theme/Colors';
import { styles } from '@components/auth/styles';
import { AntDesign } from '@expo/vector-icons';

export const PasswordInput = ({
  label,
  value,
  onChangeText,
  onBlur,
  visible,
  toggleVisibility,
  icon,
  error,
  errorColor,
}) => {
  // Mapeo de iconos entre Paper y AntDesign
  const getAntDesignIcon = iconName => {
    const iconMap = {
      lock: 'lock',
      'lock-check': 'lock',
      'lock-outline': 'lock',
      eye: 'eyeo',
      'eye-off': 'eye',
    };

    return iconMap[iconName] || iconName;
  };

  // Renderizado específico para web
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webInputs.inputContainer}>
        {value && <Text style={styles.webInputs.label}>{label}</Text>}
        <View style={styles.icons.inputWrapper}>
          <View style={styles.webInputs.iconLeft}>
            <AntDesign
              name={getAntDesignIcon(icon)}
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
            secureTextEntry={!visible}
          />
          <View style={styles.webInputs.iconRight} onClick={toggleVisibility}>
            <AntDesign
              name={visible ? 'eye' : 'eyeo'}
              size={20}
              color={YowPetTheme.text.subtleText}
            />
          </View>
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
      secureTextEntry={!visible}
      mode="outlined"
      style={styles.password.input}
      left={<TextInput.Icon icon={icon} />}
      right={
        <TextInput.Icon
          icon={visible ? 'eye-off' : 'eye'}
          onPress={toggleVisibility}
        />
      }
      outlineColor={error ? errorColor : YowPetTheme.border.softBorder}
      activeOutlineColor={error ? errorColor : YowPetTheme.brand.primary}
      textColor={YowPetTheme.text.mainText}
      error={error}
    />
  );
};
