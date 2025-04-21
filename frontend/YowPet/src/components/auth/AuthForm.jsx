import { Animated, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { YowPetTheme } from '@theme/Colors';
import { styles } from '@components/auth/styles';
import { PasswordInput } from '@components/auth/PasswordInput';
import { FormFooter } from '@components/auth/FormFooter';

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
          <TextInput
            label="Nombre"
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            mode="outlined"
            style={styles.form.input}
            left={<TextInput.Icon icon="account" />}
            outlineColor={
              touched.firstName && errors.firstName
                ? YowPetTheme.status.errorState
                : YowPetTheme.border.softBorder
            }
            activeOutlineColor={
              touched.firstName && errors.firstName
                ? YowPetTheme.status.errorState
                : YowPetTheme.brand.primary
            }
            textColor={YowPetTheme.text.mainText}
            error={touched.firstName && !!errors.firstName}
          />
          {touched.firstName && errors.firstName && (
            <Text style={styles.SocialButtons.errorText}>
              {errors.firstName}
            </Text>
          )}

          <TextInput
            label="Apellidos"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            mode="outlined"
            style={styles.form.input}
            left={<TextInput.Icon icon="account" />}
            outlineColor={
              touched.lastName && errors.lastName
                ? YowPetTheme.status.errorState
                : YowPetTheme.border.softBorder
            }
            activeOutlineColor={
              touched.lastName && errors.lastName
                ? YowPetTheme.status.errorState
                : YowPetTheme.brand.primary
            }
            textColor={YowPetTheme.text.mainText}
            error={touched.lastName && !!errors.lastName}
          />
          {touched.lastName && errors.lastName && (
            <Text style={styles.SocialButtons.errorText}>
              {errors.lastName}
            </Text>
          )}
        </>
      )}

      <TextInput
        label="Email"
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        mode="outlined"
        style={styles.form.input}
        left={<TextInput.Icon icon="email" />}
        keyboardType="email-address"
        autoCapitalize="none"
        outlineColor={
          touched.email && errors.email
            ? YowPetTheme.status.errorState
            : YowPetTheme.border.softBorder
        }
        activeOutlineColor={
          touched.email && errors.email
            ? YowPetTheme.status.errorState
            : YowPetTheme.brand.primary
        }
        textColor={YowPetTheme.text.mainText}
        error={touched.email && !!errors.email}
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
        style={styles.form.submitButton}
        contentStyle={styles.form.submitButtonContent}
        labelStyle={styles.form.submitButtonLabel}
        buttonColor={YowPetTheme.brand.primary}
        textColor={YowPetTheme.brand.white}
        onPress={handleSubmit}
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        {isLogin ? 'Iniciar sesión' : 'Registrarse'}
      </Button>

      <FormFooter isLogin={isLogin} onForgotPassword={handleForgotPassword} />
    </Animated.View>
  );
};
