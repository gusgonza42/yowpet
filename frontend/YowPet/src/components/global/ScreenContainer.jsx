import { View, SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export function ScreenContainer({ children, style, backgroundColor }) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.safe,
        { backgroundColor: backgroundColor || colors.background },
      ]}
    >
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
