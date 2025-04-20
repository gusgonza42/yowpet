import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { YowPetTheme } from '@theme/Colors';

export const OnboardingItem = ({ item, onContinue, index }) => {
  const { width } = useWindowDimensions();

  // Configuraciones específicas para cada pantalla
  const screenConfigs = [
    // Primera pantalla
    {
      topBackground: {
        color: YowPetTheme.brand.orange,
        position: {
          top: 0,
          left: 0,
          right: 0,
          borderRadius: 'borderBottomLeftRadius',
        },
      },
      decoration1: {
        color: YowPetTheme.brand.primary,
        position: { top: '10%', left: 0, width: '40%', height: '20%' },
      },
      decoration2: {
        color: YowPetTheme.brand.accent,
        position: { bottom: '20%', right: 0, width: '25%', height: '25%' },
      },
    },
    // Segunda pantalla (se mantiene igual)
    {
      topBackground: {
        color: YowPetTheme.brand.secondary,
        position: {
          top: 0,
          left: 0,
          right: 0,
          borderRadius: 'borderBottomLeftRadius',
        },
      },
      decoration1: {
        color: YowPetTheme.brand.primary,
        position: { top: '20%', left: 0, width: '30%', height: '25%' },
      },
      decoration2: {
        color: YowPetTheme.brand.orange,
        position: { bottom: '25%', right: 0, width: '35%', height: '20%' },
      },
    },
    // Tercera pantalla
    {
      topBackground: {
        color: YowPetTheme.brand.primary,
        position: {
          top: 0,
          left: 0,
          right: 0,
          borderRadius: 'borderBottomLeftRadius',
        },
      },
      decoration1: {
        color: YowPetTheme.brand.secondary,
        position: { top: '15%', right: 0, width: '35%', height: '25%' },
      },
      decoration2: {
        color: YowPetTheme.brand.orange,
        position: { bottom: '20%', left: 0, width: '28%', height: '20%' },
      },
    },
  ];

  const config = screenConfigs[index % screenConfigs.length];

  return (
    <SafeAreaView style={[styles.container, { width }]}>
      {/* Fondo superior con color cambiante */}
      <View
        style={[
          styles.backgroundShape,
          {
            backgroundColor: config.topBackground.color,
            top: config.topBackground.position.top,
            left: config.topBackground.position.left,
            right: config.topBackground.position.right,
            [config.topBackground.borderRadius]: 100,
          },
        ]}
      />

      {/* Elemento decorativo 1 */}
      <View
        style={[
          styles.decorationShape,
          {
            backgroundColor: config.decoration1.color,
            top: config.decoration1.position.top,
            left: config.decoration1.position.left,
            right: config.decoration1.position.right,
            width: config.decoration1.position.width,
            height: config.decoration1.position.height,
            borderTopLeftRadius: config.decoration1.position.right ? 70 : 0,
            borderTopRightRadius: config.decoration1.position.left ? 70 : 0,
            borderBottomLeftRadius: config.decoration1.position.right ? 70 : 0,
            borderBottomRightRadius: config.decoration1.position.left ? 70 : 0,
          },
        ]}
      />

      {/* Elemento decorativo 2 */}
      <View
        style={[
          styles.decorationShape,
          {
            backgroundColor: config.decoration2.color,
            bottom: config.decoration2.position.bottom,
            left: config.decoration2.position.left,
            right: config.decoration2.position.right,
            width: config.decoration2.position.width,
            height: config.decoration2.position.height,
            borderTopLeftRadius: config.decoration2.position.right ? 60 : 0,
            borderTopRightRadius: config.decoration2.position.left ? 60 : 0,
            borderBottomLeftRadius: config.decoration2.position.right ? 60 : 0,
            borderBottomRightRadius: config.decoration2.position.left ? 60 : 0,
          },
        ]}
      />

      {/* Contenido principal */}
      <View style={styles.content}>
        {/* Imagen de mascotas */}
        <Image
          source={item.image}
          style={styles.petImage}
          resizeMode="contain"
        />

        {/* Logo y texto */}
        <View style={styles.textContainer}>
          <Text style={styles.logoText}>
            Yow<Text style={styles.petText}>Pet</Text>
          </Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        {/* Botón continuar */}
        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: YowPetTheme.background.mainWhite,
  },
  backgroundShape: {
    position: 'absolute',
    height: '50%',
    zIndex: 1,
  },
  decorationShape: {
    position: 'absolute',
    zIndex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    zIndex: 2,
  },
  petImage: {
    width: '80%',
    height: 300,
    marginTop: 50,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 40,
    paddingHorizontal: 30,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: YowPetTheme.brand.primary,
    marginBottom: 15,
  },
  petText: {
    color: YowPetTheme.brand.orange,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: YowPetTheme.text.mainText,
  },
  continueButton: {
    backgroundColor: YowPetTheme.brand.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 0,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  continueText: {
    color: YowPetTheme.text.invertedText,
    fontSize: 16,
    fontWeight: '600',
  },
});
