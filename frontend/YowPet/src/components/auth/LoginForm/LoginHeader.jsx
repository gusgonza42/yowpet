import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '@components/auth/LoginForm/styles';

export function LoginHeader() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('@assets/logos/yowpet_icon_v2.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Bienvenido a YowPet</Text>
    </View>
  );
}
