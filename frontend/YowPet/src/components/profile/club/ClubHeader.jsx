import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';

export const ClubHeader = ({ onBack }) => (
    <View style={styles.header}>
        <Ionicons
            name="arrow-back"
            size={24}
            color={YowPetTheme.text.invertedText}
            onPress={onBack}
            style={styles.backButton}
        />
        <View>
            <Text style={styles.title}>YowPet Club</Text>
            <Text style={styles.subtitle}>Beneficios exclusivos para nuestros miembros</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: YowPetTheme.brand.primary,
    },
    backButton: {
        marginRight: 16,
        marginLeft: -24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: YowPetTheme.text.invertedText,
    },
    subtitle: {
        fontSize: 14,
        color: YowPetTheme.text.subtleText,
        marginTop: 4,
    },
});