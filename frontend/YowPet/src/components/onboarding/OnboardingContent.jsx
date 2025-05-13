import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

export const OnboardingContent = ({ item, onContinue, opacity, transform }) => {
  return (
    <Animated.View
      style={[styles.onboardingContent.content, { opacity, transform }]}
    >
      <Image
        source={item.image}
        style={styles.onboardingContent.petImage}
        resizeMode="contain"
      />

      <View style={styles.onboardingContent.textContainer}>
        <Text style={styles.onboardingContent.logoText}>
          Yow<Text style={styles.onboardingContent.petText}>Pet</Text>
        </Text>
        <Text style={styles.onboardingContent.description}>
          {item.description}
        </Text>
      </View>

      <View style={styles.onboardingContent.buttonContainer}>
        {item.id !== '3' ? (
          <TouchableOpacity
            style={styles.onboardingContent.skipButton}
            onPress={() => onContinue(true)}
          >
            <Text style={styles.onboardingContent.skipText}>Saltar</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.onboardingContent.emptySpace} />
        )}
        <TouchableOpacity
          style={styles.onboardingContent.continueButton}
          onPress={() => onContinue()}
        >
          <Text style={styles.onboardingContent.continueText}>
            {item.id === '3' ? 'Comenzar' : 'Continuar'}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
