import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { ExpoRoot } from "expo-router";
import theme from "./src/theme/theme";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <ExpoRoot />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
