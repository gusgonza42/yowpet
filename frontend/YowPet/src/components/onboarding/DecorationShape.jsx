import { Animated } from 'react-native';
import { styles } from '@components/onboarding/styles';

export const DecorationShape = ({
  config,
  opacity,
  transform,
  isTopBackground = false,
}) => {
  // Determinamos qué estilo base aplicar
  const baseStyle = isTopBackground
    ? styles.decorationShape.backgroundShape
    : styles.decorationShape.decorationShape;

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
          backgroundColor: config.color,
          opacity,
          transform,
        },
      ]}
    />
  );
};
