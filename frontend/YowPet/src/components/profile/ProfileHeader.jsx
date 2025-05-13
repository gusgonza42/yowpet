import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';
import { useRouter } from 'expo-router';
import { styles } from './styles';

export const ProfileHeader = ({ user }) => {
  const router = useRouter();

  return (
    <View style={styles.ProfileHeader.header}>
      <View style={styles.ProfileHeader.profileSection}>
        <View style={styles.ProfileHeader.avatarContainer}>
          <Image
            source={require('@assets/logos/icon.png')}
            style={styles.ProfileHeader.avatar}
            defaultSource={require('@assets/logos/icon_fondo.png')}
          />
          <TouchableOpacity style={styles.ProfileHeader.addButtonContainer}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.ProfileHeader.profileInfo}>
          <Text style={styles.ProfileHeader.profileName}>
            {user?.fullName || 'Tester YowPet'}
          </Text>
          <Text style={styles.ProfileHeader.profileEmail}>
            {user?.email || 'notemail@yowpet.cat'}
          </Text>
        </View>
      </View>

      <View style={styles.ProfileHeader.quickLinksContainer}>
        <TouchableOpacity
          style={styles.ProfileHeader.quickLink}
          onPress={() => router.push('/profile/pets')}
        >
          <View
            style={[
              styles.ProfileHeader.quickLinkIcon,
              { backgroundColor: '#f0e7fd' },
            ]}
          >
            <MaterialIcons
              name="pets"
              size={22}
              color={YowPetTheme.brand.primary}
            />
          </View>
          <Text style={styles.ProfileHeader.quickLinkText}>Mis mascotas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ProfileHeader.quickLink}
          onPress={() => router.push('/profile/club')}
        >
          <View
            style={[
              styles.ProfileHeader.quickLinkIcon,
              { backgroundColor: '#ffeee6' },
            ]}
          >
            <Ionicons name="star-outline" size={22} color="#ff6b00" />
          </View>
          <Text style={styles.ProfileHeader.quickLinkText}>YowPet Club</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
