import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import { ProgressBar } from 'react-native-paper';

const { width } = Dimensions.get('window');

export default function VideoDetailScreen() {
  const {
    title = 'No Title',
    description = 'No Description',
    difficulty = 'Unknown',
    instructionImages = '',
    steps = '',
  } = useLocalSearchParams();

  const imageArray = instructionImages ? instructionImages.split(',') : [];
  const stepArray = steps ? steps.split(',') : [];

  const data = imageArray.map((image, index) => ({
    image,
    step: stepArray[index] || '',
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = new Animated.Value(1);

  const handleTransition = (newIndex) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(newIndex);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      handleTransition(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      handleTransition(currentIndex - 1);
    }
  };

  const progress = (currentIndex + 1) / data.length;

  return (
      <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
        {/* Encabezado */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Nivel: {difficulty}</Text>
        </View>

        {/* Contenido principal */}
        <View style={styles.contentContainer}>
          <Text style={styles.description}>{description}</Text>

          {/* Progreso */}
          <Text style={styles.progressText}>
            Paso {currentIndex + 1} de {data.length}
          </Text>
          <ProgressBar
              progress={progress}
              color={YowPetTheme.brand.accent}
              style={styles.progressBar}
          />

          {/* Imagen con transición suave */}
          <Animated.Image
              source={{ uri: data[currentIndex].image }}
              style={[styles.image, { opacity: fadeAnim }]}
          />

          <Text style={styles.stepText}>{data[currentIndex].step}</Text>

          {/* Navegación */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
                onPress={handlePrevious}
                style={[
                  styles.navButton,
                  currentIndex === 0 && styles.disabledButton,
                ]}
                disabled={currentIndex === 0}
            >
              <Text style={styles.navButtonText}>Atrás</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleNext}
                style={[
                  styles.navButton,
                  currentIndex === data.length - 1 && styles.disabledButton,
                ]}
                disabled={currentIndex === data.length - 1}
            >
              <Text style={styles.navButtonText}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: YowPetTheme.brand.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: YowPetTheme.background.mainWhite,
    borderRadius: 24,
    marginTop: -20,
    padding: 20,
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: YowPetTheme.text.mainText,
    textAlign: 'center',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: YowPetTheme.text.secondaryText,
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginBottom: 20,
  },
  image: {
    width: width - 40,
    height: 300,
    borderRadius: 16,
    marginBottom: 20,
  },
  stepText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: YowPetTheme.text.mainText,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  navButton: {
    backgroundColor: YowPetTheme.brand.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  navButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFF',
  },
  disabledButton: {
    backgroundColor: YowPetTheme.background.lightGray,
  },
});