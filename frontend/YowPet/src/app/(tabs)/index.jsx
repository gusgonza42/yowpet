import { StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';

export default function HomeScreen() {
  return (
    <ScreenContainer backgroundColor={'#fff'}>
      <View style={styles.container}>
        <Text>Página Principal de Tabs osea el home</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 120,
  },
});
