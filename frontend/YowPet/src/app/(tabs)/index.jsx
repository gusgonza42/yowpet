import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import { HomeGreeting } from '@components/home/HomeGreeting';
import { HomeMenu } from '@components/home/HomeMenu';
import { AppFooter } from '@components/home/AppFooter';

export default function HomeScreen() {
  return (
      <ScreenContainer backgroundColor={YowPetTheme.background.mainWhite}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <HomeGreeting />
          <HomeMenu />
          <AppFooter />
        </ScrollView>
      </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 36,
    paddingHorizontal: 18,
    alignItems: 'center',
    backgroundColor: YowPetTheme.background.mainWhite,
  },
});