import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native-paper';

export function PetHighlight({ pets = [], onAddPet, isLoading }) {
  const router = useRouter();

  if (isLoading) {
    return (
      <View style={styles.highlightCard}>
        <View style={styles.highlightContent}>
          <ActivityIndicator size="large" color={YowPetTheme.brand.primary} />
        </View>
      </View>
    );
  }

  if (!pets || pets.length === 0) {
    return (
      <View style={styles.highlightCard}>
        <View style={styles.highlightContent}>
          <MaterialCommunityIcons
            name="paw"
            size={32}
            color={YowPetTheme.brand.primary}
          />
          <Text style={styles.highlightTitle}>Registra tu mascota</Text>
          <Text style={styles.highlightText}>
            Comienza agregando a tu compañero de vida
          </Text>
        </View>
        <Pressable style={styles.highlightButton} onPress={onAddPet}>
          <Text style={styles.highlightButtonText}>Comenzar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.petsSection}>
      <View style={styles.petsHeader}>
        <Text style={styles.petsTitle}>Mis mascotas</Text>
        <Pressable style={styles.addButton} onPress={onAddPet}>
          <MaterialCommunityIcons
            name="plus"
            size={24}
            color={YowPetTheme.brand.primary}
          />
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.petsList}
      >
        {pets.map(pet => (
          <Pressable
            key={pet.id}
            style={styles.petCard}
            onPress={() => router.push(`/profile/pets/${pet.id}`)}
          >
            <Image
              source={
                pet.profilePicture
                  ? { uri: pet.profilePicture }
                  : require('@assets/logos/icon.png')
              }
              style={styles.petImage}
            />
            <Text style={styles.petName}>{pet.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  highlightCard: {
    margin: 20,
    padding: 20,
    backgroundColor: YowPetTheme.brand.accent,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  highlightContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  highlightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: YowPetTheme.text.mainText,
    marginTop: 12,
  },
  highlightText: {
    fontSize: 14,
    color: YowPetTheme.brand.support,
    textAlign: 'center',
    marginTop: 8,
  },
  highlightButton: {
    backgroundColor: YowPetTheme.brand.orange,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  highlightButtonText: {
    color: YowPetTheme.brand.support,
    fontWeight: '600',
    fontSize: 16,
  },
  petsSection: {
    padding: 20,
  },
  petsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  petsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: YowPetTheme.text.mainText,
  },
  addButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: YowPetTheme.brand.accent,
  },
  petsList: {
    flexGrow: 0,
  },
  petCard: {
    marginRight: 16,
    alignItems: 'center',
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    backgroundColor: YowPetTheme.brand.surface,
  },
  petName: {
    fontSize: 14,
    fontWeight: '600',
    color: YowPetTheme.text.mainText,
    textAlign: 'center',
  },
});
