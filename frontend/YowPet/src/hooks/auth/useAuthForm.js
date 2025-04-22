import { useRef, useState } from 'react';
import { Animated } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import {
  loginSchema,
  registerSchema,
} from '@components/auth/validationSchemas';
import { authService } from '@/services/auth/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAuthForm() {
  const { login: authLogin } = useAuth();
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
        // Proceso de login
        const loginData = {
          email: values.email,
          password: values.password,
        };

        const response = await authService.login(loginData);

        if (response.success) {
          await AsyncStorage.setItem('token', response.token);
          const userData = {
            email: values.email,
            token: response.token,
          };
          await authLogin(userData);
          resetForm();
        } else {
          setErrors({ submit: response.message || 'Error al iniciar sesión' });
        }
      } else {
        // Proceso de registro
        const registerData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        };

        const response = await authService.register(registerData);

        if (response.success) {
          // Si el registro es exitoso, guardamos el token
          await AsyncStorage.setItem('token', response.token);
          // Y actualizamos el contexto de autenticación
          const userData = {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            token: response.token,
          };
          await authLogin(userData);
          resetForm();
        } else {
          // Si hay un error, mostramos el mensaje del backend
          setErrors({ submit: response.message || 'Error en el registro' });
        }
      }
    } catch (error) {
      // Manejamos errores de red u otros problemas no controlados
      console.error('Error en autenticación:', error);
      setErrors({
        submit:
          error.response?.data?.message ||
          'Error de conexión con el servidor. Intente nuevamente.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleVisibility = (setFieldValue, field, currentValue) => {
    setFieldValue(`${field}Visible`, !currentValue);
  };

  const handleForgotPassword = async email => {
    try {
      if (!email) {
        return {
          success: false,
          message: 'Por favor, ingrese su correo electrónico',
        };
      }

      const response = await authService.forgotPassword(email);
      return {
        success: true,
        message:
          'Se ha enviado un enlace de recuperación a su correo electrónico',
      };
    } catch (error) {
      console.error('Error al recuperar contraseña:', error);
      return {
        success: false,
        message:
          error.response?.data?.message || 'Error al procesar la solicitud',
      };
    }
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
