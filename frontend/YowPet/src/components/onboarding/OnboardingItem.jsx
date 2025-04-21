import { SafeAreaView, useWindowDimensions } from 'react-native';
import { DecorationShape } from './DecorationShape';
import { OnboardingContent } from './OnboardingContent';
import { useOnboardingAnimations } from '@hooks/onBoarding/useOnboardingAnimations';
import { screenConfigs } from '@constants/onboardingData';
import { styles } from './styles';

export const OnboardingItem = ({ item, onContinue, index, scrollX }) => {
  const { width } = useWindowDimensions();
  const animations = useOnboardingAnimations(index, scrollX);

  // Obtener la configuración específica para esta pantalla
  const config = screenConfigs[index % screenConfigs.length];

  // Crear animaciones para decoraciones específicas
  const deco1TranslateX = animations.createDecorationAnimation(
    !config.decoration1.position.right
  );
  const deco2TranslateX = animations.createDecorationAnimation(
    !config.decoration2.position.right
  );

  // Obtener transformaciones finales
  const finalOpacity = animations.getFinalOpacity();
  const finalTopBgTransform = animations.getFinalTopBgTransform();
  const finalDeco1Transform = animations.getDecoTransform(
    animations.initialDeco1,
    deco1TranslateX,
    !config.decoration1.position.right
  );
  const finalDeco2Transform = animations.getDecoTransform(
    animations.initialDeco2,
    deco2TranslateX,
    !config.decoration2.position.right
  );
  const finalContentTransform = animations.getFinalContentTransform();

  return (
    <SafeAreaView style={[styles.onboardingItem.container, { width }]}>
      {/* Fondo superior con color cambiante */}
      <DecorationShape
        config={config.topBackground}
        opacity={finalOpacity}
        transform={finalTopBgTransform}
        isTopBackground={true}
      />

      {/* Elemento decorativo 1 */}
      <DecorationShape
        config={config.decoration1}
        opacity={finalOpacity}
        transform={finalDeco1Transform}
      />

      {/* Elemento decorativo 2 */}
      <DecorationShape
        config={config.decoration2}
        opacity={finalOpacity}
        transform={finalDeco2Transform}
      />

      {/* Contenido principal */}
      <OnboardingContent
        item={item}
        onContinue={onContinue}
        opacity={finalOpacity}
        transform={finalContentTransform}
      />
    </SafeAreaView>
  );
};
