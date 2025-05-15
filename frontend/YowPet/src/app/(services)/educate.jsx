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
import { BackButton } from '@components/global/BackButton';

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
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={YowPetTheme.brand.accent} />
          </View>
        </ScreenContainer>
    );
  }

  return (
      <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
        <BackButton />
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
                        <View style={styles.iconContainer}>
                          {Array.from({ length: levels.indexOf(level) + 1 }).map((_, index) => (
                              <MaterialIcons
                                  key={index}
                                  name="pets"
                                  size={16}
                                  color={YowPetTheme.brand.primary}
                                  style={styles.petIcon}
                              />
                          ))}
                        </View>
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
    paddingBottom: 30,
    paddingHorizontal: 24,
    backgroundColor: YowPetTheme.brand.primary,
    borderRadius: 24,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: YowPetTheme.background.softBackground,
    borderRadius: 24,
    paddingTop: 10,
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
    color: YowPetTheme.text.invertedText,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: YowPetTheme.text.subtleText,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
  },
  filterWrapper: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: YowPetTheme.background.softBackground,
    borderRadius: 12,
    padding: 4,
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonSelected: {
    backgroundColor: YowPetTheme.background.softSuccess,
  },
  filterText: {
    color: YowPetTheme.brand.accent,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  filterTextSelected: {
    color: YowPetTheme.brand.support,
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 6,
  },
  petIcon: {
    marginLeft: 2,
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
    backgroundColor: YowPetTheme.background.cardBg,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: YowPetTheme.border.softBorder,
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
  bottomSpacer: {
    height: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});