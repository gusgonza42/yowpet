import { View } from "react-native";
import { ScreenContainer } from "@components/global/ScreenContainer";
import { LoginHeader } from "@components/auth/LoginForm/LoginHeader";
import { LoginForm } from "@components/auth/LoginForm/LoginForm";
import { LoginFooter } from "@components/auth/LoginForm/LoginFooter";
import { styles } from "@components/auth/LoginForm/styles";

export default function Login() {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </View>
    </ScreenContainer>
  );
}
