import React from 'react';
import { Text as ReactText, View as ReactView } from 'react-native';
import { Ionicons as ReactIonicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScreenContainer as ReactScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';

export default function HelpScreen() {
  const router = useRouter();

  return (
    <ReactScreenContainer backgroundColor={YowPetTheme.background.mainWhite}>
      <ReactView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: YowPetTheme.border.softBorder,
        }}
      >
        <ReactIonicons
          name="arrow-back"
          size={24}
          color={YowPetTheme.text.mainText}
          onPress={() => router.back()}
        />
        <ReactText
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 16,
          }}
        >
          Ayuda
        </ReactText>
      </ReactView>
    </ReactScreenContainer>
  );
}
