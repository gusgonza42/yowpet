import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';

export function HomeGreeting() {
    return (
        <View style={styles.headerContainer}>
            <Ionicons name="paw" size={40} color={YowPetTheme.brand.accent} style={{ marginBottom: 10 }} />
            <Text style={styles.title}>¡Bienvenido a YowPet!</Text>
            <Text style={styles.subtitle}>
                Tu espacio para cuidar, educar y disfrutar junto a tu mascota. Explora servicios, encuentra lugares pet-friendly, organiza tu día y gestiona tu perfil, todo en un solo lugar.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        paddingBottom: 30,
        paddingTop: 20,
        paddingHorizontal: 24,
        alignItems: 'center',
        backgroundColor: YowPetTheme.brand.primary,
        borderRadius: 24,
        marginBottom: 18,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        color: YowPetTheme.text.invertedText,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: YowPetTheme.text.subtleText,
        textAlign: 'center',
        fontFamily: 'Inter-Medium',
    },
});