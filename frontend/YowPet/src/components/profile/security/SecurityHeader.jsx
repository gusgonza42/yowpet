import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';

export const SecurityHeader = ({ onBack }) => (
    <View style={styles.header}>
        <Ionicons
            name="arrow-back"
            size={24}
            color={YowPetTheme.text.mainText}
            onPress={onBack}
            style={styles.backButton}
        />
        <Text style={styles.headerTitle}>Seguridad</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: YowPetTheme.border.softBorder,
        backgroundColor: YowPetTheme.background.mainWhite,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: YowPetTheme.text.mainText,
    },
});