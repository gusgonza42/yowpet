import { TextInput } from 'react-native-paper';
import { YowPetTheme } from '@theme/Colors';
import { styles } from '@components/auth/styles';

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
}) => (
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
