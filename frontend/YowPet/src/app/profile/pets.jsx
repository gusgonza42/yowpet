import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { YowPetTheme } from '@theme/Colors';

export default function PetsScreen() {
  const router = useRouter();
  const [pets] = useState([
    {
      id: '1',
      name: 'Luna',
      image: 'https://placedog.net/100/300',
      type: 'Gato',
      age: '2 años',
    },
    {
      id: '2',
      name: 'Max',
      image: 'https://placedog.net/200/200',
      type: 'Perro',
      age: '3 años',
    },
  ]);

  const renderPetCard = ({ item }) => (
    <TouchableOpacity
      style={styles.petCard}
      onPress={() => router.push(`./pets/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petType}>{item.type}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={24}
        color={YowPetTheme.text.subtleText}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={YowPetTheme.text.mainText}
            onPress={() => router.back()}
          />
          <Text style={styles.headerTitle}>Mis Mascotas</Text>
        </View>

        <FlatList
          data={pets}
          renderItem={renderPetCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('./pets/new')}
        >
          <Ionicons
            name="add"
            size={24}
            color={YowPetTheme.background.mainWhite}
          />
          <Text style={styles.addButtonText}>Añadir Mascota</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: YowPetTheme.brand.primary,
  },
  container: {
    flex: 1,
    backgroundColor: YowPetTheme.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: YowPetTheme.border.softBorder,
    backgroundColor: YowPetTheme.background.mainWhite,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: YowPetTheme.text.mainText,
  },
  listContainer: {
    padding: 15,
    paddingTop: 20,
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: YowPetTheme.brand.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  petInfo: {
    flex: 1,
    marginLeft: 12,
  },
  petName: {
    fontSize: 16,
    fontWeight: '600',
    color: YowPetTheme.text.mainText,
  },
  petType: {
    fontSize: 14,
    color: YowPetTheme.text.subtleText,
    marginTop: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: YowPetTheme.brand.orange,
    padding: 16,
    borderRadius: 12,
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    color: YowPetTheme.background.mainWhite,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});
