import { Animated } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { YowPetTheme } from '@theme/Colors';
import { styles } from '@components/auth/styles';
import { PasswordInput } from '@components/auth/PasswordInput';
import { FormFooter } from '@components/auth/FormFooter';

export const AuthForm = ({
  isLogin,
  formData,
  handleChange,
  toggleVisibility,
  handleSubmit,
  handleForgotPassword,
  fadeAnim,
}) => {
  const {
    email,
    password,
    firstName,
    lastName,
    confirmPassword,
    passwordVisible,
    confirmPasswordVisible,
  } = formData;

  return (
    <Animated.View style={[styles.form.formContainer, { opacity: fadeAnim }]}>
      {!isLogin && (
        <>
          <TextInput
            label="Nombre"
            value={firstName}
            onChangeText={text => handleChange('firstName', text)}
            mode="outlined"
            style={styles.form.input}
            left={<TextInput.Icon icon="account" />}
            outlineColor={YowPetTheme.border.softBorder}
            activeOutlineColor={YowPetTheme.brand.primary}
            textColor={YowPetTheme.text.mainText}
          />
          <TextInput
            label="Apellidos"
            value={lastName}
            onChangeText={text => handleChange('lastName', text)}
            mode="outlined"
            style={styles.form.input}
            left={<TextInput.Icon icon="account" />}
            outlineColor={YowPetTheme.border.softBorder}
            activeOutlineColor={YowPetTheme.brand.primary}
            textColor={YowPetTheme.text.mainText}
          />
        </>
      )}

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => handleChange('email', text)}
        mode="outlined"
        style={styles.form.input}
        left={<TextInput.Icon icon="email" />}
        keyboardType="email-address"
        autoCapitalize="none"
        outlineColor={YowPetTheme.border.softBorder}
        activeOutlineColor={YowPetTheme.brand.primary}
        textColor={YowPetTheme.text.mainText}
      />

      <PasswordInput
        label="Password"
        value={password}
        onChangeText={text => handleChange('password', text)}
        visible={passwordVisible}
        toggleVisibility={() => toggleVisibility('password')}
        icon="lock"
      />

      {!isLogin && (
        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={text => handleChange('confirmPassword', text)}
          visible={confirmPasswordVisible}
          toggleVisibility={() => toggleVisibility('confirmPassword')}
          icon="lock-check"
        />
      )}

      <Button
        mode="contained"
        style={styles.form.submitButton}
        contentStyle={styles.form.submitButtonContent}
        labelStyle={styles.form.submitButtonLabel}
        buttonColor={YowPetTheme.brand.accent || '#1E3A4C'}
        textColor={YowPetTheme.brand.white}
        onPress={handleSubmit}
      >
        {isLogin ? 'Sign In' : 'REGISTRARSE'}
      </Button>

      <FormFooter isLogin={isLogin} onForgotPassword={handleForgotPassword} />
    </Animated.View>
  );
};
