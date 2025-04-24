import React, { useMemo } from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import { YowPetTheme } from '@theme/Colors';

    export const PasswordStrengthIndicator = ({ password }) => {
      // No mostrar nada si no hay contraseña
      if (!password || password.length === 0) {
        return null;
      }

      const { strength, message, color } = useMemo(() => {
        // Criterios para evaluar la fortaleza
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;

        // Calcular puntuación (0-4)
        let score = 0;
        if (hasLowerCase) score++;
        if (hasUpperCase) score++;
        if (hasDigit) score++;
        if (hasSpecialChar) score++;
        if (isLongEnough) score++;

        // Determinar nivel basado en puntuación
        if (score === 0 || password.length < 6) {
          return {
            strength: 'débil',
            message: 'Contraseña débil',
            color: YowPetTheme.status.errorState
          };
        } else if (score <= 2) {
          return {
            strength: 'media',
            message: 'Contraseña media',
            color: YowPetTheme.status.warningState
          };
        } else {
          return {
            strength: 'fuerte',
            message: 'Contraseña fuerte',
            color: YowPetTheme.status.successState
          };
        }
      }, [password]);

      return (
        <View style={styles.container}>
          <View style={styles.barContainer}>
            <View
              style={[
                styles.strengthBar,
                {
                  backgroundColor: color,
                  width: strength === 'débil' ? '33%' : strength === 'media' ? '66%' : '100%'
                }
              ]}
            />
          </View>
          <Text style={[styles.text, { color }]}>{message}</Text>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        width: '100%',
        marginVertical: 8,
        alignItems: 'flex-start',
      },
      barContainer: {
        height: 6,
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 4
      },
      strengthBar: {
        height: '100%',
        borderRadius: 3,
      },
      text: {
        fontSize: 12,
        fontWeight: '500',
      }
    });