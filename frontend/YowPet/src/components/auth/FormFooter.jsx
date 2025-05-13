import { Text } from 'react-native';
import { styles } from '@components/auth/styles';

export const FormFooter = ({ isLogin, onForgotPassword }) => (
  <>
    {isLogin && (
      <Text style={styles.footer.forgotPasswordText} onPress={onForgotPassword}>
        ¿Olvidaste tu contraseña?
      </Text>
    )}

    {!isLogin && (
      <Text style={styles.footer.termsText}>
        Al registrarse, acepta nuestros{' '}
        <Text style={styles.footer.linkText}>Términos de privacidad</Text> y{' '}
        <Text style={styles.footer.linkText}>Condiciones de uso</Text>
      </Text>
    )}
  </>
);
