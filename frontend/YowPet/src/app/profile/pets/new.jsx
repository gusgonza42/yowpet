import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { YowPetTheme } from '@theme/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

const ANIMAL_CATEGORIES = [
  { id: 1, name: 'Perro' },
  { id: 2, name: 'Gato' },
  { id: 3, name: 'Ave' },
  {
    id: 8,
    name: 'Tortuga',
  },
  { id: 4, name: 'Reptil' },
  { id: 5, name: 'Roedor' },
  { id: 6, name: 'Pez' },
  { id: 7, name: 'Anfibio' },
  {
    id: 0,
    name: 'Otro',
  },
];

const DOG_BREEDS = [
  { id: 1, name: 'Labrador' },
  { id: 2, name: 'Pastor Alemán' },
  {
    id: 3,
    name: 'Golden Retriever',
  },
  { id: 4, name: 'Bulldog' },
  { id: 5, name: 'Chihuahua' },
  { id: 0, name: 'Otro' },
];
const BIRD_BREEDS = [
  { id: 1, name: 'Periquito' },
  { id: 2, name: 'Canario' },
  { id: 3, name: 'Agapornis' },
  {
    id: 4,
    name: 'Cotorra',
  },
  { id: 5, name: 'Cacatúa' },
  { id: 6, name: 'Perico Australiano' },
  { id: 7, name: 'Loro Gris Africano' },
  {
    id: 8,
    name: 'Ninfas',
  },
  { id: 0, name: 'Otro' },
];

const CAT_BREEDS = [
  { id: 1, name: 'Siamés' },
  { id: 2, name: 'Persa' },
  { id: 3, name: 'Maine Coon' },
  {
    id: 4,
    name: 'Angora',
  },
  { id: 5, name: 'Bengal' },
  { id: 0, name: 'Otro' },
];

const GENDERS = [
  { id: 'male', name: 'Macho' },
  { id: 'female', name: 'Hembra' },
];

