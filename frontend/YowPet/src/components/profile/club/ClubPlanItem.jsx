import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';

export const ClubPlanItem = ({ plan, onSubscribe }) => (
    <View style={styles.planItem}>
        <View style={styles.headerRow}>
            <Ionicons name={plan.icon} size={32} color={YowPetTheme.brand.primary} />
            <Text style={styles.planTitle}>{plan.title}</Text>
        </View>
        <Text style={styles.price}>{plan.price}</Text>
        <Text style={styles.description}>{plan.description}</Text>
        <View style={styles.features}>
            {plan.features.map((feature, idx) => (
                <View key={idx} style={styles.featureRow}>
                    <Ionicons name="checkmark-circle" size={18} color={YowPetTheme.brand.primary} />
                    <Text style={styles.featureText}>{feature}</Text>
                </View>
            ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={onSubscribe}>
            <Text style={styles.buttonText}>Suscribirse</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    planItem: {
        backgroundColor: YowPetTheme.background.mainWhite,
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: YowPetTheme.border.softBorder,
        shadowColor: YowPetTheme.shadow.softShadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    planTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 12,
        color: YowPetTheme.text.mainText,
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        color: YowPetTheme.brand.primary,
        marginBottom: 8,
    },
    description: {
        fontSize: 15,
        color: YowPetTheme.text.subtleText,
        marginBottom: 12,
    },
    features: {
        marginBottom: 16,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    featureText: {
        fontSize: 15,
        color: YowPetTheme.text.subtleText,
        marginLeft: 8,
    },
    button: {
        backgroundColor: YowPetTheme.brand.primary,
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: YowPetTheme.text.invertedText,
        fontWeight: 'bold',
        fontSize: 16,
    },
});