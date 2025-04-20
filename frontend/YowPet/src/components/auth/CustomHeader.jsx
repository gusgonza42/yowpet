import { Text, View } from 'react-native';
import { styles } from '@components/auth/styles';

export const CustomHeader = () => {
  return (
    <View style={styles.CustomHeader.headerContainer}>
      <Text style={styles.CustomHeader.headerTitle}>
        <Text style={styles.CustomHeader.yowText}>Yow</Text>
        <Text style={styles.CustomHeader.petText}>Pet</Text>
      </Text>
    </View>
  );
};
