import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { educateService } from '../../services/educate/educateService';

const { width } = Dimensions.get('window');

export default function EducateScreen() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState('Fácil');
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const levels = ['Fácil', 'Medio', 'Difícil'];

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await educateService.getAllLessons();
        setLessons(data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const filteredLessons = lessons.filter(lesson => lesson.level === selectedLevel);

  if (loading) {
    return (
      <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
        <ActivityIndicator size="large" color={YowPetTheme.brand.primary} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Educa a tu mascota</Text>
        <Text style={styles.subtitle}>Selecciona el nivel de dificultad</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.filterWrapper}>
          <View style={styles.filterContainer}>
            {levels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.filterButton,
                  selectedLevel === level && styles.filterButtonSelected,
                ]}
                onPress={() => setSelectedLevel(level)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedLevel === level && styles.filterTextSelected,
                  ]}
                >
                  {level}
                </Text>
                {selectedLevel === level && (
                  <MaterialIcons
                    name="pets"
                    size={16}
                    color={YowPetTheme.brand.primary}
                    style={styles.petIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.videoGrid}>
            {filteredLessons.map((lesson, index) => (
              <TouchableOpacity
                key={index}
                style={styles.videoCard}
                activeOpacity={0.9}
                onPress={() =>
                  router.push({
                    pathname: '/(services)/educate/video',
                    params: {
                      title: lesson.title,
                      description: lesson.description,
                      difficulty: lesson.level,
                      instructionImages: lesson.instructionImages || [],
                      steps: lesson.steps || [],
                    },
                  })
                }
              >
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: lesson.thumbnail }}
                    style={styles.thumbnail}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle}>{lesson.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.bottomSpacer} />
        </ScrollView>
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
    borderRadius: 24,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: YowPetTheme.background.mainWhite,
    borderRadius: 24,
    marginTop: -20,
    paddingTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: YowPetTheme.background.mainWhite,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
  },
  filterWrapper: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: YowPetTheme.background.lightGray,
    borderRadius: 12,
    padding: 4,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonSelected: {
    backgroundColor: YowPetTheme.background.mainWhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterText: {
    color: YowPetTheme.text.secondaryText,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  filterTextSelected: {
    color: YowPetTheme.brand.primary,
  },
  petIcon: {
    marginLeft: 6,
  },
  videoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  videoCard: {
    width: width > 500 ? '48%' : '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: YowPetTheme.border.light,
  },
  imageWrapper: {
    width: '100%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: YowPetTheme.text.mainText,
    marginBottom: 8,
    textAlign: 'center',
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoLevel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: YowPetTheme.brand.primary,
    backgroundColor: YowPetTheme.brand.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  videoDuration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoDurationText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: YowPetTheme.text.secondaryText,
    marginLeft: 4,
  },
  bottomSpacer: {
    height: 20,
  },
});