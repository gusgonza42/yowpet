import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

export function ScreenContainer({ children, style, backgroundColor }) {
  return (
    <SafeAreaView
      style={[
        styles.safe,
        {
          backgroundColor: backgroundColor || YowPetTheme.background.mainWhite,
        },
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.container, style]}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 16,
    flexGrow: 1,
  },
});
