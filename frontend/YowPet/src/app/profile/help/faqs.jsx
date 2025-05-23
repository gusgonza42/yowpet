import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';
import { useRouter } from 'expo-router';

export default function FAQsScreen() {
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
                <Text style={styles.title}>Preguntas Frecuentes</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.text}>
                    Aquí encontrarás respuestas a las preguntas más comunes sobre nuestros servicios.
                </Text>
                <Text style={styles.question}>¿Cómo puedo cambiar mi contraseña?</Text>
                <Text style={styles.answer}>Puedes cambiar tu contraseña desde la sección de seguridad en tu perfil.</Text>
                <Text style={styles.question}>¿Dónde puedo ver mis datos personales?</Text>
                <Text style={styles.answer}>Tus datos personales están disponibles en la sección "Mi Cuenta".</Text>
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
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        color: YowPetTheme.text.mainText,
        marginTop: 16,
    },
    answer: {
        fontSize: 16,
        color: YowPetTheme.text.subtleText,
        marginTop: 8,
    },
});