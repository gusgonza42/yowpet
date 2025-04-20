import { Animated, FlatList, View } from 'react-native';
import { OnboardingItem } from '@components/onboarding/OnboardingItem';
import { OnboardingPagination } from '@components/onboarding/OnboardingPagination';
import { useOnboarding } from '@hooks/useOnboarding';
import { styles } from '@components/onboarding/styles';

export default function Onboarding() {
  const {
    slides,
    currentIndex,
    scrollX,
    slidesRef,
    viewableItemsChanged,
    viewConfig,
    handleContinue,
    getDotAnimation,
  } = useOnboarding();

  return (
    <View style={styles.onboardingScreen.container}>
      <FlatList
        data={slides}
        renderItem={({ item, index }) => (
          <OnboardingItem
            item={item}
            onContinue={handleContinue}
            index={index}
            scrollX={scrollX}
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

      <OnboardingPagination
        slides={slides}
        currentIndex={currentIndex}
        getDotAnimation={getDotAnimation}
      />
    </View>
  );
}
