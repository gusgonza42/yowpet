import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { YowPetTheme } from '@theme/Colors';

const PAYMENT_OPTIONS = [
  { id: 'card', name: 'Tarjeta', icon: 'credit-card-outline' },
  { id: 'paypal', name: 'PayPal', icon: 'credit-card-plus-outline' },
  { id: 'visa', name: 'Visa', icon: 'credit-card-scan-outline' },
  { id: 'manual', name: 'A mano', icon: 'hand-extended' },
];

export default function PaymentScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (user?.payment) {
      setSelectedPaymentType(user.payment);
    }

    const timer = setTimeout(() => {
      if (selectedPaymentType) {
        setPaymentMethods([
          {
            id: 1,
            type: selectedPaymentType,
            brand:
              selectedPaymentType === 'visa'
                ? 'visa'
                : selectedPaymentType === 'paypal'
                  ? 'paypal'
                  : selectedPaymentType === 'manual'
                    ? 'manual'
                    : 'credit',
            lastDigits: '4321',
            isDefault: true,
            expDate: '05/27',
          },
        ]);
      } else {
        setPaymentMethods([]);
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedPaymentType, user]);

  const handleSelectPaymentType = type => {
    setIsLoading(true);
    setSelectedPaymentType(type);
  };

  const handleAddPaymentMethod = () => {
    if (!selectedPaymentType) {
      Alert.alert(
        'Selecciona un método',
        'Primero selecciona un método de pago'
      );
      return;
    }
    setModalMessage(
      'Próximamente podrás añadir detalles para este método de pago'
    );
    setShowComingSoonModal(true);
  };

  const handleEditPaymentMethod = id => {
    setModalMessage('Próximamente podrás editar este método de pago');
    setShowComingSoonModal(true);
  };

  const handleDeletePaymentMethod = id => {
    setModalMessage('Próximamente podrás eliminar este método de pago');
    setShowComingSoonModal(true);
  };

  const handleSetDefaultPaymentMethod = id => {
    setModalMessage(
      'Próximamente podrás establecer un método de pago predeterminado'
    );
    setShowComingSoonModal(true);
  };

  const getCardLogo = brand => {
    switch (brand) {
      case 'visa':
        return (
          <MaterialCommunityIcons
            name="credit-card"
            size={32}
            color={YowPetTheme.brand.primary}
          />
        );
      case 'paypal':
        return (
          <MaterialCommunityIcons name="paypal" size={32} color="#003087" />
        );
      case 'manual':
        return (
          <MaterialCommunityIcons
            name="hand-coin"
            size={32}
            color={YowPetTheme.brand.primary}
          />
        );
      default:
        return (
          <MaterialCommunityIcons
            name="credit-card-outline"
            size={32}
            color={YowPetTheme.text.mainText}
          />
        );
    }
  };

  const renderPaymentMethod = ({ item }) => (
    <View
      style={[
        styles.paymentCard,
        { backgroundColor: item.isDefault ? '#EBE9FC' : '#f9f9f9' },
      ]}
    >
      <View style={styles.paymentCardHeader}>
        {getCardLogo(item.brand)}
        <View style={styles.paymentCardInfo}>
          <Text style={styles.cardBrand}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Text>
          {item.type !== 'manual' ? (
            <>
              <Text style={styles.cardNumber}>
                •••• •••• •••• {item.lastDigits}
              </Text>
              <Text style={styles.expDate}>Exp: {item.expDate}</Text>
            </>
          ) : (
            <Text style={styles.cardNumber}>Pago en efectivo</Text>
          )}
        </View>
        {item.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Predeterminado</Text>
          </View>
        )}
      </View>

      <View style={styles.divider} />

      <View style={styles.paymentCardActions}>
        {!item.isDefault && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleSetDefaultPaymentMethod(item.id)}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={18}
              color={YowPetTheme.brand.primary}
            />
            <Text style={styles.actionButtonText}>Predeterminado</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditPaymentMethod(item.id)}
        >
          <MaterialIcons
            name="edit"
            size={18}
            color={YowPetTheme.brand.primary}
          />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeletePaymentMethod(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#FF4842" />
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPaymentOption = option => {
    const isSelected = selectedPaymentType === option.id;
    return (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.paymentOption,
          isSelected && styles.paymentOptionSelected,
          { width: dimensions.width > 600 ? '22%' : '22%' },
        ]}
        onPress={() => handleSelectPaymentType(option.id)}
      >
        <MaterialCommunityIcons
          name={option.icon}
          size={28}
          color={
            isSelected
              ? YowPetTheme.background.mainWhite
              : YowPetTheme.brand.primary
          }
        />
        <Text
          style={[
            styles.paymentOptionText,
            isSelected && styles.paymentOptionTextSelected,
          ]}
        >
          {option.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={YowPetTheme.text.mainText}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Métodos de pago</Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.paymentOptionsContainer,
            {
              justifyContent:
                dimensions.width > 600 ? 'center' : 'space-between',
            },
          ]}
        >
          {PAYMENT_OPTIONS.map(renderPaymentOption)}
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <MaterialIcons
              name="hourglass-empty"
              size={40}
              color={YowPetTheme.brand.primary}
            />
            <Text style={styles.loadingText}>Cargando métodos de pago...</Text>
          </View>
        ) : selectedPaymentType && paymentMethods.length > 0 ? (
          <View style={styles.paymentMethodsContainer}>
            {paymentMethods.map(method => (
              <View key={method.id.toString()}>
                {renderPaymentMethod({ item: method })}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons
              name="payment"
              size={64}
              color={YowPetTheme.text.secondaryText}
            />
            <Text style={styles.emptyStateTitle}>
              {selectedPaymentType
                ? 'No hay métodos de pago configurados'
                : 'Selecciona un método de pago'}
            </Text>
            <Text style={styles.emptyStateText}>
              {selectedPaymentType
                ? 'Añade una forma de pago para facilitar tus transacciones'
                : 'Elige uno de los métodos de pago disponibles arriba'}
            </Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.addButton,
          !selectedPaymentType && styles.addButtonDisabled,
          { bottom: dimensions.height < 700 ? 16 : 24 },
        ]}
        onPress={handleAddPaymentMethod}
      >
        <Ionicons
          name="add-circle"
          size={24}
          color={YowPetTheme.background.mainWhite}
        />
        <Text style={styles.addButtonText}>
          {selectedPaymentType
            ? `Añadir datos de ${PAYMENT_OPTIONS.find(opt => opt.id === selectedPaymentType)?.name}`
            : 'Selecciona un método primero'}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showComingSoonModal}
        onRequestClose={() => setShowComingSoonModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { width: dimensions.width > 600 ? '60%' : '80%' },
            ]}
          >
            <MaterialIcons
              name="work"
              size={48}
              color={YowPetTheme.brand.primary}
            />
            <Text style={styles.modalTitle}>Próximamente</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowComingSoonModal(false)}
            >
              <Text style={styles.modalButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 34,
    backgroundColor: YowPetTheme.background.mainWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: YowPetTheme.border.softBorder,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  container: {
    flex: 1,
  },
  paymentOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
  },
  paymentMethodsContainer: {
    padding: 16,
  },
  paymentOption: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
    backgroundColor: '#f9f9f9',
  },
  paymentOptionSelected: {
    backgroundColor: YowPetTheme.brand.primary,
    borderColor: YowPetTheme.brand.primary,
  },
  paymentOptionText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: YowPetTheme.brand.primary,
  },
  paymentOptionTextSelected: {
    color: YowPetTheme.background.mainWhite,
  },
  paymentCard: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
  },
  paymentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentCardInfo: {
    marginLeft: 12,
    flex: 1,
  },
  cardBrand: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardNumber: {
    fontSize: 14,
    color: YowPetTheme.text.secondaryText,
  },
  expDate: {
    fontSize: 12,
    color: YowPetTheme.text.secondaryText,
    marginTop: 2,
  },
  defaultBadge: {
    backgroundColor: YowPetTheme.brand.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  defaultText: {
    color: YowPetTheme.background.mainWhite,
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: YowPetTheme.border.softBorder,
    marginVertical: 12,
  },
  paymentCardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionButtonText: {
    color: YowPetTheme.brand.primary,
    fontSize: 14,
    marginLeft: 4,
  },
  deleteButton: {
    marginLeft: 12,
  },
  deleteButtonText: {
    color: '#FF4842',
    fontSize: 14,
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: YowPetTheme.text.secondaryText,
    marginTop: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '20%',
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: YowPetTheme.text.mainText,
    marginTop: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: YowPetTheme.text.secondaryText,
    marginTop: 8,
    textAlign: 'center',
    maxWidth: '80%',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: YowPetTheme.brand.primary,
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
  addButtonDisabled: {
    backgroundColor: '#BEBEBE',
  },
  addButtonText: {
    color: YowPetTheme.background.mainWhite,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: YowPetTheme.background.mainWhite,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: YowPetTheme.text.mainText,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: YowPetTheme.text.secondaryText,
  },
  modalButton: {
    backgroundColor: YowPetTheme.brand.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: {
    color: YowPetTheme.background.mainWhite,
    fontWeight: '600',
    fontSize: 16,
  },
});
