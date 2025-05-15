import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

export const SecurityActions = () => (
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Configurar autenticación</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Cerrar todas las sesiones</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 20,
        marginBottom: 32,
        paddingHorizontal: 16,
        gap: 12,
    },
    actionButton: {
        backgroundColor: YowPetTheme.brand.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 3,
    },
    actionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});