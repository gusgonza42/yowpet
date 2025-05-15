import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';

export const SecurityItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.securityItem} onPress={onPress}>
        <View style={styles.securityItemContent}>
            <Text style={styles.securityItemTitle}>{item.title}</Text>
            <Text style={styles.securityItemDescription}>{item.description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={YowPetTheme.text.subtleText} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    securityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: YowPetTheme.border.softBorder,
    },
    securityItemContent: {
        flex: 1,
    },
    securityItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: YowPetTheme.text.mainText,
    },
    securityItemDescription: {
        fontSize: 14,
        color: YowPetTheme.text.subtleText,
        marginTop: 4,
    },
});