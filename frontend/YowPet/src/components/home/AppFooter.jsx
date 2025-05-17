import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

export function AppFooter() {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 YowPet · Hecho con ❤️ para ti y tu mascota</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 18,
        marginBottom: 8,
    },
    footerText: {
        fontSize: 13,
        color: YowPetTheme.text.subtleText,
        fontFamily: 'Inter-Regular',
        textAlign: 'center',
    },
});