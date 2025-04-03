import { View, Text, StyleSheet } from "react-native";
import { ScreenContainer } from "@components/global/ScreenContainer";

export default function MapScreen() {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text>Map Screen</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