export default function NewPetScreen() {
  const router = useRouter();
  const [petData, setPetData] = useState({
    name: '',
    animalCategory: '',
    customCategory: '',
    breed: '',
    customBreed: '',
    birthDate: '',
    gender: '',
    sterilized: false,
    description: '',
    emergencyContact: '',
    profilePicture: null,
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBreedModal, setShowBreedModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState({
    name: '',
    animalCategory: '',
    gender: '',
    birthDate: '',
  });

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
    if (petData.animalCategory === 1) return DOG_BREEDS;
    if (petData.animalCategory === 2) return CAT_BREEDS;
    if (petData.animalCategory === 3) return BIRD_BREEDS;
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
      setPetData(prev => ({ ...prev, profilePicture: result.assets[0].uri }));
    }
  };

  const handleSubmit = async () => {
    // Reiniciar errores
    setErrors({
      name: '',
      animalCategory: '',
      gender: '',
      birthDate: '',
    });

    let hasErrors = false;
    const newErrors = { ...errors };

    // Validar campos obligatorios
    if (!petData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
      hasErrors = true;
    }

    if (!petData.animalCategory) {
      newErrors.animalCategory = 'Debes seleccionar un tipo de mascota';
      hasErrors = true;
    }

    if (!petData.gender) {
      newErrors.gender = 'Debes seleccionar un género';
      hasErrors = true;
    }

    if (!petData.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es obligatoria';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      name: petData.name,
      ownerId: 2,
      status: 1,
      animalCategory:
        petData.animalCategory === 0
          ? petData.customCategory
          : petData.animalCategory,
      breed: petData.breed === 0 ? petData.customBreed : petData.breed,
      birthDate: petData.birthDate,
      gender: petData.gender,
      sterilized: petData.sterilized ? 1 : 0,
      sterilizedAsInt: petData.sterilized ? 1 : 0,
      description: petData.description,
      emergencyContact: petData.emergencyContact,
      profilePicture: petData.profilePicture,
    };

    console.log(formData);
    router.back();
  };
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);

    // Formatear la fecha como YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split('T')[0];
    setPetData(prev => ({ ...prev, birthDate: formattedDate }));
  };
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
          <Text style={styles.headerTitle}>Nueva Mascota</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
            {petData.profilePicture ? (
              <Image
                source={{ uri: petData.profilePicture }}
                style={styles.previewImage}
              />
            ) : (
              <Ionicons
                name="camera"
                size={40}
                color={YowPetTheme.text.softText}
              />
            )}
          </TouchableOpacity>

          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Nombre de la mascota *"
            placeholderTextColor={YowPetTheme.text.subtleText}
            value={petData.name}
            onChangeText={text => setPetData(prev => ({ ...prev, name: text }))}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <TouchableOpacity
            style={[
              styles.selector,
              errors.animalCategory && styles.inputError,
            ]}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={styles.selectorText}>
              {petData.animalCategory
                ? ANIMAL_CATEGORIES.find(c => c.id === petData.animalCategory)
                ?.name || 'Seleccionar tipo de mascota *'
                : 'Seleccionar tipo de mascota *'}
            </Text>
            <Ionicons
              name="chevron-down"
              size={24}
              color={YowPetTheme.text.subtleText}
            />
          </TouchableOpacity>
          {errors.animalCategory && (
            <Text style={styles.errorText}>{errors.animalCategory}</Text>
          )}

          {petData.animalCategory === 0 && (
            <TextInput
              style={styles.input}
              placeholder="Especifica el tipo de mascota"
              placeholderTextColor={YowPetTheme.text.subtleText}
              value={petData.customCategory}
              onChangeText={text =>
                setPetData(prev => ({ ...prev, customCategory: text }))
              }
            />
          )}

          {petData.animalCategory !== '' && petData.animalCategory !== 0 && (
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setShowBreedModal(true)}
            >
              <Text style={styles.selectorText}>
                {petData.breed
                  ? getBreedOptions().find(b => b.id === petData.breed)?.name ||
                  'Seleccionar raza'
                  : 'Seleccionar raza'}
              </Text>
              <Ionicons
                name="chevron-down"
                size={24}
                color={YowPetTheme.text.subtleText}
              />
            </TouchableOpacity>
          )}

          {petData.breed === 0 && (
            <TextInput
              style={styles.input}
              placeholder="Especifica la raza"
              placeholderTextColor={YowPetTheme.text.subtleText}
              value={petData.customBreed}
              onChangeText={text =>
                setPetData(prev => ({ ...prev, customBreed: text }))
              }
            />
          )}

          <TouchableOpacity
            style={[styles.selector, errors.gender && styles.inputError]}
            onPress={() => setShowGenderModal(true)}
          >
            <Text style={styles.selectorText}>
              {petData.gender
                ? GENDERS.find(g => g.id === petData.gender)?.name
                : 'Seleccionar género *'}
            </Text>
            <Ionicons
              name="chevron-down"
              size={24}
              color={YowPetTheme.text.subtleText}
            />
          </TouchableOpacity>
          {errors.gender && (
            <Text style={styles.errorText}>{errors.gender}</Text>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descripción"
              placeholderTextColor={YowPetTheme.text.subtleText}
              value={petData.description}
              multiline
              numberOfLines={4}
              onChangeText={text =>
                setPetData(prev => ({ ...prev, description: text }))
              }
            />
            {Keyboard.isVisible() && (
              <TouchableOpacity
                style={styles.keyboardDismiss}
                onPress={() => Keyboard.dismiss()}
              >
                <Ionicons
                  name="chevron-down"
                  size={24}
                  color={YowPetTheme.text.subtleText}
                />
              </TouchableOpacity>
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Teléfono de emergencia"
            placeholderTextColor={YowPetTheme.text.subtleText}
            value={petData.emergencyContact}
            onChangeText={text =>
              setPetData(prev => ({ ...prev, emergencyContact: text }))
            }
            keyboardType="phone-pad"
            maxLength={15}
          />

          {/* Selector de fecha */}
          <TouchableOpacity
            style={[styles.selector, errors.birthDate && styles.inputError]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.selectorText}>
              {petData.birthDate
                ? petData.birthDate
                : 'Seleccionar fecha de nacimiento *'}
            </Text>
            <Ionicons
              name="calendar"
              size={24}
              color={YowPetTheme.text.subtleText}
            />
          </TouchableOpacity>
          {errors.birthDate && (
            <Text style={styles.errorText}>{errors.birthDate}</Text>
          )}

          {/* Date Picker para Android */}
          {Platform.OS === 'android' && showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (event.type === 'set' && selectedDate) {
                  onDateChange(event, selectedDate);
                }
              }}
              maximumDate={new Date()}
            />
          )}

          {/* Date Picker para iOS */}
          {Platform.OS === 'ios' && showDatePicker && (
            <View style={styles.iosDatePickerContainer}>
              <View style={styles.iosDatePickerHeader}>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.iosDatePickerButton}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onDateChange(null, date);
                    setShowDatePicker(false);
                  }}
                >
                  <Text style={styles.iosDatePickerButton}>Aceptar</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                }}
                maximumDate={new Date()}
                textColor={YowPetTheme.text.mainText}
                style={styles.iosDatePicker}
              />
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.checkbox,
              petData.sterilized && styles.checkboxChecked,
            ]}
            onPress={() =>
              setPetData(prev => ({ ...prev, sterilized: !prev.sterilized }))
            }
          >
            <Text
              style={[
                styles.checkboxText,
                petData.sterilized && styles.checkboxTextChecked,
              ]}
            >
              Esterilizado: {petData.sterilized ? 'Sí' : 'No'}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Guardar Mascota</Text>
        </TouchableOpacity>

        <SelectModal
          visible={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          title="Seleccionar tipo de mascota"
          options={ANIMAL_CATEGORIES}
          onSelect={category =>
            setPetData(prev => ({ ...prev, animalCategory: category.id }))
          }
        />

        <SelectModal
          visible={showBreedModal}
          onClose={() => setShowBreedModal(false)}
          title="Seleccionar raza"
          options={getBreedOptions()}
          onSelect={breed => setPetData(prev => ({ ...prev, breed: breed.id }))}
        />

        <SelectModal
          visible={showGenderModal}
          onClose={() => setShowGenderModal(false)}
          title="Seleccionar género"
          options={GENDERS}
          onSelect={gender =>
            setPetData(prev => ({ ...prev, gender: gender.id }))
          }
        />
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
    backgroundColor: YowPetTheme.brand.primary,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  imageUpload: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: YowPetTheme.surface.medium,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  input: {
    backgroundColor: YowPetTheme.background.inputField,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    color: YowPetTheme.text.mainText,
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
  },
  saveButton: {
    backgroundColor: YowPetTheme.brand.orange,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: YowPetTheme.brand.support,
    fontSize: 16,
    fontWeight: '600',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: YowPetTheme.background.inputField,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
  },
  checkboxChecked: {
    backgroundColor: YowPetTheme.brand.primary,
  },
  checkboxText: {
    fontSize: 16,
    color: YowPetTheme.text.mainText,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: YowPetTheme.overlay.mediumOverlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: YowPetTheme.background.mainWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: YowPetTheme.text.mainText,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: YowPetTheme.border.softBorder,
  },
  modalOptionText: {
    fontSize: 16,
    color: YowPetTheme.text.mainText,
  },
  modalCloseButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  modalCloseText: {
    color: YowPetTheme.brand.orange,
    fontSize: 16,
    fontWeight: '600',
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: YowPetTheme.background.inputField,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
  },
  selectorText: {
    fontSize: 16,
    color: YowPetTheme.text.mainText,
  },
  checkboxTextChecked: {
    color: YowPetTheme.text.invertedText,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  keyboardDismiss: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    padding: 8,
    backgroundColor: YowPetTheme.background.mainWhite,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iosDatePickerContainer: {
    backgroundColor: YowPetTheme.background.mainWhite,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
    overflow: 'hidden',
  },
  iosDatePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: YowPetTheme.background.inputField,
    borderBottomWidth: 1,
    borderBottomColor: YowPetTheme.border.softBorder,
  },
  iosDatePickerButton: {
    color: YowPetTheme.brand.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  iosDatePicker: {
    height: 200,
    width: '100%',
  },
  inputError: {
    borderColor: YowPetTheme.brand.error || '#ff0000',
  },
  errorText: {
    color: YowPetTheme.brand.error || '#ff0000',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
    marginLeft: 4,
  },
});
