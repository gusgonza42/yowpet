import { useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingItem } from '@components/onboarding/OnboardingItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
  {
    id: '1',
    description: '¡Nunca perderás de vista a tu mejor amigo peludo!',
    image: require('../../assets/logos/yowpet_icon_v2.png'),
  },
  {
    id: '2',
    description: '¡Nunca perderás de vista a tu mejor amigo peludo!',
    image: require('../../assets/logos/icon.png'),
  },
  {
    id: '3',
    description: '¡Nunca perderás de vista a tu mejor amigo peludo!',
    image: require('../../assets/logos/yowpet.png'),
  },
];

const { width } = Dimensions.get('window');

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const router = useRouter();

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index ?? 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleContinue = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        await AsyncStorage.setItem('@onboarding_complete', 'true');
        router.replace('/(auth)/auth');
      } catch (err) {
        console.log('Error al guardar estado de onboarding:', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item, index }) => (
          <OnboardingItem
            item={item}
            onContinue={handleContinue}
            index={index}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View style={styles.paginationContainer}>
        <>
          {slides.map((_, index) => {
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

            return (
              <Animated.View
                key={index.toString()}
                style={[
                  styles.dot,
                  { width: dotWidth, opacity },
                  currentIndex === index
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            );
          })}
        </>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  paginationContainer: {
    position: 'absolute',
    bottom: 190,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 25,
  },
  activeDot: {
    backgroundColor: '#003E52', // Color azul oscuro para dot activo
  },
  inactiveDot: {
    backgroundColor: '#D1D1D1', // Color gris para dots inactivos
  },
});
