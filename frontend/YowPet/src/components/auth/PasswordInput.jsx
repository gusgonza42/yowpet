import { TextInput } from 'react-native-paper';
import { YowPetTheme } from '@theme/Colors';
import { styles } from '@components/auth/styles';

export const PasswordInput = ({
  label,
  value,
  onChangeText,
  visible,
  toggleVisibility,
  icon,
}) => (
  <TextInput
    label={label}
    value={value}
    onChangeText={onChangeText}
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
    outlineColor={YowPetTheme.border.softBorder}
    activeOutlineColor={YowPetTheme.brand.primary}
    textColor={YowPetTheme.text.mainText}
  />
);
