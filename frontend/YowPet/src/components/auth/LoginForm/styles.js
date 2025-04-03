import { StyleSheet } from "react-native";
import { YowPetTheme } from "@theme/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: YowPetTheme.text.mainText,
    textAlign: "center",
  },
  formContainer: {
    flex: 0.4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  button: {
    width: "80%",
    marginTop: 8,
  },
  footerContainer: {
    flex: 0.3,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 32,
  }
});