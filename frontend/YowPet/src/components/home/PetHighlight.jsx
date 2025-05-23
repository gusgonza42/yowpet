import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  petshomeheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native-paper';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { fetchPetImages } from '@/services/api/fetchingimages';
import { petshome } from './styles';

export function PetHighlight({ pets = [], onAddPet, isLoading }) {
  const router = useRouter();
  const [photoUrls, setPhotoUrls] = useState({});

 /* useEffect(() => {
    const loadImages = async () => {
      const token = await AsyncStorage.getItem('@auth_token');
      if (pets.length > 0 && token) {
        const urls = await fetchPetImages(pets, token);
        setPhotoUrls(urls);
      }
    };
    loadImages();
  }, [pets]);*/

  if (isLoading) {
    return (
      <View style={petshome.highlightCard}>
        <View style={petshome.highlightContent}>
          <ActivityIndicator size="large" color={YowPetTheme.brand.primary} />
        </View>
      </View>
    );
  }

  if (!pets || pets.length === 0) {
    return (
      <View style={petshome.highlightCard}>
        <View style={petshome.highlightContent}>
          <MaterialCommunityIcons
            name="paw"
            size={32}
            color={YowPetTheme.brand.primary}
          />
          <Text style={petshome.highlightTitle}>Registra tu mascota</Text>
          <Text style={petshome.highlightText}>
            Comienza agregando a tu compañero de vida
          </Text>
        </View>
        <Pressable style={petshome.highlightButton} onPress={onAddPet}>
          <Text style={petshome.highlightButtonText}>Comenzar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={petshome.petsSection}>
      <View style={petshome.petsHeader}>
        <Text style={petshome.petsTitle}>Mis mascotas</Text>
        <Pressable style={petshome.addButton} onPress={onAddPet}>
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
        style={petshome.petsList}
      >
        {pets.map(pet => (
          <Pressable
            key={pet.id}
            style={petshome.petCard}
            onPress={() => router.push(`/profile/pets/${pet.id}`)}
          >
            <Image
              source={pet.profilePicture ? { uri: pet.profilePicture } : require('@assets/logos/icon.png')}
              style={petshome.petImage}
            />
            <Text style={petshome.petName}>{pet.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
