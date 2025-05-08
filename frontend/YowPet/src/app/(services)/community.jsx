import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import { Ionicons } from '@expo/vector-icons';

const communityData = {
  featuredGroups: [
    {
      id: 1,
      name: 'Amantes de los Gatos',
      members: 1250,
      image: require('../../assets/community/cats.jpg'),
      category: 'Gatos',
    },
    {
      id: 2,
      name: 'Adiestramiento Canino',
      members: 890,
      image: require('../../assets/community/dogs.jpg'),
      category: 'Perros',
    },
  ],
  recentPosts: [
    {
      id: 1,
      user: 'María G.',
      text: '¿Alguien sabe de un buen veterinario especializado en aves en Barcelona?',
      time: 'Hace 2 horas',
      likes: 12,
      comments: 5,
    },
    {
      id: 2,
      user: 'Carlos M.',
      text: 'Comparto fotos de mi nuevo cachorro labrador! 🐶',
      time: 'Ayer',
      likes: 45,
      comments: 8,
      image: require('../../assets/community/labrador.jpg'),
    },
  ],
  popularCategories: [
    { id: 1, name: 'Salud', icon: 'medkit' },
    { id: 2, name: 'Adiestramiento', icon: 'school' },
    { id: 3, name: 'Alimentación', icon: 'fast-food' },
    { id: 4, name: 'Adopciones', icon: 'heart' },
  ],
};

export default function CommunityScreen() {
  return (
    <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>COMUNIDAD</Text>
          <TouchableOpacity>
            <Ionicons
              name="notifications"
              size={24}
              color={YowPetTheme.text.mainText}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Grupos destacados */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Grupos destacados</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Ver todos</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {communityData.featuredGroups.map(group => (
                <TouchableOpacity key={group.id} style={styles.groupCard}>
                  <Image source={group.image} style={styles.groupImage} />
                  <View style={styles.groupInfo}>
                    <Text style={styles.groupName}>{group.name}</Text>
                    <Text style={styles.groupMeta}>
                      {group.members} miembros • {group.category}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Categorías populares */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categorías populares</Text>
            <View style={styles.categoriesContainer}>
              {communityData.popularCategories.map(category => (
                <TouchableOpacity key={category.id} style={styles.categoryCard}>
                  <Ionicons
                    name={category.icon}
                    size={28}
                    color={YowPetTheme.brand.primary}
                  />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Publicaciones recientes */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Publicaciones recientes</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Ver todas</Text>
              </TouchableOpacity>
            </View>
            {communityData.recentPosts.map(post => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.avatarText}>{post.user.charAt(0)}</Text>
                  </View>
                  <View>
                    <Text style={styles.userName}>{post.user}</Text>
                    <Text style={styles.postTime}>{post.time}</Text>
                  </View>
                </View>
                <Text style={styles.postText}>{post.text}</Text>
                {post.image && (
                  <Image source={post.image} style={styles.postImage} />
                )}
                <View style={styles.postActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons
                      name="heart-outline"
                      size={20}
                      color={YowPetTheme.text.subtleText}
                    />
                    <Text style={styles.actionText}>{post.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons
                      name="chatbubble-outline"
                      size={20}
                      color={YowPetTheme.text.subtleText}
                    />
                    <Text style={styles.actionText}>{post.comments}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
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
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: YowPetTheme.brand.primary + '20',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: YowPetTheme.text.mainText,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: YowPetTheme.text.mainText,
    marginBottom: 20,
  },
  seeAll: {
    color: YowPetTheme.brand.primary,
    fontSize: 12,
    marginBottom: 20,
  },
  groupCard: {
    width: 200,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  groupImage: {
    width: '100%',
    height: 120,
  },
  groupInfo: {
    padding: 12,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: YowPetTheme.text.mainText,
    marginBottom: 5,
  },
  groupMeta: {
    fontSize: 12,
    color: YowPetTheme.text.subtleText,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: YowPetTheme.text.mainText,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: YowPetTheme.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: YowPetTheme.text.mainText,
  },
  postTime: {
    fontSize: 12,
    color: YowPetTheme.text.subtleText,
  },
  postText: {
    fontSize: 14,
    color: YowPetTheme.text.mainText,
    marginBottom: 12,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: YowPetTheme.text.subtleText,
  },
});
