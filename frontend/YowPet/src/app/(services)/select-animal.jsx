import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { YowPetTheme } from '@theme/Colors';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { Ionicons } from '@expo/vector-icons';
import {BackButton} from "@components/global/BackButton";

const { width } = Dimensions.get('window');

const animals = [
    { key: 'dog', label: 'Perro', image: require('../../assets/animals/dog.png') },
    { key: 'cat', label: 'Gato', image: require('../../assets/animals/cat.png') },
    { key: 'parrot', label: 'Loro', image: require('../../assets/animals/parrot.png') },
    { key: 'hamster', label: 'Hámster', image: require('../../assets/animals/hamster.png') },
    { key: 'rabbit', label: 'Conejo', image: require('../../assets/animals/rabbit.png') },
    { key: 'other', label: 'Otro', image: require('../../assets/animals/other.png') },
];

export default function SelectAnimalScreen() {
    const router = useRouter();

    const handleSelect = (key) => {
        if (key === 'dog') {
            router.push('/(services)/educate');
        } else {
            router.push('/(services)/educate/coming-soon');
        }
    };

    return (
        <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
            <BackButton />
            <View style={styles.headerContainer}>
                <Ionicons name="paw" size={40} color={YowPetTheme.brand.accent} style={{ marginBottom: 10 }} />
                <Text style={styles.title}>Elige tu mascota</Text>
                <Text style={styles.subtitle}>Selecciona el animal para ver el contenido educativo</Text>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.grid}>
                    {animals.map((animal) => (
                        <TouchableOpacity
                            key={animal.key}
                            style={styles.animalCard}
                            onPress={() => handleSelect(animal.key)}
                            activeOpacity={0.85}
                        >
                            <Image source={animal.image} style={styles.animalImage} />
                            <Text style={styles.animalLabel}>{animal.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingBottom: 30,
        paddingHorizontal: 24,
        alignItems: 'center',
        backgroundColor: YowPetTheme.brand.primary,
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
        fontFamily: 'Inter-Medium',
        textAlign: 'center',
        marginBottom: 10,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: YowPetTheme.background.softWarning,
        borderRadius: 24,
        paddingTop: 24,
        paddingHorizontal: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    animalCard: {
        width: width > 500 ? '30%' : '46%',
        aspectRatio: 0.85,
        backgroundColor: YowPetTheme.background.mainWhite,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: YowPetTheme.border.softBorder,
    },
    animalImage: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    animalLabel: {
        fontSize: 16,
        color: YowPetTheme.text.mainText,
        fontFamily: 'Inter-SemiBold',
        textAlign: 'center',
    },
});