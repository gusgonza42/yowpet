import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { YowPetTheme } from '@theme/Colors';
import { SecurityHeader } from '@components/profile/security/SecurityHeader';
import { SecurityItem } from '@components/profile/security/SecurityItem';
import { AppFooter } from '@components/profile/AppFooter';

export default function SecurityScreen() {
    const router = useRouter();
    const securityItems = [
        { id: 1, title: 'Cambiar contraseña', description: 'Actualiza tu contraseña para mayor seguridad.', icon: 'key-outline', route: 'profile/security/change-password' },
        { id: 2, title: 'Autenticación en dos pasos', description: 'Configura la autenticación en dos pasos.', icon: 'shield-checkmark-outline', route: 'profile/security/2fa' },
        { id: 3, title: 'Dispositivos conectados', description: 'Administra los dispositivos conectados a tu cuenta.', icon: 'phone-portrait-outline', route: 'profile/security/devices' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <SecurityHeader onBack={() => router.back()} />
            </View>
            <View style={styles.contentContainer}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {securityItems.map((item) => (
                        <SecurityItem key={item.id} item={item} onPress={() => router.push(item.route)} />
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