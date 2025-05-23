import { useRef, useState } from 'react';
import { Animated } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import {
  loginSchema,
  registerSchema,
} from '@components/auth/validationSchemas';
import { authService } from '@/services/auth/authService';

export function useAuthForm() {
  const { login, register } = useAuth();
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

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      let userData;
      if (isLogin) {
        const response = await authService.login(values);
        console.log('Respuesta del servidor (login):', response);

        // Verificar si la respuesta está en data
        const responseData = response.data || response;

        if (!responseData) {
          throw new Error('No se recibieron datos del servidor');
        }

        userData = {
          token: responseData.token,
          userId: responseData.id?.toString() || '0',
          email: responseData.email || values.email,
          firstName: responseData.firstName || '',
          lastName: responseData.lastName || '',
          username: responseData.username || values.email.split('@')[0],
        };

        // Validar datos críticos
        if (!userData.token) {
         console.warn('Datos de usuario recibidos:', userData);
          throw new Error('Token de autenticación no recibido');
        }

        const loginSuccess = await login(userData);
        if (!loginSuccess) {
          throw new Error('Error en el proceso de inicio de sesión');
        }
      } else {
        const response = await authService.register(values);
        console.log('Respuesta del servidor (registro):', response);

        // Verificar si la respuesta está en data
        const responseData = response.data || response;

        if (!responseData) {
          throw new Error('No se recibieron datos del servidor');
        }

        userData = {
          token: responseData.token,
          userId: responseData.id?.toString() || '0',
          email: responseData.email || values.email,
          firstName: responseData.firstName || values.firstName,
          lastName: responseData.lastName || values.lastName,
          username: responseData.username || values.email.split('@')[0],
        };

        // Validar datos críticos
        if (!userData.token) {
         console.warn('Datos de usuario recibidos:', userData);
          throw new Error('Token de autenticación no recibido');
        }

        const registerSuccess = await register(userData);
        if (!registerSuccess) {
          throw new Error('Error en el proceso de registro');
        }
      }
    } catch (error) {
     console.warn('Error completo:', error);
     console.warn('Respuesta del servidor:', error.response?.data);

      let errorMessage = 'Error en la autenticación';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setFieldError('submit', errorMessage);
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
      console.log('Error al recuperar contraseña:', error);
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
