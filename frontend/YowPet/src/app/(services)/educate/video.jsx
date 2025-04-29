import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { videoThumbnails } from '@/constants/videoImages';


export default function VideoDetailScreen() {
    // Obtener parámetros de la URL (título y descripción)
    const { title, description, difficulty } = useLocalSearchParams();

    const difficultyMap = {
        Básico: 1,
        Intermedio: 3,
        Avanzado: 5,
    };

    // Nivel de dificultad (valor de ejemplo: 3 estrellas)
    const difficultyLevel = difficultyMap[difficulty] || 3;

    return (
        <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{title}</Text>

                <View style={styles.videoContainer}>
                    <Image
                        source={videoThumbnails[title]}
                        style={styles.thumbnail}
                    />
                    <View style={styles.playButton}>
                        <FontAwesome name="play" size={32} color="white" />
                    </View>
                </View>

                <View style={styles.difficultyRow}>
                    <Text style={styles.difficultyText}>Dificultad: </Text>
                    {[...Array(5)].map((_, index) => (
                        <Text
                            key={index}
                            style={[
                                styles.star,
                                { color: index < difficultyLevel ? '#FFD700' : '#DDD' },
                            ]}
                        >
                            ★
                        </Text>
                    ))}
                </View>

                <View style={styles.descriptionBox}>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: YowPetTheme.background.mainWhite,
        borderRadius: 24,
        padding: 24,
        marginTop: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 20,
        color: YowPetTheme.text.mainText,
    },
    videoContainer: {
        position: 'relative',
        width: 200,
        height: 200,
        borderWidth: 0.5,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    playButton: {
        position: 'absolute',
        top: '40%',
        left: '40%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 50,
        padding: 10,
    },
    difficultyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },
    difficultyText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    star: {
        fontSize: 18,
        marginHorizontal: 2,
    },
    descriptionBox: {
        backgroundColor: '#A0B3FF',
        width: '100%',
        padding: 20,
        borderRadius: 16,
        borderWidth: 0.5,
        marginTop: 10,
    },
    description: {
        color: '#222',
        fontSize: 16,
        textAlign: 'start',
        marginBottom: 20,
    },
});
