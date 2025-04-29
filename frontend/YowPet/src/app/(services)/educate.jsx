import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';

// Datos de videos organizados por nivel de dificultad
const videos = {
    Básico: [
        {
            title: 'Sentarse',
            thumbnailKey: 'sentarse',
            thumbnail: require('../../assets/educate/sentarse.jpg'),
            description: 'Enseña a tu mascota a sentarse.',
        },
        {
            title: 'Dar la pata',
            thumbnailKey: 'pata',
            thumbnail: require('../../assets/educate/pata.jpg'),
            description: 'Entrena a tu perro para dar la pata.',
        },
    ],
    Intermedio: [
        {
            title: 'Caminar con correa',
            thumbnailKey: 'correa',
            thumbnail: require('../../assets/educate/correa.jpg'),
            description: 'Camina sin tirones.',
        },
        {
            title: 'Quieto',
            thumbnailKey: 'quieto',
            thumbnail: require('../../assets/educate/quieto.jpg'),
            description: 'Mantén a tu perro quieto por comando.',
        },
    ],
    Avanzado: [
        {
            title: 'Buscar objeto',
            thumbnailKey: 'objeto',
            thumbnail: require('../../assets/educate/objeto.jpg'),
            description: 'Haz que encuentre un objeto.',
        },
        {
            title: 'Hacer un truco',
            thumbnailKey: 'truco',
            thumbnail: require('../../assets/educate/truco.jpg'),
            description: 'Un truco divertido y avanzado.',
        },
    ],
};

export default function EducateScreen() {
    const router = useRouter();

    return (
        <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
            <View style={styles.contentContainer}>
                {/* Título de la pantalla */}
                <Text style={styles.title}>Educa a tu mascota</Text>

                {/* Lista de videos agrupados por nivel */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {Object.entries(videos).map(([level, vids]) => (
                        <View key={level} style={styles.levelSection}>
                            {/* Título del nivel de dificultad */}
                            <Text style={styles.levelTitle}>{level}</Text>

                            <View style={styles.videoGrid}>
                                {vids.map((video, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.videoCard}
                                        activeOpacity={0.8}
                                        // Al hacer clic, se redirige a la pantalla de detalle con los parámetros
                                        onPress={() =>
                                            router.push({
                                                pathname: '/(services)/educate/video',
                                                params: {
                                                    title: video.title,
                                                    description: `Descripción: ${video.description}`,
                                                    difficulty: level,
                                                    thumbnailKey: video.thumbnailKey,
                                                },
                                            })
                                        }
                                    >
                                        {/* Imagen del video */}
                                        <Image
                                            source={video.thumbnail}
                                            style={styles.thumbnail}
                                            resizeMode="cover"
                                        />

                                        {/* Título del video */}
                                        <Text style={styles.videoTitle}>{video.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}

                    {/* Espacio inferior para evitar corte en el scroll */}
                    <View style={styles.bottomSpacer} />
                </ScrollView>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: YowPetTheme.background.mainWhite,
        borderRadius: 24,
        paddingTop: 30,
        marginTop: 10,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: YowPetTheme.text.mainText,
        textAlign: 'center',
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    levelSection: {
        marginBottom: 12,
    },
    levelTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: YowPetTheme.text.mainText,
        marginBottom: 12,
        paddingLeft: 12,
    },
    videoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    videoCard: {
        width: '48%',
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: YowPetTheme.brand.primary + '20',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    thumbnail: {
        width: '100%',
        height: 100,
    },
    videoTitle: {
        paddingVertical: 8,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: YowPetTheme.text.mainText,
    },
    bottomSpacer: {
        height: 20,
    },
});
