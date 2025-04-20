import { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const useOnboardingAnimations = (index, scrollX) => {
  // Referencias para animaciones iniciales
  const initialFade = useRef(new Animated.Value(0)).current;
  const initialTopBg = useRef(new Animated.Value(-100)).current;
  const initialDeco1 = useRef(
    new Animated.Value(index === 0 ? -200 : 0)
  ).current;
  const initialDeco2 = useRef(
    new Animated.Value(index === 0 ? 200 : 0)
  ).current;
  const initialContent = useRef(
    new Animated.Value(index === 0 ? 100 : 0)
  ).current;

  // Calculamos el rango de entrada basado en la posición de esta pantalla
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  // Valores animados para sincronizar con desplazamiento
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });

  // Animación para el fondo superior con efecto paralaje
  const topBgTranslateY = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.3, 0, -width * 0.3],
    extrapolate: 'clamp',
  });

  // Nueva animación: escala para elementos decorativos
  const scaleElements = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: 'clamp',
  });

  // Nueva animación: rotación para elementos decorativos
  const rotateElements = scrollX.interpolate({
    inputRange,
    outputRange: ['-15deg', '0deg', '15deg'],
    extrapolate: 'clamp',
  });

  // Nueva animación: efecto de paralaje para los elementos decorativos
  const paralaxFactor = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.4, 0, -width * 0.4],
    extrapolate: 'clamp',
  });

  // Nueva animación: escala para el contenido
  const contentScale = scrollX.interpolate({
    inputRange,
    outputRange: [0.9, 1, 0.9],
    extrapolate: 'clamp',
  });

  // Nueva animación: rotación suave para el contenido
  const contentRotate = scrollX.interpolate({
    inputRange,
    outputRange: ['5deg', '0deg', '-5deg'],
    extrapolate: 'clamp',
  });

  // Animación inicial al montar el componente, más fluida
  useEffect(() => {
    if (index === 0) {
      const initialAnimationSequence = Animated.stagger(200, [
        Animated.timing(initialTopBg, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(initialDeco1, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(initialDeco2, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(initialContent, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]);

      Animated.timing(initialFade, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start();

      initialAnimationSequence.start();
    }
  }, []);

  const createDecorationAnimation = isRight => {
    return scrollX.interpolate({
      inputRange,
      outputRange: isRight ? [width, 0, -width / 2] : [-width, 0, width / 2],
      extrapolate: 'clamp',
    });
  };

  const contentTranslateY = scrollX.interpolate({
    inputRange,
    outputRange: [100, 0, -50],
    extrapolate: 'clamp',
  });

  return {
    initialFade,
    initialTopBg,
    initialDeco1,
    initialDeco2,
    initialContent,
    opacity,
    topBgTranslateY,
    createDecorationAnimation,
    contentTranslateY,
    // Funciones que devuelven transformaciones finales con nuevos efectos
    getFinalOpacity: () => (index === 0 ? initialFade : opacity),
    getFinalTopBgTransform: () =>
      index === 0
        ? [{ translateY: initialTopBg }]
        : [{ translateY: topBgTranslateY }],
    getFinalContentTransform: () =>
      index === 0
        ? [{ translateY: initialContent }]
        : [
            { translateY: contentTranslateY },
            { scale: contentScale },
            { rotate: contentRotate },
          ],
    getDecoTransform: (initial, animation, isRight) => {
      const parallaxX = isRight
        ? paralaxFactor
        : Animated.multiply(paralaxFactor, -1);

      return index === 0
        ? [{ translateX: initial }, { scale: 1 }]
        : [
            { translateX: animation },
            { translateX: parallaxX },
            { scale: scaleElements },
            { rotate: rotateElements },
          ];
    },
  };
};
