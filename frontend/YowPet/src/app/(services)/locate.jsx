import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const pets = [
  {
    id: 1,
    name: 'Max',
    type: 'Perro',
    breed: 'Labrador',
    lastSeen: 'Hace 2 horas',
    location: { latitude: 41.3851, longitude: 2.1734 },
    photo: require('../../assets/locate/max.jpg'),
    status: 'lost', // 'lost' or 'found'
  },
  {
    id: 2,
    name: 'Luna',
    type: 'Gato',
    breed: 'Siamés',
    lastSeen: 'Ahora mismo',
    location: { latitude: 41.3902, longitude: 2.1641 },
    photo: require('../../assets/locate/luna.jpg'),
    status: 'found',
  },
];

export default function LocatePetScreen() {
  return (
    <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>LOCALIZA TU MASCOTA</Text>
          <TouchableOpacity style={styles.mapButton}>
            <Ionicons name="map" size={24} color={YowPetTheme.brand.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Map View */}
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 41.3851,
                longitude: 2.1734,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {pets.map(pet => (
                <Marker
                  key={pet.id}
                  coordinate={pet.location}
                  title={pet.name}
                  description={`${pet.type} - ${pet.breed}`}
                >
                  <View
                    style={[
                      styles.markerContainer,
                      pet.status === 'lost'
                        ? styles.lostMarker
                        : styles.foundMarker,
                    ]}
                  >
                    <Image source={pet.photo} style={styles.markerImage} />
                  </View>
                </Marker>
              ))}
            </MapView>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#FF5252' }]}>
                <Ionicons name="paw" size={20} color="#fff" />
              </View>
              <Text style={styles.actionText}>Mascota Perdida</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#4CAF50' }]}>
                <Ionicons name="home" size={20} color="#fff" />
              </View>
              <Text style={styles.actionText}>Mascota Encontrada</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Activity */}
          <Text style={styles.sectionTitle}>Actividad Reciente</Text>

          {pets.map(pet => (
            <TouchableOpacity key={pet.id} style={styles.petCard}>
              <Image source={pet.photo} style={styles.petImage} />
              <View style={styles.petInfo}>
                <View style={styles.petHeader}>
                  <Text style={styles.petName}>{pet.name}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      pet.status === 'lost'
                        ? styles.lostBadge
                        : styles.foundBadge,
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {pet.status === 'lost' ? 'Perdido' : 'Encontrado'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.petDetails}>
                  {pet.type} • {pet.breed}
                </Text>
                <Text style={styles.lastSeen}>
                  Visto por última vez: {pet.lastSeen}
                </Text>
                <View style={styles.locationContainer}>
                  <Ionicons
                    name="location"
                    size={16}
                    color={YowPetTheme.brand.primary}
                  />
                  <Text style={styles.locationText}>
                    Cerca de Plaza Catalunya
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: YowPetTheme.text.mainText,
  },
  mapButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  mapContainer: {
    height: 250,
    borderRadius: 15,
    overflow: 'hidden',
    margin: 15,
    borderWidth: 0.5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  lostMarker: {
    borderColor: '#FF5252',
  },
  foundMarker: {
    borderColor: '#4CAF50',
  },
  markerImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  actionButton: {
    width: '48%',
    alignItems: 'center',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: YowPetTheme.text.mainText,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: YowPetTheme.text.mainText,
    marginLeft: 15,
    marginBottom: 15,
  },
  petCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 15,
  },
  petInfo: {
    flex: 1,
  },
  petHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: YowPetTheme.text.mainText,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  lostBadge: {
    backgroundColor: '#FFEBEE',
  },
  foundBadge: {
    backgroundColor: '#E8F5E9',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  petDetails: {
    fontSize: 14,
    color: YowPetTheme.text.subtleText,
    marginBottom: 5,
  },
  lastSeen: {
    fontSize: 12,
    color: YowPetTheme.text.subtleText,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 13,
    color: YowPetTheme.text.mainText,
    marginLeft: 5,
  },
});
