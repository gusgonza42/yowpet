import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';
import { useRouter } from 'expo-router';

export default function PrivacyScreen() {
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
                <Text style={styles.title}>Política de Privacidad</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.text}>
                    En YowPet, nos tomamos muy en serio la privacidad de tus datos.
                </Text>
                <Text style={styles.sectionTitle}>¿Qué datos recopilamos?</Text>
                <Text style={styles.text}>Recopilamos datos como tu nombre, correo electrónico y preferencias.</Text>
                <Text style={styles.sectionTitle}>¿Cómo protegemos tus datos?</Text>
                <Text style={styles.text}>Utilizamos encriptación avanzada para garantizar la seguridad de tu información.</Text>
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
});