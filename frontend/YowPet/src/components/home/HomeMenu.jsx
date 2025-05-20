import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';
import { useRouter } from 'expo-router';

export function HomeMenu() {
    const router = useRouter();
    const menu = [
        {
            label: 'Servicios',
            icon: <MaterialCommunityIcons name="apps" size={32} color={YowPetTheme.brand.accent} />,
            route: '/(tabs)/services',
        },
        {
            label: 'Mapa',
            icon: <MaterialCommunityIcons name="map-marker-radius" size={32} color={YowPetTheme.brand.accent} />,
            route: '/(tabs)/map',
        },
        {
            label: 'Planner',
            icon: <FontAwesome5 name="calendar-alt" size={28} color={YowPetTheme.brand.accent} />,
            route: '/(tabs)/planner',
        },
        {
            label: 'Perfil',
            icon: <Ionicons name="person-circle-outline" size={32} color={YowPetTheme.brand.accent} />,
            route: '/(tabs)/profile',
        },
    ];

    const rows = [menu.slice(0, 2), menu.slice(2, 4)];

    return (
        <View style={styles.menuGrid}>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.menuRow}>
                    {row.map((item) => (
                        <TouchableOpacity
                            key={item.label}
                            style={styles.menuButton}
                            activeOpacity={0.7}
                            onPress={() => router.push(item.route)}
                        >
                            <View style={styles.iconCircle}>{item.icon}</View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    menuGrid: {
        width: '100%',
        marginTop: 24,
        marginBottom: 24,
    },
    menuRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    menuButton: {
        width: '48%',
        borderRadius: 24,
        paddingVertical: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: YowPetTheme.background.cardBg,
        borderWidth: 0.5,
        borderColor: YowPetTheme.brand.primary,
        marginBottom: 0,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 0,
    },
    iconCircle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: YowPetTheme.background.mainWhite,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: YowPetTheme.brand.accent,
    },
    menuLabel: {
        fontSize: 17,
        color: YowPetTheme.text.mainText,
        fontFamily: 'Inter-SemiBold',
        textAlign: 'center',
        letterSpacing: 0.1,
    },
});