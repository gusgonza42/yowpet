import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { YowPetTheme } from '@theme/Colors';

export const OnboardingContent = ({ item, onContinue, opacity, transform }) => {
  const styles = StyleSheet.create({
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
      gap: 100,
    },
    skipButton: {
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderRadius: 25,
      backgroundColor: YowPetTheme.brand.orange,
      minWidth: 120,
      alignItems: 'center',
    },
    skipText: {
      color: YowPetTheme.brand.support,
      fontSize: 16,
      fontWeight: '600',
    },
    continueButton: {
      backgroundColor: YowPetTheme.brand.primary,
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderRadius: 25,
    },
    continueText: {
      color: YowPetTheme.text.invertedText,
      fontSize: 16,
      fontWeight: '600',
    },
    emptySpace: {
      width: 100,
    },
  });

  return (
    <Animated.View style={[styles.content, { opacity, transform }]}>
      <Image source={item.image} style={styles.petImage} resizeMode="contain" />

      <View style={styles.textContainer}>
        <Text style={styles.logoText}>
          Yow<Text style={styles.petText}>Pet</Text>
        </Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {item.id !== '3' ? (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => onContinue(true)}
          >
            <Text style={styles.skipText}>Saltar</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.emptySpace} />
        )}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => onContinue()}
        >
          <Text style={styles.continueText}>
            {item.id === '3' ? 'Comenzar' : 'Continuar'}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
