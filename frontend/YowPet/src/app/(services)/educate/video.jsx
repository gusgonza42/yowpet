import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { videoThumbnails } from '@/constants/videoImages';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function VideoDetailScreen() {
    const { title, description, difficulty } = useLocalSearchParams();

    const difficultyMap = {
        Fácil: 1,
        Medio: 3,
        Difícil: 5,
    };

    const difficultyLevel = difficultyMap[difficulty] || 3;

    return (
        <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>Nivel: {difficulty}</Text>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.videoContainer}>
                    <Image
                        source={videoThumbnails[title]}
                        style={styles.thumbnail}
                        resizeMode="cover"
                    />
                    <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
                        <View style={styles.playButtonCircle}>
                            <FontAwesome name="play" size={24} color={YowPetTheme.brand.primary} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.difficultyContainer}>
                    <Text style={styles.difficultyText}>Dificultad:</Text>
                    <View style={styles.starsContainer}>
                        {[...Array(5)].map((_, index) => (
                            <MaterialIcons
                                key={index}
                                name={index < difficultyLevel ? "star" : "star-border"}
                                size={28}
                                color={index < difficultyLevel ? '#FFD700' : '#DDD'}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.sectionTitle}>Descripción:</Text>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.startButton} activeOpacity={0.8}>
                    <Text style={styles.startButtonText}>Comenzar entrenamiento</Text>
                    <MaterialIcons name="pets" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 24,
        backgroundColor: YowPetTheme.brand.primary,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: YowPetTheme.background.mainWhite,
        borderRadius: 24,
        marginTop: -20,
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        fontFamily: 'Inter-Medium',
    },
    videoContainer: {
        width: '100%',
        height: width * 0.6,
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: -40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        backgroundColor: '#000',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        opacity: 0.9,
    },
    playButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButtonCircle: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    difficultyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 24,
        paddingHorizontal: 8,
    },
    difficultyText: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: YowPetTheme.text.mainText,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    descriptionContainer: {
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: YowPetTheme.text.mainText,
        marginBottom: 12,
    },
    descriptionBox: {
        backgroundColor: YowPetTheme.background.lightGray,
        padding: 20,
        borderRadius: 16,
    },
    description: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: YowPetTheme.text.mainText,
        lineHeight: 24,
    },
    startButton: {
        backgroundColor: YowPetTheme.brand.primary,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        shadowColor: YowPetTheme.brand.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    startButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        marginRight: 10,
    },
});