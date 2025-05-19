import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { YowPetTheme } from '@theme/Colors';
import { HelpHeader } from '@components/profile/help/HelpHeader';
import { HelpItem } from '@components/profile/help/HelpItem';
import { AppFooter } from '@components/profile/AppFooter';

export default function HelpScreen() {
    const router = useRouter();
    const helpItems = [
        { id: 1, title: 'Preguntas Frecuentes', description: 'Resuelve tus dudas', icon: 'help-circle-outline', route: 'profile/help/faqs' },
        { id: 2, title: 'Términos y Condiciones', description: 'Consulta nuestros términos', icon: 'document-text-outline', route: 'profile/help/terms' },
        { id: 3, title: 'Política de Privacidad', description: 'Conoce cómo protegemos tus datos', icon: 'lock-closed-outline', route: 'profile/help/privacy' },
        { id: 4, title: 'Formulario de Quejas', description: 'Envía una queja', icon: 'clipboard-outline', route: 'profile/help/complaint' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <HelpHeader onBack={() => router.back()} />
            </View>
            <View style={styles.contentContainer}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {helpItems.map((item) => (
                        <HelpItem key={item.id} item={item} onPress={() => router.push(item.route)} />
                    ))}
                    <AppFooter version="1.0.0" />
                </ScrollView>
            </View>
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
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 32,
    },
});