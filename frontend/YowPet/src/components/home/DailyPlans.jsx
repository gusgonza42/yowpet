import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';

export function DailyPlans() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Planes para hoy</Text>
      <View style={styles.planCard}>
        <View style={styles.planIcon}>
          <MaterialCommunityIcons name="calendar-clock" size={24} color={YowPetTheme.status.info} />
        </View>
        <View style={styles.planInfo}>
          <Text style={styles.planTitle}>Paseo con Luna</Text>
          <Text style={styles.planSubtitle}>15:00 • Parque Central</Text>
        </View>
      </View>
      <View style={styles.planCard}>
        <View style={[styles.planIcon, { backgroundColor: YowPetTheme.status.warning + '20' }]}>
          <MaterialCommunityIcons name="food" size={24} color={YowPetTheme.status.warning} />
        </View>
        <View style={styles.planInfo}>
          <Text style={styles.planTitle}>Alimentación</Text>
          <Text style={styles.planSubtitle}>18:00 • 2 porciones</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 20,
    backgroundColor: YowPetTheme.brand.white,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: YowPetTheme.text.mainText,
    marginBottom: 16,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: YowPetTheme.brand.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  planIcon: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: YowPetTheme.status.info + '20',
    marginRight: 12,
  },
  planInfo: {
    flex: 1,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: YowPetTheme.text.mainText,
  },
  planSubtitle: {
    fontSize: 14,
    color: YowPetTheme.text.softText,
    marginTop: 4,
  },
});