import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native';
import { petService } from '@service/profile/pet/petService';
import { CustomDatePicker } from '@components/global/CustomDatePicker';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

const ANIMAL_CATEGORIES = [
  { id: 1, name: 'Perro' },
  { id: 2, name: 'Gato' },
  { id: 3, name: 'Ave' },
  { id: 8, name: 'Tortuga' },
  { id: 4, name: 'Reptil' },
  { id: 5, name: 'Roedor' },
  { id: 6, name: 'Pez' },
  { id: 7, name: 'Anfibio' },
  { id: 0, name: 'Otro' },
];

const DOG_BREEDS = [
  { id: 1, name: 'Labrador' },
  { id: 2, name: 'Pastor Alemán' },
  { id: 3, name: 'Golden Retriever' },
  { id: 4, name: 'Bulldog' },
  { id: 5, name: 'Chihuahua' },
  { id: 0, name: 'Otro' },
];

const CAT_BREEDS = [
  { id: 1, name: 'Siamés' },
  { id: 2, name: 'Persa' },
  { id: 3, name: 'Maine Coon' },
  { id: 4, name: 'Angora' },
  { id: 5, name: 'Bengal' },
  { id: 0, name: 'Otro' },
];

const BIRD_BREEDS = [
  { id: 1, name: 'Periquito' },
  { id: 2, name: 'Canario' },
  { id: 3, name: 'Agapornis' },
  { id: 4, name: 'Cotorra' },
  { id: 5, name: 'Cacatúa' },
  { id: 0, name: 'Otro' },
];

const GENDERS = [
  { id: 'male', name: 'Macho' },
  { id: 'female', name: 'Hembra' },
];

