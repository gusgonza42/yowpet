import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';

export default function ClubScreen() {
  const router = useRouter();

  return (
    <ScreenContainer backgroundColor={YowPetTheme.background.mainWhite}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: YowPetTheme.border.softBorder,
        }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={YowPetTheme.text.mainText}
          onPress={() => router.back()}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 16,
          }}
        >
          YowPet Club
        </Text>
      </View>
    </ScreenContainer>
  );
}