import { useRef, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { slides } from '@constants/onboardingData';

const { width } = Dimensions.get('window');

export const useOnboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const router = useRouter();

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index ?? 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleContinue = async (skip = false) => {
    if (skip || currentIndex >= slides.length - 1) {
      try {
        await AsyncStorage.setItem('@onboarding_complete', 'true');
        router.replace('/(auth)/auth');
      } catch (err) {
        console.log('Error al guardar estado de onboarding:', err);
      }
    } else {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };
  // Calcula las animaciones para los dots
  const getDotAnimation = index => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const dotWidth = scrollX.interpolate({
      inputRange,
      outputRange: [10, 20, 10],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

    return { width: dotWidth, opacity };
  };

  return {
    slides,
    currentIndex,
    scrollX,
    slidesRef,
    viewableItemsChanged,
    viewConfig,
    handleContinue,
    getDotAnimation,
  };
};
