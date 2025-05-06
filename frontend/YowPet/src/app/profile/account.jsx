import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';

export default function AccountScreen() {
  const router = useRouter();
  const [name, setName] = useState('Tester YowPet'); // Estado inicial
  const [isEditing, setIsEditing] = useState(false); // Estado para editar

  const handleSave = () => {
    setIsEditing(false);
    // Aquí puedes agregar la lógica
  };

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
          Mi Cuenta
        </Text>
      </View>

      <View style={{ padding: 16 }}>
        {isEditing ? (
          <>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: YowPetTheme.border.softBorder,
                padding: 8,
                borderRadius: 8,
                marginBottom: 16,
              }}
              value={name}
              onChangeText={setName}
            />
            <Button title="Guardar" onPress={handleSave} />
          </>
        ) : (
          <>
            <Text style={{ fontSize: 18, marginBottom: 16 }}>
              Nombre: {name}
            </Text>
            <Button title="Editar" onPress={() => setIsEditing(true)} />
          </>
        )}
      </View>
    </ScreenContainer>
  );
}
