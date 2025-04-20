import { useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { router } from 'expo-router';
import { APP_ROUTES } from '@constants/Routes';
import { CustomHeader } from '@components/auth/CustomHeader';
import { AuthTabs } from '@components/auth/AuthTabs';
import { AuthForm } from '@components/auth/AuthForm';
import { SocialButtons } from '@components/auth/SocialButtons';
import { styles } from '@components/auth/styles';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    passwordVisible: false,
    confirmPasswordVisible: false,
  });
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleVisibility = field => {
    setFormData(prev => ({
      ...prev,
      [`${field}Visible`]: !prev[`${field}Visible`],
    }));
  };

  const fadeAnimation = toValue => {
    Animated.timing(fadeAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleModeChange = newValue => {
    fadeAnimation(0);
    setTimeout(() => {
      setIsLogin(newValue === 'login');
      fadeAnimation(1);
    }, 200);
  };

  const handleSubmit = () => {
    router.replace(APP_ROUTES.TABS.HOME);
  };

  const handleForgotPassword = () => {
    console.log('Recuperar contraseña');
  };

  return (
    <ScreenContainer style={styles.auth.screenContainer}>
      <View style={styles.auth.container}>
        <CustomHeader />
        <View style={styles.auth.authContainer}>
          <AuthTabs isLogin={isLogin} onModeChange={handleModeChange} />
          <AuthForm
            isLogin={isLogin}
            formData={formData}
            handleChange={handleChange}
            toggleVisibility={toggleVisibility}
            handleSubmit={handleSubmit}
            handleForgotPassword={handleForgotPassword}
            fadeAnim={fadeAnim}
          />
          <SocialButtons />
        </View>
      </View>
    </ScreenContainer>
  );
}
