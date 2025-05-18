import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';
import { useRouter } from 'expo-router';

const QUICK_ACCESS_ITEMS = [
  {
    icon: 'account-group',
    title: 'Comunidad',
    route: '/(services)/community',
    color: '#4A6FA5',
  },
  {
    icon: 'chat',
    title: 'Chat',
    route: '/(services)/chat',
    color: '#FF6B6B',
  },
  {
    icon: 'heart',
    title: 'Cuidador',
    route: '/(services)/find-caretaker',
    color: '#3DA5D9',
  },
  {
    icon: 'school',
    title: 'Educar',
    route: '/(services)/educate',
    color: '#2EA44F',
  },
  {
    icon: 'map-marker',
    title: 'Localizar',
    route: '/(services)/locate',
    color: '#D95204',
  },
];

export function QuickAccess() {
  const router = useRouter();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickAccessScroll}>
      <>
        {QUICK_ACCESS_ITEMS.map((item, index) => (
          <Pressable
            key={index}
            style={styles.quickAccessCard}
            onPress={() => router.push(item.route)}
          >
            <View style={[styles.quickAccessIcon, { backgroundColor: item.color + '20' }]}>
              <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
            </View>
            <Text style={styles.quickAccessTitle}>{item.title}</Text>
          </Pressable>
        ))}
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  quickAccessScroll: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  quickAccessCard: {
    marginRight: 6,
    alignItems: 'center',
    width: 90,
    backgroundColor: YowPetTheme.brand.white,
    paddingVertical: 16,
    paddingHorizontal: 2,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  quickAccessIcon: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickAccessTitle: {
    fontSize: 12,
    color: YowPetTheme.text.mainText,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
    flexWrap: 'wrap',
    width: '100%',
  },
});