import { Animated, StyleSheet } from 'react-native';

export const DecorationShape = ({
  config,
  opacity,
  transform,
  isTopBackground = false,
}) => {
  const styles = StyleSheet.create({
    backgroundShape: {
      position: 'absolute',
      height: '50%',
      zIndex: 1,
      backgroundColor: config.color,
      borderBottomLeftRadius: 100, // Radio para fondo superior
    },
    decorationShape: {
      position: 'absolute',
      zIndex: 1,
      backgroundColor: config.color,
      borderRadius: 50, // Aplicamos bordes curvados a todas las formas decorativas
    },
  });

  // Determinamos qué estilo base aplicar
  const baseStyle = isTopBackground
    ? styles.backgroundShape
    : styles.decorationShape;

  return (
    <Animated.View
      style={[
        baseStyle,
        {
          top: config.position.top,
          left: config.position.left,
          right: config.position.right,
          bottom: config.position.bottom,
          width: config.position.width,
          height: isTopBackground ? '50%' : config.position.height,
          opacity,
          transform,
        },
      ]}
    />
  );
};
