import { useRef, useState } from 'react';
import { Animated } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import {
  loginSchema,
  registerSchema,
} from '@components/auth/validationSchemas';

export function useAuthForm() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const initialValues = isLogin
    ? {
        email: '',
        password: '',
        passwordVisible: false,
      }
    : {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        passwordVisible: false,
        confirmPasswordVisible: false,
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

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      if (isLogin) {
        const userData = {
          email: values.email,
          password: values.password,
        };
        await login(userData);
      } else {
        const registerData = {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        };
        await login(registerData); // Aquí podrías tener otra función como register()
      }
      resetForm();
    } catch (error) {
      setErrors({ submit: error.message || 'Error al procesar la solicitud' });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleVisibility = (setFieldValue, field, currentValue) => {
    setFieldValue(`${field}Visible`, !currentValue);
  };

  const handleForgotPassword = () => {
    console.log('Recuperar contraseña');
  };

  return {
    isLogin,
    fadeAnim,
    initialValues,
    validationSchema: isLogin ? loginSchema : registerSchema,
    handleSubmit,
    handleModeChange,
    toggleVisibility,
    handleForgotPassword,
  };
}
