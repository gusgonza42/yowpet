import { Animated, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { YowPetTheme } from '@theme/Colors';
import { styles } from '@components/auth/styles';
import { PasswordInput } from '@components/auth/PasswordInput';
import { WebTextInput } from '@components/auth/WebTextInput';
import { FormFooter } from '@components/auth/FormFooter';
import { PasswordStrengthIndicator } from '@components/auth/PasswordStrengthIndicator';

export const AuthForm = ({
  isLogin,
  formikProps,
  toggleVisibility,
  handleForgotPassword,
  fadeAnim,
}) => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
  } = formikProps;

  return (
    <Animated.View style={[styles.form.formContainer, { opacity: fadeAnim }]}>
      {!isLogin && (
        <>
          <WebTextInput
            label="Nombre"
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            icon="account"
            autoCapitalize="words"
            error={touched.firstName && !!errors.firstName}
            errorColor={YowPetTheme.status.errorState}
          />
          {touched.firstName && errors.firstName && (
            <Text style={styles.SocialButtons.errorText}>
              {errors.firstName}
            </Text>
          )}

          <WebTextInput
            label="Apellidos"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            icon="account"
            autoCapitalize="words"
            error={touched.lastName && !!errors.lastName}
            errorColor={YowPetTheme.status.errorState}
          />
          {touched.lastName && errors.lastName && (
            <Text style={styles.SocialButtons.errorText}>
              {errors.lastName}
            </Text>
          )}
        </>
      )}

      <WebTextInput
        label="Email"
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        icon="email"
        keyboardType="email-address"
        error={touched.email && !!errors.email}
        errorColor={YowPetTheme.status.errorState}
      />
      {touched.email && errors.email && (
        <Text style={styles.SocialButtons.errorText}>{errors.email}</Text>
      )}

      <PasswordInput
        label="Contraseña"
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        visible={values.passwordVisible}
        toggleVisibility={() =>
          toggleVisibility(setFieldValue, 'password', values.passwordVisible)
        }
        icon="lock"
        error={touched.password && !!errors.password}
        errorColor={YowPetTheme.status.errorState}
      />
      {touched.password && errors.password && (
        <Text style={styles.SocialButtons.errorText}>{errors.password}</Text>
      )}

      {!isLogin && (
        <>
          <PasswordInput
            label="Confirmar Contraseña"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            visible={values.confirmPasswordVisible}
            toggleVisibility={() =>
              toggleVisibility(
                setFieldValue,
                'confirmPassword',
                values.confirmPasswordVisible
              )
            }
            icon="lock-check"
            error={touched.confirmPassword && !!errors.confirmPassword}
            errorColor={YowPetTheme.status.errorState}
          />
          {!isLogin && <PasswordStrengthIndicator password={values.password} />}

          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.SocialButtons.errorText}>
              {errors.confirmPassword}
            </Text>
          )}
        </>
      )}

      {errors.submit && (
        <Text style={styles.SocialButtons.errorText}>{errors.submit}</Text>
      )}

      <Button
        mode="contained"
        style={[
          styles.form.submitButton,
          isSubmitting && styles.form.disabledButton,
        ]}
        contentStyle={styles.form.submitButtonContent}
        labelStyle={styles.form.submitButtonLabel}
        buttonColor={YowPetTheme.brand.primary}
        textColor={YowPetTheme.brand.white}
        onPress={handleSubmit}
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        {isSubmitting
          ? isLogin
            ? 'Iniciando sesión...'
            : 'Registrando...'
          : isLogin
            ? 'Iniciar sesión'
            : 'Registrarse'}
      </Button>

      <FormFooter isLogin={isLogin} onForgotPassword={handleForgotPassword} />
    </Animated.View>
  );
};
