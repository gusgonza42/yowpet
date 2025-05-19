import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';
import { useRouter } from 'expo-router';

export default function ComplaintScreen() {
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
                <Text style={styles.title}>Formulario de Quejas</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.text}>
                    Si tienes alguna queja o sugerencia, por favor, háznoslo saber.
                </Text>
                <Text style={styles.sectionTitle}>¿Cómo enviar una queja?</Text>
                <Text style={styles.text}>Puedes enviarnos tu queja a través de este formulario o contactarnos directamente.</Text>
                <Text style={styles.sectionTitle}>¿Qué sucede después?</Text>
                <Text style={styles.text}>Nuestro equipo revisará tu queja y se pondrá en contacto contigo en un plazo de 48 horas.</Text>
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