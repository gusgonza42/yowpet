import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { YowPetTheme } from '@theme/Colors';
import { ClubHeader } from '@components/profile/club/ClubHeader';
import { ClubPlanItem } from '@components/profile/club/ClubPlanItem';

export default function ClubScreen() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = [
        {
            id: 1,
            title: 'Básico',
            price: '$4.99 / mes',
            icon: 'star-outline',
            description: 'Ideal para quienes quieren comenzar a disfrutar de beneficios exclusivos y soporte prioritario.',
            features: [
                'Acceso a contenido exclusivo',
                'Soporte prioritario por email',
                'Boletín mensual con novedades',
                'Descuentos en productos seleccionados',
            ],
        },
        {
            id: 2,
            title: 'Premium',
            price: '$9.99 / mes',
            icon: 'diamond-outline',
            description: 'Para los que buscan la experiencia completa YowPet Club, con ventajas y recompensas únicas.',
            features: [
                'Todas las ventajas del plan Básico',
                'Acceso anticipado a nuevas funciones',
                'Descuentos especiales en toda la tienda',
                'Insignia VIP en tu perfil',
                'Participación en sorteos exclusivos',
            ],
        },
    ];

    const handleSubscribe = (plan) => {
        setSelectedPlan(plan);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedPlan(null);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <ClubHeader onBack={() => router.back()} />
            </View>
            <View style={styles.contentContainer}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.intro}>
                        <Text style={{ fontWeight: 'bold', color: YowPetTheme.brand.primary }}>
                            ¡Únete a YowPet Club!
                        </Text>
                        {'\n'}
                        {'\n'}
                        Accede a <Text style={{ fontWeight: 'bold' }}>beneficios exclusivos</Text>, descuentos especiales y mucho más.
                        {'\n'}
                        {'\n'}
                        <Text style={{ color: YowPetTheme.text.mainText }}>
                            Elige el plan que mejor se adapte a ti y forma parte de nuestra <Text style={{ fontStyle: 'italic' }}>comunidad premium</Text>.
                        </Text>
                    </Text>
                    {plans.map((plan) => (
                        <ClubPlanItem
                            key={plan.id}
                            plan={plan}
                            onSubscribe={() => handleSubscribe(plan)}
                        />
                    ))}
                </ScrollView>
            </View>
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>¡Gracias por tu interés!</Text>
                        <Text style={styles.modalText}>
                            Pronto podrás suscribirte al plan <Text style={{ fontWeight: 'bold' }}>{selectedPlan?.title}</Text> y disfrutar de todos sus beneficios.
                        </Text>
                        <Text style={styles.modalSoon}>¡Pronto!</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                            <Text style={styles.modalButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: YowPetTheme.brand.primary,
    },
    headerContainer: {
        paddingBottom: 12,
        paddingHorizontal: 24,
        backgroundColor: YowPetTheme.brand.primary,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: YowPetTheme.background.softBackground,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 24,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    intro: {
        fontSize: 16,
        color: YowPetTheme.text.mainText,
        marginBottom: 24,
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: YowPetTheme.background.mainWhite,
        borderRadius: 16,
        padding: 28,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: YowPetTheme.brand.primary,
    },
    modalText: {
        fontSize: 16,
        color: YowPetTheme.text.mainText,
        marginBottom: 16,
        textAlign: 'center',
    },
    modalSoon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: YowPetTheme.brand.primary,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: YowPetTheme.brand.primary,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 32,
    },
    modalButtonText: {
        color: YowPetTheme.text.invertedText,
        fontWeight: 'bold',
        fontSize: 16,
    },
});