import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import { Ionicons } from '@expo/vector-icons';

const caregivers = [
    {
        id: 1,
        name: 'María López',
        rating: 4.9,
        reviews: 42,
        distance: '1.2 km',
        price: '15€/hora',
        services: ['Paseos', 'Guardería', 'Visitas'],
        avatar: require('../../assets/caretaker/alina.jpg'),
        verified: true
    },
    {
        id: 2,
        name: 'Carlos Martínez',
        rating: 4.7,
        reviews: 28,
        distance: '2.5 km',
        price: '12€/hora',
        services: ['Paseos', 'Visitas'],
        avatar: require('../../assets/caretaker/adrian.jpg'),
        verified: false
    },
    {
        id: 3,
        name: 'Ana Sánchez',
        rating: 5.0,
        reviews: 65,
        distance: '3.1 km',
        price: '18€/hora',
        services: ['Guardería', 'Alojamiento'],
        avatar: require('../../assets/caretaker/girl.jpg'),
        verified: true
    },
];

export default function FindCaregiverScreen() {
    return (
        <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>BUSCAR CUIDADOR</Text>
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="filter" size={24} color={YowPetTheme.brand.primary} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color={YowPetTheme.text.subtleText} />
                        <Text style={styles.searchPlaceholder}>Buscar por ubicación o nombre...</Text>
                    </View>

                    {/* Caregivers List */}
                    {caregivers.map(caregiver => (
                        <TouchableOpacity
                            key={caregiver.id}
                            style={styles.caregiverCard}
                            activeOpacity={0.7}
                        >
                            <View style={styles.avatarContainer}>
                                <Image source={caregiver.avatar} style={styles.avatar} />
                                {caregiver.verified && (
                                    <View style={styles.verifiedBadge}>
                                        <Ionicons name="checkmark" size={12} color="#fff" />
                                    </View>
                                )}
                            </View>
                            <View style={styles.caregiverInfo}>
                                <View style={styles.caregiverHeader}>
                                    <Text style={styles.caregiverName}>{caregiver.name}</Text>
                                    <View style={styles.ratingContainer}>
                                        <Ionicons name="star" size={16} color="#FFC107" />
                                        <Text style={styles.ratingText}>{caregiver.rating}</Text>
                                        <Text style={styles.reviewsText}>({caregiver.reviews})</Text>
                                    </View>
                                </View>
                                <View style={styles.distancePriceContainer}>
                                    <Text style={styles.distanceText}>
                                        <Ionicons name="location" size={14} color={YowPetTheme.brand.primary} /> {caregiver.distance}
                                    </Text>
                                    <Text style={styles.priceText}>{caregiver.price}</Text>
                                </View>
                                <View style={styles.servicesContainer}>
                                    {caregiver.services.map((service, index) => (
                                        <View key={index} style={styles.serviceTag}>
                                            <Text style={styles.serviceText}>{service}</Text>
                                        </View>
                                    ))}
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
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: YowPetTheme.text.mainText,
    },
    filterButton: {
        padding: 5,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginHorizontal: 15,
        marginBottom: 20,
    },
    searchPlaceholder: {
        marginLeft: 10,
        color: YowPetTheme.text.subtleText,
        fontSize: 14,
    },
    caregiverCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 15,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: YowPetTheme.brand.primary,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    caregiverInfo: {
        flex: 1,
    },
    caregiverHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    caregiverName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: YowPetTheme.text.mainText,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 3,
        fontSize: 14,
        fontWeight: '600',
        color: YowPetTheme.text.mainText,
    },
    reviewsText: {
        marginLeft: 3,
        fontSize: 12,
        color: YowPetTheme.text.subtleText,
    },
    distancePriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    distanceText: {
        fontSize: 13,
        color: YowPetTheme.text.mainText,
    },
    priceText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: YowPetTheme.brand.primary,
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    serviceTag: {
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 8,
        marginBottom: 5,
    },
    serviceText: {
        fontSize: 12,
        color: YowPetTheme.text.mainText,
    },
});