import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '@components/auth/LoginForm/styles';

export function LoginHeader() {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('@assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Bienvenido a YowPet</Text>
    </View>
  );
}
