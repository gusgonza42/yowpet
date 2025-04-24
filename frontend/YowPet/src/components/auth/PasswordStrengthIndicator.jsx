// PasswordStrengthIndicator.jsx
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

export const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = () => {
    if (!password) return 0;

    let score = 0;
    if (password.length > 6) score++;
    if (password.length > 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = getStrength();

  const getColor = () => {
    if (strength < 2) return YowPetTheme.status.errorState;
    if (strength < 4) return YowPetTheme.brand.orange;
    return YowPetTheme.status.successState;
  };

  const getMessage = () => {
    if (strength < 2) return 'Débil';
    if (strength < 4) return 'Media';
    return 'Fuerte';
  };

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        {[0, 1, 2, 3, 4].map(index => (
          <View
            key={index}
            style={[
              styles.bar,
              { backgroundColor: index < strength ? getColor() : '#E1E8ED' }
            ]}
          />
        ))}
      </View>
      <Text style={[styles.text, { color: getColor() }]}>{getMessage()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  barContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 5,
  },
  bar: {
    flex: 1,
    height: 4,
    marginRight: 4,
    borderRadius: 2,
  },
  text: {
    fontSize: 12,
    marginLeft: 8,
  },
});