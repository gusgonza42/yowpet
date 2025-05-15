import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { YowPetTheme } from '@theme/Colors';
import { SecurityHeader } from '@components/profile/security/SecurityHeader';
import { SecurityItem } from '@components/profile/security/SecurityItem';
import { SecurityActions } from '@components/profile/security/SecurityActions';

export default function SecurityScreen() {
    const router = useRouter();

    const securityItems = [
        { id: 1, title: 'Cambiar contraseña', description: 'Actualiza tu contraseña para mayor seguridad.' },
        { id: 2, title: 'Autenticación en dos pasos', description: 'Configura la autenticación en dos pasos.' },
        { id: 3, title: 'Dispositivos conectados', description: 'Administra los dispositivos conectados a tu cuenta.' },
    ];

    const handleItemPress = (item) => {
        alert(`Seleccionaste: ${item.title}`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainContainer}>
                <SecurityHeader onBack={() => router.back()} />
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {securityItems.map((item) => (
                        <SecurityItem key={item.id} item={item} onPress={() => handleItemPress(item)} />
                    ))}
                </ScrollView>
                <SecurityActions />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: YowPetTheme.background.mainWhite,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: YowPetTheme.background.softBackground,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: YowPetTheme.background.mainWhite,
    },
    scrollContent: {
        padding: 16,
    },
});