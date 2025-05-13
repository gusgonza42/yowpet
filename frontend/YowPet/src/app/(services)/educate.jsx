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
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const videos = {
  Fácil: [
    {
      title: 'Sentarse',
      thumbnailKey: 'sentarse',
      thumbnail: require('../../assets/educate/sentarse.jpg'),
      description: 'Cómo enseñar a tu perro a sentarse',
      duration: '2:15',
      instructionImages: [
        'https://www.wikihow.com/images/thumb/f/f1/Teach-Your-Dog-to-Sit-Step-5-Version-4.jpg/v4-728px-Teach-Your-Dog-to-Sit-Step-5-Version-4.jpg.webp',
        'https://www.wikihow.com/images_en/thumb/a/a8/Teach-Your-Dog-to-Sit-Step-6-Version-4.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-6-Version-4.jpg.webp',
          'https://www.wikihow.com/images_en/thumb/1/13/Teach-Your-Dog-to-Sit-Step-7-Version-4.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-7-Version-4.jpg.webp',
          'https://www.wikihow.com/images_en/thumb/e/e2/Teach-Your-Dog-to-Sit-Step-8-Version-4.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-8-Version-4.jpg.webp',
          'https://www.wikihow.com/images_en/thumb/a/a0/Teach-Your-Dog-to-Sit-Step-9-Version-3.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-9-Version-3.jpg.webp',
          'https://www.wikihow.com/images_en/thumb/9/9a/Teach-Your-Dog-to-Sit-Step-10-Version-3.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-10-Version-3.jpg.webp',
          'https://www.wikihow.com/images_en/thumb/c/c9/Teach-Your-Dog-to-Sit-Step-11-Version-3.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-11-Version-3.jpg.webp',
          'https://www.wikihow.com/images_en/thumb/c/c4/Teach-Your-Dog-to-Sit-Step-12-Version-3.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-12-Version-3.jpg.webp',
          'https://www.wikihow.com/images_en/thumb/2/27/Teach-Your-Dog-to-Sit-Step-13-Version-3.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-13-Version-3.jpg.webp'
      ],
      steps: [
        'Paso 1: Consigue golosinas pequeñas y saludables como trozos de manzana zanahoria vainitas o pollo.',
        'Paso 2: Colócate frente al perro para captar toda su atención.',
        'Paso 3: Sujeta una golosina en tu mano sin dejar que la tome.',
        'Paso 4: Mueve la golosina desde su nariz hacia arriba y hacia atrás cerca de su cabeza.',
        'Paso 5: Cuando se siente di sentado con voz firme y dale la golosina de inmediato.',
        'Paso 6: Elogia al perro con caricias y palabras como buen chico.',
        'Paso 7: Haz que se levante usando una orden como parado mientras retrocedes.',
        'Paso 8: Repite el ejercicio durante diez minutos y hazlo dos o tres veces al día.',
        'Paso 9: Cuando ya lo haga bien da golosinas solo de vez en cuando pero sigue elogiándolo.',
      ],
    },
    {
      title: 'Dar La Pata',
      thumbnailKey: 'pata',
      thumbnail: require('../../assets/educate/pata.jpg'),
      description: 'Enseñar al perro a dar la pata',
      duration: '3:30',
      instructionImages: [
        'https://www.wikihow.com/images/thumb/e/e5/Train-a-Dog-to-Give-You-Its-Paw-Step-1-Version-3.jpg/v4-728px-Train-a-Dog-to-Give-You-Its-Paw-Step-1-Version-3.jpg.webp',
        'https://www.wikihow.com/images/thumb/a/a1/Train-a-Dog-to-Give-You-Its-Paw-Step-2-Version-3.jpg/v4-728px-Train-a-Dog-to-Give-You-Its-Paw-Step-2-Version-3.jpg.webp',
        'https://www.wikihow.com/images/thumb/0/0b/Train-a-Dog-to-Give-You-Its-Paw-Step-3-Version-2.jpg/v4-728px-Train-a-Dog-to-Give-You-Its-Paw-Step-3-Version-2.jpg.webp',
          'https://www.wikihow.com/images_en/thumb/7/70/Train-a-Dog-to-Give-You-Its-Paw-Step-4-Version-2.jpg/550px-nowatermark-Train-a-Dog-to-Give-You-Its-Paw-Step-4-Version-2.jpg.webp',
            'https://www.wikihow.com/images_en/thumb/0/05/Train-a-Dog-to-Give-You-Its-Paw-Step-5-Version-2.jpg/550px-nowatermark-Train-a-Dog-to-Give-You-Its-Paw-Step-5-Version-2.jpg.webp',
            'https://www.wikihow.com/images/thumb/8/8e/Train-a-Dog-to-Give-You-Its-Paw-Step-6-Version-2.jpg/v4-728px-Train-a-Dog-to-Give-You-Its-Paw-Step-6-Version-2.jpg.webp',
            'https://www.wikihow.com/images_en/thumb/7/72/Train-a-Dog-to-Give-You-Its-Paw-Step-7-Version-2.jpg/550px-nowatermark-Train-a-Dog-to-Give-You-Its-Paw-Step-7-Version-2.jpg.webp',
            'https://www.wikihow.com/images/thumb/3/37/Train-a-Dog-to-Give-You-Its-Paw-Step-8-Version-2.jpg/v4-728px-Train-a-Dog-to-Give-You-Its-Paw-Step-8-Version-2.jpg.webp',
      ],
      steps: [
        'Paso 1: Elige bocadillos sabrosos que no se desmoronen y úsalos solo para el entrenamiento.',
        'Paso 2: Escoge una orden verbal corta como pata y úsala siempre de forma consistente.',
        'Paso 3: Entrena en un lugar tranquilo sin distracciones como televisión otras mascotas o juguetes.',
        'Paso 4: Haz que el perro se siente usando un bocadillo y una orden como sentado o abajo.',
        'Paso 5: Muestra el bocadillo para llamar su atención y luego ciérralo en el puño.',
        'Paso 6: Espera a que levante la pata y recompénsalo solo si no usa la boca.',
        'Paso 7: Agrega la orden verbal cuando empiece a levantar la pata y recompénsalo al hacerlo.',
        'Paso 8: Añade desafíos como practicar en lugares con distracciones o enseñarle a dar la otra pata.',
      ],
    },
    {
      title: 'Caminar Con Correa',
      thumbnailKey: 'correa',
      thumbnail: require('../../assets/educate/correa.jpg'),
      description: 'Cómo enseñarle a tu perro a usar correa.',
      duration: '4:10',
      instructionImages: [
        'https://www.wikihow.com/images/thumb/0/0b/Leash-Train-a-Puppy-Step-1-Version-2.jpg/v4-728px-Leash-Train-a-Puppy-Step-1-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/8/81/Leash-Train-a-Puppy-Step-2-Version-2.jpg/v4-728px-Leash-Train-a-Puppy-Step-2-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/5/55/Leash-Train-a-Puppy-Step-3-Version-2.jpg/v4-728px-Leash-Train-a-Puppy-Step-3-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/a/a2/Leash-Train-a-Puppy-Step-4-Version-2.jpg/v4-728px-Leash-Train-a-Puppy-Step-4-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/2/2b/Leash-Train-a-Puppy-Step-5-Version-2.jpg/v4-728px-Leash-Train-a-Puppy-Step-5-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/1/11/Leash-Train-a-Puppy-Step-6-Version-2.jpg/v4-728px-Leash-Train-a-Puppy-Step-6-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/3/3d/Leash-Train-a-Puppy-Step-7-Version-2.jpg/v4-728px-Leash-Train-a-Puppy-Step-7-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/a/ae/Leash-Train-a-Puppy-Step-8.jpg/v4-728px-Leash-Train-a-Puppy-Step-8.jpg.webp',
          'https://www.wikihow.com/images/thumb/8/8e/Leash-Train-a-Puppy-Step-9.jpg/v4-728px-Leash-Train-a-Puppy-Step-9.jpg.webp',
          'https://www.wikihow.com/images/thumb/5/53/Leash-Train-a-Puppy-Step-10.jpg/v4-728px-Leash-Train-a-Puppy-Step-10.jpg.webp',
          'https://www.wikihow.com/images/thumb/0/0b/Leash-Train-a-Puppy-Step-11.jpg/v4-728px-Leash-Train-a-Puppy-Step-11.jpg.webp',
          'https://www.wikihow.com/images/thumb/1/12/Leash-Train-a-Puppy-Step-12.jpg/v4-728px-Leash-Train-a-Puppy-Step-12.jpg.webp',
          'https://www.wikihow.com/images/thumb/6/69/Leash-Train-a-Puppy-Step-13.jpg/v4-728px-Leash-Train-a-Puppy-Step-13.jpg.webp',
          'https://www.wikihow.com/images/thumb/3/38/Leash-Train-a-Puppy-Step-14.jpg/v4-728px-Leash-Train-a-Puppy-Step-14.jpg.webp',
      ],
      steps: [
        'Paso 1: Sé paciente y no esperes que aprenda en un solo día.',
        'Paso 2: Recompensa con golosinas juegos o un clicker para reforzar lo positivo.',
        'Paso 3: Escoge un collar plano y una correa ligera para comenzar.',
        'Paso 4: Deja que se acostumbre al collar y distráelo mientras se lo pones.',
        'Paso 5: Presenta la correa dejándola arrastrar mientras juega.',
        'Paso 6: Mantén la calma para crear un ambiente tranquilo durante el entrenamiento.',
        'Paso 7: Lleva siempre golosinas pequeñas para premiar al cachorro.',
        'Paso 8: Acarícialo y dale golosinas si está nervioso al caminar con correa.',
        'Paso 9: Si tira de la correa detente y recompénsalo cuando vuelva.',
        'Paso 10: Repite el entrenamiento con calma y constancia todos los días.',
        'Paso 11: Pasea varias veces al día para reforzar lo aprendido.',
        'Paso 12: Camina delante del cachorro para mostrar liderazgo.',
        'Paso 13: Ignora a otros perros y recompensa si mantiene la calma.',
        'Paso 14: Usa correa corta y arnés adecuado y evita las correas retractiles.',
      ],
    },
  ],
  Medio: [
    {
      title: 'Quieto',
      thumbnailKey: 'quieto',
      thumbnail: require('../../assets/educate/quieto.jpg'),
      description: 'Cómo entrenar a tu perro para que esté tranquilo',
      duration: '5:25',
      instructionImages: [
        'https://www.wikihow.com/images/thumb/7/71/Train-Your-Dog-to-Be-Calm-Step-1.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-1.jpg.webp',
        'https://www.wikihow.com/images/thumb/5/51/Train-Your-Dog-to-Be-Calm-Step-2.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/3/38/Train-Your-Dog-to-Be-Calm-Step-3.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-3.jpg.webp',
        'https://www.wikihow.com/images/thumb/8/8c/Train-Your-Dog-to-Be-Calm-Step-4.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-4.jpg.webp',
        'https://www.wikihow.com/images/thumb/a/a9/Train-Your-Dog-to-Be-Calm-Step-5.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-5.jpg.webp',
        'https://www.wikihow.com/images/thumb/6/66/Train-Your-Dog-to-Be-Calm-Step-6.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-6.jpg.webp',
        'https://www.wikihow.com/images/thumb/0/07/Train-Your-Dog-to-Be-Calm-Step-7.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-7.jpg.webp',
        'https://www.wikihow.com/images/thumb/3/32/Train-Your-Dog-to-Be-Calm-Step-8.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-8.jpg.webp',
        'https://www.wikihow.com/images/thumb/8/80/Train-Your-Dog-to-Be-Calm-Step-9.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-9.jpg.webp',
        'https://www.wikihow.com/images/thumb/f/f2/Train-Your-Dog-to-Be-Calm-Step-10.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-10.jpg.webp',
        'https://www.wikihow.com/images/thumb/2/26/Train-Your-Dog-to-Be-Calm-Step-11.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-11.jpg.webp',
        'https://www.wikihow.com/images/thumb/9/95/Train-Your-Dog-to-Be-Calm-Step-12.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-12.jpg.webp',
      ],
      steps: [
        'Paso 1: Enseña a tu perro las órdenes básicas como "sentado" o "quieto".',
        'Paso 2: Utiliza un clicker para reforzar los comportamientos positivos.',
        'Paso 3: Practica el autocontrol enseñando a tu perro a esperar antes de obtener algo.',
        'Paso 4: Usa las órdenes "tranquilo" o "quieto" para calmar a tu perro en situaciones emocionantes.',
        'Paso 5: No respondas con gritos o castigos a los comportamientos no deseados.',
        'Paso 6: Si es necesario consulta a un profesional en adiestramiento canino.',
        'Paso 7: Controla el ladrido de tu perro enseñándole la orden "silencio".',
        'Paso 8: Enseña a tu perro a lidiar con la ansiedad por separación.',
        'Paso 9: Introduce a tu perro a otros perros de forma controlada.',
        'Paso 10: Evita las distracciones al entrenar a tu perro manteniéndolo enfocado.',
        'Paso 11: Realiza ejercicio físico regular con tu perro para liberar energía acumulada.',
        'Paso 12: Haz pausas durante las sesiones de juego o entrenamiento para evitar la sobrecarga.',
      ],
    },
    {
      title: 'Buscar Objeto',
      thumbnailKey: 'objeto',
      thumbnail: require('../../assets/educate/objeto.jpg'),
      description: 'Cómo enseñarle a un perro a rastrear cosas',
      duration: '3:45',
      instructionImages: [
        'https://www.wikihow.com/images/thumb/5/56/Teach-a-Dog-to-Track-Step-1-Version-4.jpg/v4-728px-Teach-a-Dog-to-Track-Step-1-Version-4.jpg.webp',
        'https://www.wikihow.com/images/thumb/b/b6/Teach-a-Dog-to-Track-Step-2-Version-4.jpg/v4-728px-Teach-a-Dog-to-Track-Step-2-Version-4.jpg.webp',
        'https://www.wikihow.com/images/thumb/c/c8/Teach-a-Dog-to-Track-Step-3-Version-4.jpg/v4-728px-Teach-a-Dog-to-Track-Step-3-Version-4.jpg.webp',
        'https://www.wikihow.com/images/thumb/a/ae/Teach-a-Dog-to-Track-Step-4-Version-4.jpg/v4-728px-Teach-a-Dog-to-Track-Step-4-Version-4.jpg.webp',
        'https://www.wikihow.com/images/thumb/e/ea/Teach-a-Dog-to-Track-Step-5-Version-4.jpg/v4-728px-Teach-a-Dog-to-Track-Step-5-Version-4.jpg.webp',
        'https://www.wikihow.com/images/thumb/c/c3/Teach-a-Dog-to-Track-Step-6-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-6-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/a/ac/Teach-a-Dog-to-Track-Step-7-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-7-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/b/b7/Teach-a-Dog-to-Track-Step-8-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-8-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/1/1f/Teach-a-Dog-to-Track-Step-9-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-9-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/f/f8/Teach-a-Dog-to-Track-Step-10-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-10-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/7/79/Teach-a-Dog-to-Track-Step-11-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-11-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/6/6c/Teach-a-Dog-to-Track-Step-12-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-12-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/4/43/Teach-a-Dog-to-Track-Step-13-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-13-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/5/5a/Teach-a-Dog-to-Track-Step-14-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-14-Version-2.jpg.webp',
      ],
      steps: [
        'Paso 1: Elige un área tranquila para entrenar a tu perro preferiblemente sin distracciones.',
        'Paso 2: Escoge un objeto (como su juguete favorito) para que lo rastree.',
        'Paso 3: Juega con tu perro antes del entrenamiento para que se motive.',
        'Paso 4: Ordénale que se siente o se quede quieto antes de empezar.',
        'Paso 5: Coloca el juguete a la vista para que lo recupere fácilmente.',
        'Paso 6: Ordénale que recupere el juguete usando comandos como “Búscalo”.',
        'Paso 7: Esconde el juguete fuera de su vista para que lo rastree con el olfato.',
        'Paso 8: Usa el viento a tu favor colocándote a sotavento del objeto.',
        'Paso 9: Pide a un ayudante que oculte el juguete para aumentar el reto.',
        'Paso 10: Usa un cable y un arnés de rastreo para entrenamientos más avanzados.',
        'Paso 11: Prepara una pista al aire libre con banderines comida y objetos.',
        'Paso 12: Regresa con tu perro sin pisar la pista para no confundir su rastro.',
        'Paso 13: Deja que huela un objeto guía y ordénale rastrear por la pista.',
        'Paso 14: Aumenta la dificultad agregando curvas o alargando la pista.',
      ],
    },
  ],
  Difícil: [
    {
      title: 'Hacer Un Truco',
      thumbnailKey: 'truco',
      thumbnail: require('../../assets/educate/truco.jpg'),
      description: 'Cómo enseñar trucos a tu perro',
      duration: '6:20',
      instructionImages: [
        'https://www.wikihow.com/images/thumb/a/a3/Teach-Your-Dog-Tricks-Step-1-Version-2.jpg/v4-728px-Teach-Your-Dog-Tricks-Step-1-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/4/44/Teach-Your-Dog-Tricks-Step-2-Version-2.jpg/v4-728px-Teach-Your-Dog-Tricks-Step-2-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/d/d0/Teach-Your-Dog-Tricks-Step-3-Version-2.jpg/v4-728px-Teach-Your-Dog-Tricks-Step-3-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/6/6e/Teach-Your-Dog-Tricks-Step-4-Version-2.jpg/v4-728px-Teach-Your-Dog-Tricks-Step-4-Version-2.jpg.webp',
        'https://www.wikihow.com/images/thumb/9/97/Teach-Your-Dog-Tricks-Step-5-Version-2.jpg/v4-728px-Teach-Your-Dog-Tricks-Step-5-Version-2.jpg.webp',
      ],
      steps: [
        'Paso 1: Entrena a tu perro con recompensas porque es eficaz mejora la relación y evita el miedo.',
        'Step 2: Descubre qué le motiva como comida juguetes o juegos y prémialo al hacer algo bien.',
        'Step 3: Dale la recompensa justo cuando haga la acción para que entienda qué está reforzando.',
        'Paso 4: Usa un clicker para marcar el buen comportamiento y haz que lo asocie con premios.',
        'Paso 5: Combina el clicker con órdenes como siéntate repitiendo hasta que entienda la señal.',
      ],
    },
  ],
};

export default function EducateScreen() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState('Fácil');

  const levels = ['Fácil', 'Medio', 'Difícil'];

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
            {videos[selectedLevel].map((video, index) => (
              <TouchableOpacity
                key={index}
                style={styles.videoCard}
                activeOpacity={0.9}
                onPress={() =>
                  router.push({
                    pathname: '/(services)/educate/video',
                    params: {
                      title: video.title,
                      description: video.description,
                      difficulty: selectedLevel,
                      instructionImages: video.instructionImages || [],
                      steps: video.steps || [],
                    },
                  })
                }
              >
                <View style={styles.imageWrapper}>
                  <Image
                    source={video.thumbnail}
                    style={styles.thumbnail}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle}>{video.title}</Text>
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