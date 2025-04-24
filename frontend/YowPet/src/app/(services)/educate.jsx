import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';

const videos = {
    Básico: [
        { title: 'Sentarse', thumbnail: require('../../assets/educate/sentarse.jpg') },
        { title: 'Dar la pata', thumbnail: require('../../assets/educate/pata.jpg') },
    ],
    Intermedio: [
        { title: 'Caminar con correa', thumbnail: require('../../assets/educate/correa.jpg') },
        { title: 'Quieto', thumbnail: require('../../assets/educate/quieto.jpg') },
    ],
    Avanzado: [
        { title: 'Buscar objeto', thumbnail: require('../../assets/educate/objeto.jpg') },
        { title: 'Hacer un truco', thumbnail: require('../../assets/educate/truco.jpg') },
    ],
};

export default function EducateScreen() {
    return (
        <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Educa a tu mascota</Text>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {Object.entries(videos).map(([level, vids]) => (
                        <View key={level} style={styles.levelSection}>
                            <Text style={styles.levelTitle}>{level}</Text>
                            <View style={styles.videoGrid}>
                                {vids.map((video, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.videoCard}
                                        activeOpacity={0.8}
                                    >
                                        <Image
                                            source={video.thumbnail}
                                            style={styles.thumbnail}
                                            resizeMode="cover"
                                        />
                                        <Text style={styles.videoTitle}>{video.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
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