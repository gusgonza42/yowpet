import { MD3LightTheme } from "react-native-paper";
import { YowPetTheme } from "@theme/Colors";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...YowPetTheme,
  },
};

export default theme;
