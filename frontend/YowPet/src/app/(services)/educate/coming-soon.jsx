import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { YowPetTheme } from '@theme/Colors';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ComingSoonScreen() {
    const router = useRouter();

    return (
        <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
            <View style={styles.headerContainer}>
                <Ionicons name="construct-outline" size={48} color={YowPetTheme.brand.accent} />
                <Text style={styles.title}>¡Próximamente!</Text>
                <Text style={styles.subtitle}>
                    Estamos trabajando para añadir contenido educativo para esta mascota.
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardText}>
                    Vuelve pronto para descubrir nuevas lecciones y videos educativos.
                </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        marginTop: 200,
        marginBottom: 28,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        color: YowPetTheme.text.invertedText,
        marginTop: 12,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: YowPetTheme.text.subtleText,
        fontFamily: 'Inter-Medium',
        textAlign: 'center',
        marginHorizontal: 20,
    },
    card: {
        backgroundColor: YowPetTheme.background.mainWhite,
        borderRadius: 16,
        padding: 28,
        marginHorizontal: 24,
        marginBottom: 32,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        alignItems: 'center',
    },
    cardText: {
        fontSize: 18,
        color: YowPetTheme.text.mainText,
        fontFamily: 'Inter-Regular',
        textAlign: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: YowPetTheme.brand.accent,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 12,
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.10,
        shadowRadius: 6,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
    },
});