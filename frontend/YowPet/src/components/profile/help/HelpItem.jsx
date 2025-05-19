import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';

export const HelpItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.helpItem} onPress={onPress}>
        <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={24} color={YowPetTheme.brand.primary} />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={YowPetTheme.text.subtleText} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    helpItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: YowPetTheme.background.mainWhite,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: YowPetTheme.border.softBorder,
        shadowColor: YowPetTheme.shadow.softShadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconContainer: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: YowPetTheme.background.softWarning,
        borderRadius: 24,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: YowPetTheme.text.mainText,
    },
    itemDescription: {
        fontSize: 14,
        color: YowPetTheme.text.subtleText,
        marginTop: 4,
    },
});