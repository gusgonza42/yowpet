import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { YowPetTheme } from '@theme/Colors';
import { petService } from '@service/profile/pet/petService';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function PetsScreen() {
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      cargarMascotas();
    }, [])
  );

  const cargarMascotas = async () => {
    try {
      setIsLoading(true);
      const response = await petService.obtenerMascotas();
      setPets(response || []);
    } catch (error) {
      console.error('Error al cargar mascotas:', error);
      Alert.alert(
        'Error',
        'No se pudieron cargar las mascotas. Por favor, intenta de nuevo.',
        [{ text: 'Entendido' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderPetCard = ({ item }) => (
    <TouchableOpacity
      style={styles.petCard}
      onPress={() => router.push(`./pets/${item.id}`)}
    >
      <Image
        source={
          item.profilePicture
            ? { uri: item.profilePicture }
            : require('@assets/logos/icon.png')
        }
        style={styles.petImage}
      />
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petType}>
          {item.customCategory || item.animalCategory}
        </Text>
        <Text style={styles.petAge}>
          {item.birthDate
            ? new Date(item.birthDate).toLocaleDateString()
            : 'Fecha no disponible'}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={24}
        color={YowPetTheme.text.subtleText}
      />
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="paw-outline"
        size={64}
        color={YowPetTheme.text.subtleText}
      />
      <Text style={styles.emptyText}>No tienes mascotas registradas</Text>
      <Text style={styles.emptySubtext}>
        Comienza agregando a tu primer compañero
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={YowPetTheme.text.mainText}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mis Mascotas</Text>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={YowPetTheme.brand.primary} />
          </View>
        ) : (
          <FlatList
            data={pets}
            renderItem={renderPetCard}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyList}
            refreshing={isLoading}
            onRefresh={cargarMascotas}
          />
        )}

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
    backgroundColor: YowPetTheme.brand.accent,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: YowPetTheme.text.mainText,
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 64,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: YowPetTheme.text.mainText,
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: YowPetTheme.text.softText,
    marginTop: 8,
    textAlign: 'center',
  },
  petAge: {
    fontSize: 12,
    color: YowPetTheme.text.subtleText,
    marginTop: 4,
  },
});
