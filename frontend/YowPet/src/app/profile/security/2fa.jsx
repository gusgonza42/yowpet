import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';
import { useRouter } from 'expo-router';

export default function TwoFAScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color={YowPetTheme.text.mainText}
                    onPress={() => router.back()}
                    style={styles.backButton}
                />
                <Text style={styles.title}>Autenticación en Dos Pasos</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.text}>
                    Añade una capa extra de seguridad a tu cuenta activando la autenticación en dos pasos (2FA).
                </Text>
                <Text style={styles.sectionTitle}>¿Qué es 2FA?</Text>
                <Text style={styles.sectionText}>
                    Es un método que requiere un segundo paso de verificación además de tu contraseña.
                </Text>
                <Text style={styles.sectionTitle}>¿Cómo funciona?</Text>
                <Text style={styles.sectionText}>
                    Pronto podrás configurar 2FA desde esta sección.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: YowPetTheme.background.softBackground,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: YowPetTheme.background.mainWhite,
        borderBottomWidth: 1,
        borderBottomColor: YowPetTheme.border.softBorder,
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: YowPetTheme.text.mainText,
    },
    content: {
        padding: 16,
    },
    text: {
        fontSize: 16,
        color: YowPetTheme.text.subtleText,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: YowPetTheme.text.mainText,
        marginTop: 16,
    },
    sectionText: {
        fontSize: 16,
        color: YowPetTheme.text.subtleText,
        marginTop: 8,
    },
});