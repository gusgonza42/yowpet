import { Animated, StyleSheet, View } from 'react-native';

export const OnboardingPagination = ({
  slides,
  currentIndex,
  getDotAnimation,
}) => {
  return (
    <View style={styles.paginationContainer}>
      {slides.map((_, index) => {
        const { width: dotWidth, opacity } = getDotAnimation(index);

        return (
          <Animated.View
            key={index.toString()}
            style={[
              styles.dot,
              { width: dotWidth, opacity },
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    bottom: 180, // Más cerca del botón
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 12, // Más grande
    borderRadius: 6,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#003E52',
  },
  inactiveDot: {
    backgroundColor: '#D1D1D1',
  },
});
