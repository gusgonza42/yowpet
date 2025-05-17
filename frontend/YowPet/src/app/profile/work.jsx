import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import { useCaregiver } from '@/hooks/profile/cuidador/userCuidadorForm';

// Componente para la pantalla de activación
const ActivationScreen = ({ onActivate }) => (
  <View style={styles.activationContainer}>
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Ionicons name="paw" size={28} color={YowPetTheme.brand.primary} />
        <Text style={styles.cardTitle}>¡Conviértete en cuidador!</Text>
      </View>

      <View style={styles.imageContainer}>
        <Ionicons
          name="people"
          size={120}
          color={YowPetTheme.brand.primary}
          style={styles.placeholderImage}
        />
      </View>

      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>Beneficios:</Text>

        <View style={styles.benefitItem}>
          <Ionicons name="cash-outline" size={22} color={YowPetTheme.brand.primary} />
          <Text style={styles.benefitText}>Obtén ingresos haciendo lo que amas</Text>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="time-outline" size={22} color={YowPetTheme.brand.primary} />
          <Text style={styles.benefitText}>Horario flexible según tu disponibilidad</Text>
        </View>

        <View style={styles.benefitItem}>
          <Ionicons name="star-outline" size={22} color={YowPetTheme.brand.primary} />
          <Text style={styles.benefitText}>Conviértete en un cuidador destacado</Text>
        </View>
      </View>

      <Text style={styles.activationText}>
        Para comenzar a ofrecer tus servicios como cuidador de mascotas, activa tu perfil
      </Text>

      <TouchableOpacity
        style={styles.activateButton}
        onPress={onActivate}
      >
        <Text style={styles.activateButtonText}>ACTIVAR PERFIL</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

// Componente para el formulario de perfil con opciones mejoradas
const ProfileForm = ({ formData, setFormData, onSubmit, toggleService }) => {
  // Opciones predefinidas para cada campo
  const especialidades = ['Perros', 'Gatos', 'Aves', 'Roedores', 'Reptiles', 'Anfibios', 'Peces', 'Exóticos'];

  // Opciones de experiencia con rangos más realistas
  const experiencias = [
    { value: '0', label: 'Menos de 1 año' },
    { value: '1', label: '1 año' },
    { value: '2', label: '2 años' },
    { value: '3', label: '3 años' },
    { value: '5', label: '5+ años' },
    { value: '10', label: '10+ años' },
  ];

  // Opciones de tarifas con precios comunes y opciones de personalización
  const rangoPrecio = [
    { value: '8', label: '8€' },
    { value: '10', label: '10€' },
    { value: '12', label: '12€' },
    { value: '15', label: '15€' },
    { value: '20', label: '20€' },
    { value: 'custom', label: 'Editar' },
  ];

  // Estado para el precio personalizado
  const [precioPersonalizado, setPrecioPersonalizado] = React.useState('');
  // Estado para mostrar el campo de precio personalizado
  const [mostrarPrecioPersonalizado, setMostrarPrecioPersonalizado] = React.useState(false);

  // Efecto para verificar si ya tiene un precio personalizado
  React.useEffect(() => {
    if (formData.hourlyRate && !rangoPrecio.some(p => p.value === formData.hourlyRate)) {
      setPrecioPersonalizado(formData.hourlyRate);
      setMostrarPrecioPersonalizado(true);
    }
  }, []);

  // Función para manejar la selección de tarifa
  const seleccionarTarifa = (tarifa) => {
    if (tarifa === 'custom') {
      setMostrarPrecioPersonalizado(true);
      setFormData({ ...formData, hourlyRate: precioPersonalizado || '' });
    } else {
      setMostrarPrecioPersonalizado(false);
      setFormData({ ...formData, hourlyRate: tarifa });
    }
  };

  // Función para actualizar el precio personalizado
  const actualizarPrecioPersonalizado = (precio) => {
    setPrecioPersonalizado(precio);
    setFormData({ ...formData, hourlyRate: precio });
  };

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Qué servicios ofreces?</Text>
        <View style={styles.servicesGrid}>
          {['Paseo', 'Alojamiento', 'Guardería', 'Entrenamiento'].map(service => (
            <TouchableOpacity
              key={service}
              style={[
                styles.serviceItem,
                formData.services.includes(service) && styles.serviceSelected,
              ]}
              onPress={() => toggleService(service)}
            >
              <Text style={[
                styles.serviceText,
                formData.services.includes(service) && styles.serviceTextSelected,
              ]}>{service}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Especialidad</Text>
        <Text style={styles.sectionSubtitle}>¿Con qué tipo de mascotas tienes más experiencia?</Text>
        <View style={styles.optionsGrid}>
          {especialidades.map(especialidad => (
            <TouchableOpacity
              key={especialidad}
              style={[
                styles.optionItem,
                formData.speciality === especialidad && styles.optionSelected,
              ]}
              onPress={() => setFormData({ ...formData, speciality: especialidad })}
            >
              <Text style={[
                styles.optionText,
                formData.speciality === especialidad && styles.optionTextSelected,
              ]}>{especialidad}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Campo de texto para especialidad personalizada */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Otra especialidad</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe otra especialidad..."
            value={!especialidades.includes(formData.speciality) ? formData.speciality : ''}
            onChangeText={(text) => setFormData({ ...formData, speciality: text })}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experiencia</Text>
        <Text style={styles.sectionSubtitle}>¿Cuánta experiencia tienes cuidando mascotas?</Text>
        <View style={styles.experienceContainer}>
          {experiencias.map(exp => (
            <TouchableOpacity
              key={exp.value}
              style={[
                styles.experienceButton,
                formData.experience === exp.value && styles.optionSelected,
              ]}
              onPress={() => setFormData({ ...formData, experience: exp.value })}
            >
              <Text style={[
                styles.optionText,
                formData.experience === exp.value && styles.optionTextSelected,
              ]}>{exp.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tarifa por hora</Text>
        <Text style={styles.sectionSubtitle}>¿Cuánto cobras por hora de servicio?</Text>
        <View style={styles.priceContainer}>
          {rangoPrecio.map(precio => (
            <TouchableOpacity
              key={precio.value}
              style={[
                styles.priceButton,
                (formData.hourlyRate === precio.value ||
                  (precio.value === 'custom' && mostrarPrecioPersonalizado)) &&
                styles.optionSelected,
              ]}
              onPress={() => seleccionarTarifa(precio.value)}
            >
              <Text style={[
                styles.optionText,
                (formData.hourlyRate === precio.value ||
                  (precio.value === 'custom' && mostrarPrecioPersonalizado)) &&
                styles.optionTextSelected,
              ]}>{precio.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {mostrarPrecioPersonalizado && (
          <View style={styles.customPriceContainer}>
            <Text style={styles.label}>Tarifa personalizada (€/hora)</Text>
            <View style={styles.customPriceInputContainer}>
              <TextInput
                style={styles.customPriceInput}
                placeholder="Escribe tu tarifa"
                value={precioPersonalizado}
                onChangeText={actualizarPrecioPersonalizado}
                keyboardType="numeric"
              />
              <Text style={styles.currencySymbol}>€</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Cuéntanos sobre tu experiencia, por qué te gustan los animales, qué tipo de servicios te sientes más cómodo ofreciendo..."
          multiline
          numberOfLines={4}
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={onSubmit}
      >
        <Text style={styles.submitButtonText}>Guardar Información</Text>
      </TouchableOpacity>
    </>
  );
};
// Componente para mostrar el perfil completo
const CompletedProfile = ({ formData, onEdit, onDisable }) => {
  // Función para mostrar el texto de experiencia
  const textoExperiencia = () => {
    if (formData.experience === '0') {
      return 'Menos de 1 año';
    } else if (formData.experience === '1') {
      return '1 año';
    } else if (formData.experience === '5') {
      return '5+ años';
    } else if (formData.experience === '10') {
      return '10+ años';
    } else {
      return `${formData.experience} años`;
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileHeaderCard}>
        <Ionicons name="checkmark-circle" size={32} color={YowPetTheme.brand.primary} />
        <Text style={styles.profileHeaderTitle}>¡Perfil activo como cuidador!</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>Información profesional</Text>

        <View style={styles.infoRow}>
          <Ionicons name="ribbon-outline" size={22} color={YowPetTheme.brand.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Especialidad</Text>
            <Text style={styles.infoValue}>{formData.speciality}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={22} color={YowPetTheme.brand.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Experiencia</Text>
            <Text style={styles.infoValue}>{textoExperiencia()}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="cash-outline" size={22} color={YowPetTheme.brand.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Tarifa</Text>
            <Text style={styles.infoValue}>{formData.hourlyRate}€/hora</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="document-text-outline" size={22} color={YowPetTheme.brand.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Descripción</Text>
            <Text style={styles.infoValue}>{formData.description || 'Sin descripción'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>Servicios que ofreces</Text>
        <View style={styles.tagsContainer}>
          {formData.services.map(service => (
            <View key={service} style={styles.serviceTag}>
              <Text style={styles.serviceTagText}>{service}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={onEdit}
      >
        <Ionicons name="create-outline" size={20} color="white" />
        <Text style={styles.editButtonText}>Editar información</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.disableButton}
        onPress={onDisable}
      >
        <Ionicons name="close-circle-outline" size={20} color={YowPetTheme.text.errorText} />
        <Text style={styles.disableButtonText}>Dejar de ser cuidador</Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente para el modal de confirmación
const ConfirmModal = ({ visible, onCancel, onConfirm }) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Ionicons name="warning-outline" size={48} color={YowPetTheme.text.warningText} />
        <Text style={styles.modalTitle}>¿Estás seguro?</Text>
        <Text style={styles.modalText}>
          Si desactivas tu perfil de cuidador, dejarás de recibir solicitudes de servicio.
        </Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.confirmButton]}
            onPress={onConfirm}
          >
            <Text style={styles.confirmButtonText}>Desactivar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

// Componente principal
export default function WorkScreen() {
  const router = useRouter();
  const {
    loading,
    isActivated,
    profileComplete,
    formData,
    showConfirmModal,
    setShowConfirmModal,
    setFormData,
    handleActivateProfile,
    handleCreateProfile,
    handleDisableProfile,
    toggleService,
    editProfile,
  } = useCaregiver();

  if (loading) {
    return (
      <ScreenContainer>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={YowPetTheme.brand.primary} />
          <Text style={styles.loadingText}>Cargando perfil...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={YowPetTheme.text.mainText}
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>
          {isActivated ?
            (profileComplete ? 'Mi Perfil de Cuidador' : 'Completar Perfil de Cuidador') :
            'Activar Perfil de Cuidador'}
        </Text>
      </View>

      <ScrollView style={styles.container}>
        {!isActivated ? (
          <ActivationScreen onActivate={handleActivateProfile} />
        ) : profileComplete ? (
          <CompletedProfile
            formData={formData}
            onEdit={editProfile}
            onDisable={() => setShowConfirmModal(true)}
          />
        ) : (
          <ProfileForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleCreateProfile}
            toggleService={toggleService}
          />
        )}
      </ScrollView>

      <ConfirmModal
        visible={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={handleDisableProfile}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  // Aquí mantén todos los estilos existentes del archivo original
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: YowPetTheme.border.softBorder,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: YowPetTheme.text.mainText,
  },
  // ... (mantén todos los demás estilos del archivo original)
  activationContainer: {
    padding: 10,
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: YowPetTheme.text.mainText,
    marginLeft: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  placeholderImage: {
    backgroundColor: YowPetTheme.brand.softPrimary,
    padding: 20,
    borderRadius: 100,
    overflow: 'hidden',
  },
  benefitsContainer: {
    marginBottom: 20,
    backgroundColor: YowPetTheme.brand.softPrimary,
    borderRadius: 12,
    padding: 15,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: YowPetTheme.text.mainText,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 16,
    marginLeft: 10,
    color: YowPetTheme.text.mainText,
  },
  activationText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: YowPetTheme.text.mainText,
    lineHeight: 22,
  },
  activateButton: {
    backgroundColor: YowPetTheme.brand.primary,
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: YowPetTheme.text.mainText,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceItem: {
    width: '48%',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: YowPetTheme.brand.primary,
    alignItems: 'center',
  },
  serviceSelected: {
    backgroundColor: YowPetTheme.brand.primary,
  },
  serviceText: {
    color: YowPetTheme.brand.primary,
    fontWeight: 'bold',
  },
  serviceTextSelected: {
    color: 'white',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: YowPetTheme.text.mainText,
  },
  input: {
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: YowPetTheme.brand.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    padding: 10,
  },
  profileHeaderCard: {
    backgroundColor: '#f0ffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: YowPetTheme.text.mainText,
    marginLeft: 12,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: YowPetTheme.text.mainText,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: YowPetTheme.border.softBorder,
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'flex-start',
  },
  infoContent: {
    marginLeft: 10,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: YowPetTheme.text.secondaryText,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: YowPetTheme.text.mainText,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceTag: {
    backgroundColor: YowPetTheme.brand.softPrimary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  serviceTagText: {
    color: YowPetTheme.brand.primary,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: YowPetTheme.brand.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  disableButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: YowPetTheme.text.errorText,
    marginBottom: 32,
  },
  disableButtonText: {
    color: YowPetTheme.text.errorText,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: YowPetTheme.text.secondaryText,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
  },
  confirmButton: {
    backgroundColor: YowPetTheme.text.errorText,
  },
  cancelButtonText: {
    fontWeight: 'bold',
    color: YowPetTheme.text.mainText,
  },
  confirmButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  // Agregar a los estilos existentes
  sectionSubtitle: {
    fontSize: 14,
    color: YowPetTheme.text.secondaryText,
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  optionItem: {
    width: '31%',
    padding: 12,
    margin: '1%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: YowPetTheme.brand.primary,
    alignItems: 'center',
  },
  experienceItem: {
    width: '18%',
    padding: 12,
    margin: '1%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: YowPetTheme.brand.primary,
    alignItems: 'center',
  },
  tarifaItem: {
    width: '18%',
    padding: 12,
    margin: '1%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: YowPetTheme.brand.primary,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: YowPetTheme.brand.primary,
  },
  optionText: {
    color: YowPetTheme.brand.primary,
    fontWeight: 'bold',
  },
  optionTextSelected: {
    color: 'white',
  },

  // Agregar a los estilos existentes
  experienceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  experienceButton: {
    width: '48%',
    padding: 14,
    margin: '1%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: YowPetTheme.brand.primary,
    alignItems: 'center',
  },
  priceButton: {
    width: '31%',
    padding: 14,
    margin: '1%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: YowPetTheme.brand.primary,
    alignItems: 'center',
  },
  customPriceContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  customPriceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  customPriceInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  currencySymbol: {
    fontSize: 18,
    color: YowPetTheme.text.secondaryText,
    marginRight: 8,
  },
});