export default function PetDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [pet, setPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPet, setEditedPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBreedModal, setShowBreedModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={YowPetTheme.brand.primary} />
      </View>
    );
  }

  useFocusEffect(
    useCallback(() => {
      if (id) {
        cargarDatosMascota();
      }
    }, [id]),
  );
  const cargarDatosMascota = async () => {
    try {
      setIsLoading(true);
      const petData = await petService.obtenerMascota(id);
      setPet(petData);
      setEditedPet(petData);
      if (petData.birthDate) {
        setDate(new Date(petData.birthDate));
      }
    } catch (error) {
      console.error('Error al cargar mascota:', error);
      Alert.alert(
        'Error',
        'No se pudo cargar la información de la mascota',
        [{ text: 'OK', onPress: () => router.back() }],
      );
    } finally {
      setIsLoading(false);
    }
  };

  const SelectModal = ({ visible, onClose, title, options, onSelect }) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          {options.map(option => (
            <TouchableOpacity
              key={option.id}
              style={styles.modalOption}
              onPress={() => {
                onSelect(option);
                onClose();
              }}
            >
              <Text style={styles.modalOptionText}>{option.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const getBreedOptions = () => {
    if (editedPet.animalCategory === 1) return DOG_BREEDS;
    if (editedPet.animalCategory === 2) return CAT_BREEDS;
    if (editedPet.animalCategory === 3) return BIRD_BREEDS;
    return [];
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setEditedPet(prev => ({ ...prev, profilePicture: result.assets[0].uri }));
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      // Asegúrate de que todos los campos necesarios estén presentes
      const updatedPetData = {
        ...editedPet,
        id: parseInt(id),
        sterilized: editedPet.sterilized ? 1 : 0,
        status: 1,
        birthDate: editedPet.birthDate,
        breed: editedPet.breed || 1,
      };

      console.log('Datos a actualizar:', updatedPetData); // Para debugging

      const response = await petService.actualizarMascota(id, updatedPetData);

      if (response) {
        await cargarDatosMascota(); // Recargar los datos
        setIsEditing(false);
        Alert.alert(
          '¡Éxito!',
          'Los datos de la mascota se han actualizado correctamente',
          [{ text: 'OK' }],
        );
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
      Alert.alert(
        'Error',
        'No se pudieron guardar los cambios. Por favor, intenta de nuevo.',
        [{ text: 'OK' }],
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    const formattedDate = currentDate.toISOString().split('T')[0];
    setEditedPet(prev => ({ ...prev, birthDate: formattedDate }));
  };
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={YowPetTheme.brand.primary} />
      </View>
    );
  }

  if (!pet) return null;

  return (
    <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={YowPetTheme.text.mainText}
          onPress={() => router.back()}
        />
        {isEditing ? (
          <TextInput
            style={styles.headerInput}
            value={editedPet.name}
            onChangeText={text =>
              setEditedPet(prev => ({ ...prev, name: text }))
            }
          />
        ) : (
          <Text style={styles.headerTitle}>{pet.name}</Text>
        )}
        <TouchableOpacity
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Ionicons
            name={isEditing ? 'checkmark-outline' : 'create-outline'}
            size={24}
            color={YowPetTheme.brand.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={isEditing ? pickImage : undefined}
        >
          <Image
            source={{
              uri: isEditing ? editedPet.profilePicture : pet.profilePicture,
            }}
            style={styles.petImage}
          />
          {isEditing && (
            <View style={styles.editImageOverlay}>
              <Ionicons
                name="camera"
                size={24}
                color={YowPetTheme.text.invertedText}
              />
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tipo:</Text>
            {isEditing ? (
              <TouchableOpacity
                style={styles.selector}
                onPress={() => setShowCategoryModal(true)}
              >
                <Text style={styles.selectorText}>
                  {
                    ANIMAL_CATEGORIES.find(
                      c => c.id === editedPet.animalCategory,
                    )?.name
                  }
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={24}
                  color={YowPetTheme.text.subtleText}
                />
              </TouchableOpacity>
            ) : (
              <Text style={styles.value}>
                {ANIMAL_CATEGORIES.find(c => c.id === pet.animalCategory)?.name}
              </Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Raza:</Text>
            {isEditing ? (
              <TouchableOpacity
                style={styles.selector}
                onPress={() => setShowBreedModal(true)}
              >
                <Text style={styles.selectorText}>{editedPet.breed}</Text>
                <Ionicons
                  name="chevron-down"
                  size={24}
                  color={YowPetTheme.text.subtleText}
                />
              </TouchableOpacity>
            ) : (
              <Text style={styles.value}>{pet.breed}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Género:</Text>
            {isEditing ? (
              <TouchableOpacity
                style={styles.selector}
                onPress={() => setShowGenderModal(true)}
              >
                <Text style={styles.selectorText}>
                  {GENDERS.find(g => g.id === editedPet.gender)?.name}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={24}
                  color={YowPetTheme.text.subtleText}
                />
              </TouchableOpacity>
            ) : (
              <Text style={styles.value}>
                {GENDERS.find(g => g.id === pet.gender)?.name}
              </Text>
            )}
          </View>

          <View style={styles.descriptionRow}>
            <Text style={styles.label}>Descripción:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editedPet.description}
                onChangeText={text =>
                  setEditedPet(prev => ({ ...prev, description: text }))
                }
                multiline
              />
            ) : (
              <Text style={styles.descriptionText}>{pet.description}</Text>
            )}
          </View>

          <View style={styles.descriptionRow}>
            <Text style={styles.label}>Contacto de emergencia:</Text>
            {isEditing ? (
              <TextInput
                style={styles.inputBelow}
                value={editedPet.emergencyContact}
                onChangeText={text =>
                  setEditedPet(prev => ({ ...prev, emergencyContact: text }))
                }
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.descriptionText}>{pet.emergencyContact}</Text>
            )}
          </View>
          <View style={styles.descriptionRow}>
            <Text style={styles.label}>Fecha de nacimiento:</Text>
            {isEditing ? (
              <>
                <TouchableOpacity
                  style={styles.selectorBelow}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.selectorText}>{editedPet.birthDate}</Text>
                  <Ionicons
                    name="calendar"
                    size={24}
                    color={YowPetTheme.text.subtleText}
                  />
                </TouchableOpacity>
                <CustomDatePicker
                  visible={showDatePicker}
                  date={date}
                  onClose={() => setShowDatePicker(false)}
                  onDateChange={onDateChange}
                  maximumDate={new Date()}
                />
              </>
            ) : (
              <Text style={styles.descriptionText}>{pet.birthDate}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Esterilizado:</Text>
            {isEditing ? (
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  editedPet.sterilized && styles.checkboxChecked,
                ]}
                onPress={() =>
                  setEditedPet(prev => ({
                    ...prev,
                    sterilized: !prev.sterilized,
                  }))
                }
              >
                <Text
                  style={[
                    styles.checkboxText,
                    editedPet.sterilized && styles.checkboxTextChecked,
                  ]}
                >
                  {editedPet.sterilized ? 'Sí' : 'No'}
                </Text>
              </TouchableOpacity>
            ) : (
              <Ionicons
                name={pet.sterilized ? 'checkmark-circle' : 'close-circle'}
                size={24}
                color={
                  pet.sterilized
                    ? YowPetTheme.status.successState
                    : YowPetTheme.status.errorState
                }
              />
            )}
          </View>
        </View>
      </ScrollView>

      <SelectModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        title="Seleccionar tipo de mascota"
        options={ANIMAL_CATEGORIES}
        onSelect={category =>
          setEditedPet(prev => ({ ...prev, animalCategory: category.id }))
        }
      />

      <SelectModal
        visible={showBreedModal}
        onClose={() => setShowBreedModal(false)}
        title="Seleccionar raza"
        options={getBreedOptions()}
        onSelect={breed =>
          setEditedPet(prev => ({ ...prev, breed: breed.name }))
        }
      />

      <SelectModal
        visible={showGenderModal}
        onClose={() => setShowGenderModal(false)}
        title="Seleccionar género"
        options={GENDERS}
        onSelect={gender =>
          setEditedPet(prev => ({ ...prev, gender: gender.id }))
        }
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 25,
    backgroundColor: YowPetTheme.brand.accent,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: YowPetTheme.brand.primary,
  },
  headerInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: YowPetTheme.brand.support,
    flex: 1,
    marginHorizontal: 16,
    padding: 4,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    margin: 5,
    backgroundColor: YowPetTheme.brand.white,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  petImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  editImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(2px)',
  },
  infoSection: {
    padding: 20,
    backgroundColor: YowPetTheme.brand.primary,
    borderRadius: 20,
    margin: 1,
    marginTop: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: YowPetTheme.brand.white,
  },
  descriptionRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: YowPetTheme.border.softBorder,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: YowPetTheme.brand.secondary,
    fontWeight: '500',
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: YowPetTheme.brand.white,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 16,
    color: YowPetTheme.brand.white,
    marginTop: 8,
  },
  input: {
    flex: 2,
    backgroundColor: YowPetTheme.brand.white,
    borderColor: YowPetTheme.brand.surface,
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    color: YowPetTheme.text.mainText,
    borderWidth: 1,
  },
  selector: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: YowPetTheme.brand.white,
    borderColor: YowPetTheme.brand.surface,
  },
  selectorText: {
    fontSize: 16,
    color: YowPetTheme.text.mainText,
  },
  checkbox: {
    flex: 2,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: YowPetTheme.brand.white,
    borderColor: YowPetTheme.brand.surface,
  },
  checkboxChecked: {
    backgroundColor: YowPetTheme.brand.surface,
    borderColor: YowPetTheme.brand.surface,
  },
  checkboxText: {
    fontSize: 16,
    color: YowPetTheme.brand.support,
    textAlign: 'center',
  },
  checkboxTextChecked: {
    color: YowPetTheme.brand.support,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: YowPetTheme.overlay.mediumOverlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: YowPetTheme.brand.primary,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: YowPetTheme.brand.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: YowPetTheme.brand.secondary,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  modalOptionText: {
    fontSize: 16,
    color: YowPetTheme.brand.white,
  },
  modalCloseButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  modalCloseText: {
    color: YowPetTheme.brand.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  inputBelow: {
    backgroundColor: YowPetTheme.background.inputField,
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    color: YowPetTheme.text.mainText,
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
    marginTop: 8,
  },
  selectorBelow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
    backgroundColor: YowPetTheme.brand.white,
    borderColor: YowPetTheme.brand.surface,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: YowPetTheme.brand.primary,
  },
});
