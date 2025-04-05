import { View } from "react-native";
import { Button } from "react-native-paper";
import { router } from "expo-router";
import { styles } from "@components/auth/LoginForm/styles";

export function LoginFooter() {
  return (
    <View style={styles.footerContainer}>
      <Button
        mode="text"
        onPress={() => router.push("/(auth)/register")}
        style={styles.button}
      >
        ¿No tienes cuenta? Regístrate
      </Button>
    </View>
  );
}
