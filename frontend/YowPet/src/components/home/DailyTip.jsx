import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { YowPetTheme } from '@theme/Colors';
import { useMemo } from 'react';

const DAILY_TIPS = [
  // Perros
  {
    tip: 'Cepilla los dientes de tu perro al menos 2-3 veces por semana para prevenir enfermedades dentales.',
    icon: 'dog',
    pet: 'perro',
  },
  {
    tip: 'Los paseos diarios son esenciales para mantener a tu perro física y mentalmente saludable.',
    icon: 'dog-side',
    pet: 'perro',
  },
  {
    tip: 'Entrena a tu perro usando refuerzo positivo, premiando los comportamientos deseados.',
    icon: 'dog-service',
    pet: 'perro',
  },
  // Gatos
  {
    tip: 'Los gatos necesitan lugares altos para observar su territorio y sentirse seguros.',
    icon: 'cat',
    pet: 'gato',
  },
  {
    tip: 'Proporciona varios puntos de agua en la casa, a los gatos les gusta beber en diferentes lugares.',
    icon: 'water',
    pet: 'gato',
  },
  {
    tip: 'Los juguetes que estimulan el instinto de caza son excelentes para mantener activo a tu gato.',
    icon: 'cat',
    pet: 'gato',
  },
  // Aves
  {
    tip: 'Las aves necesitan al menos 10-12 horas de oscuridad para un buen descanso nocturno.',
    icon: 'bird',
    pet: 'ave',
  },
  {
    tip: 'Cambia el agua y limpia los comederos de tu ave diariamente para prevenir bacterias.',
    icon: 'bird',
    pet: 'ave',
  },
  {
    tip: 'Proporciona juguetes que estimulen mentalmente a tu ave, como rompecabezas y campanas.',
    icon: 'bird',
    pet: 'ave',
  },
  // Peces
  {
    tip: 'Mantén la temperatura del agua constante, los cambios bruscos estresan a los peces.',
    icon: 'fish',
    pet: 'pez',
  },
  {
    tip: 'Realiza cambios parciales de agua semanalmente para mantener un ambiente saludable.',
    icon: 'fish',
    pet: 'pez',
  },
  // Conejos
  {
    tip: 'Los conejos necesitan heno fresco disponible las 24 horas del día.',
    icon: 'rabbit',
    pet: 'conejo',
  },
  {
    tip: 'Proporciona juguetes seguros para roer, ayudan a mantener sus dientes sanos.',
    icon: 'rabbit',
    pet: 'conejo',
  },
  // Generales
  {
    tip: 'Programa revisiones veterinarias regulares para prevenir enfermedades.',
    icon: 'medical-bag',
    pet: 'general',
  },
  {
    tip: 'Mantén actualizadas las vacunas de tu mascota según el calendario recomendado.',
    icon: 'needle',
    pet: 'general',
  },
  {
    tip: 'Mantén los productos de limpieza y medicamentos fuera del alcance de tus mascotas.',
    icon: 'alert-circle',
    pet: 'general',
  },
  {
    tip: 'Identifica a tu mascota con microchip y placa de identificación.',
    icon: 'tag',
    pet: 'general',
  },
];

export function DailyTip() {
  const dailyTip = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );
    return DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
  }, []);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Consejo del día</Text>
      <View style={styles.tipCard}>
        <MaterialCommunityIcons
          name={dailyTip.icon}
          size={24}
          color={YowPetTheme.status.warning}
        />
        <View style={styles.tipContent}>
          <Text style={styles.tipText}>{dailyTip.tip}</Text>
          <Text style={styles.petType}>
            {dailyTip.pet !== 'general'
              ? `Consejo para ${dailyTip.pet}s`
              : 'Consejo general'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 20,
    paddingBottom: 100,
    backgroundColor: YowPetTheme.brand.white,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: YowPetTheme.text.mainText,
    marginBottom: 16,
  },
  tipCard: {
    backgroundColor: YowPetTheme.brand.secondary,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  tipContent: {
    flex: 1,
  },
  tipText: {
    fontSize: 14,
    color: YowPetTheme.text.mainText,
    lineHeight: 20,
  },
  petType: {
    fontSize: 12,
    color: YowPetTheme.text.softText,
    marginTop: 8,
    fontStyle: 'italic',
  },
});
