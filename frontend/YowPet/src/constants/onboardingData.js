import { YowPetTheme } from '@theme/Colors';

export const slides = [
  {
    id: '1',
    description: 'Cuida y sigue el día a día de tu mascota.',
    image: require('../../assets/logos/yowpet_icon_v2.png'),
  },
  {
    id: '2',
    description: 'Enséñala con rutinas y consejos prácticos.',
    image: require('../../assets/logos/yowpet_icon_v2.png'),
  },
  {
    id: '3',
    description: 'Descubre sitios pet-friendly y más servicios.',
    image: require('../../assets/logos/yowpet_icon_v2.png'),
  },
];

export const screenConfigs = [
  // Primera pantalla
  {
    topBackground: {
      color: YowPetTheme.brand.primary,
      position: {
        top: 0,
        left: 0,
        right: 0,
        borderRadius: 'borderBottomLeftRadius',
      },
    },
    decoration1: {
      color: YowPetTheme.brand.secondary,
      position: { top: '90%', right: '80%', width: '90%', height: '25%' },
    },
    decoration2: {
      color: YowPetTheme.brand.orange,
      position: { bottom: '50%', left: '80%', width: '35%', height: '35%' },
    },
  },
  // Segunda pantalla
  {
    topBackground: {
      color: YowPetTheme.brand.surface,
      position: {
        top: 0,
        left: 0,
        right: 0,
        borderRadius: 'borderBottomLeftRadius',
      },
    },
    decoration1: {
      color: YowPetTheme.brand.primary,
      position: { top: '90%', right: '80%', width: '90%', height: '25%' },
    },
    decoration2: {
      color: YowPetTheme.brand.orange,
      position: { bottom: '50%', left: '80%', width: '35%', height: '35%' },
    },
  },
  // Tercera pantalla
  {
    topBackground: {
      color: YowPetTheme.brand.orange,
      position: {
        top: 0,
        left: 0,
        right: 0,
        borderRadius: 'borderBottomLeftRadius',
      },
    },
    decoration1: {
      color: YowPetTheme.brand.surface,
      position: { top: '90%', right: '80%', width: '90%', height: '25%' },
    },
    decoration2: {
      color: YowPetTheme.brand.accent,
      position: { bottom: '50%', left: '80%', width: '35%', height: '35%' },
    },
  },
];
