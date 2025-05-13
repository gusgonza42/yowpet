import { Animated, View } from 'react-native';
import { styles } from './styles';

export const OnboardingPagination = ({
  slides,
  currentIndex,
  getDotAnimation,
}) => {
  return (
    <View style={styles.pagination.paginationContainer}>
      {slides.map((_, index) => {
        const { width: dotWidth, opacity } = getDotAnimation(index);

        return (
          <Animated.View
            key={index.toString()}
            style={[
              styles.pagination.dot,
              { width: dotWidth, opacity },
              currentIndex === index
                ? styles.pagination.activeDot
                : styles.pagination.inactiveDot,
            ]}
          />
        );
      })}
    </View>
  );
};
