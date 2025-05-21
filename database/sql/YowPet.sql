DROP DATABASE IF EXISTS `yowpet`;
CREATE DATABASE IF NOT EXISTS `yowpet` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `yowpet`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: yowpet
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE = @@TIME_ZONE */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

--
-- Table structure for table `allergies`
--

DROP TABLE IF EXISTS `allergies`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allergies`
(
    `id`    int(11)     NOT NULL AUTO_INCREMENT,
    `name`  varchar(45) NOT NULL,
    `photo` blob DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 11
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergies`
--

LOCK TABLES `allergies` WRITE;
/*!40000 ALTER TABLE `allergies`
    DISABLE KEYS */;
INSERT INTO `allergies`
VALUES (1, 'Insects', NULL),
       (2, 'Pollen', NULL),
       (3, 'Dust Mites', NULL),
       (4, 'Mold', NULL),
       (5, 'Pet Dander', NULL),
       (6, 'Certain Foods', NULL),
       (7, 'Medications', NULL),
       (8, 'Latex', NULL),
       (9, 'Insect Stings', NULL),
       (10, 'Cockroaches', NULL);
/*!40000 ALTER TABLE `allergies`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animalcategory`
--

DROP TABLE IF EXISTS `animalcategory`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animalcategory`
(
    `id`   int(11)      NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 16
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animalcategory`
--

LOCK TABLES `animalcategory` WRITE;
/*!40000 ALTER TABLE `animalcategory`
    DISABLE KEYS */;
INSERT INTO `animalcategory`
VALUES (3, 'Bird'),
       (2, 'Cat'),
       (14, 'Chinchilla'),
       (1, 'Dog'),
       (13, 'Ferret'),
       (5, 'Fish'),
       (12, 'Guinea Pig'),
       (6, 'Hamster'),
       (15, 'Hermit Crab'),
       (9, 'Horse'),
       (10, 'Lizard'),
       (4, 'Rabbit'),
       (8, 'Snake'),
       (7, 'Turtle');
/*!40000 ALTER TABLE `animalcategory`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `breed`
--

DROP TABLE IF EXISTS `breed`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `breed`
(
    `id`        int(11) NOT NULL AUTO_INCREMENT,
    `name`      varchar(100) DEFAULT NULL,
    `categoria` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `categoria` (`categoria`),
    CONSTRAINT `breed_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `animalcategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 21
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `breed`
--

LOCK TABLES `breed` WRITE;
/*!40000 ALTER TABLE `breed`
    DISABLE KEYS */;
INSERT INTO `breed`
VALUES (1, 'Golden Retriever', 1),
       (2, 'Persian', 2),
       (3, 'African Grey Parrot', 3),
       (4, 'Bunny', 4),
       (5, 'Goldfish', 5),
       (6, 'Dwarf Hamster', 6),
       (7, 'Red-Eared Slider', 7),
       (8, 'Python', 8),
       (9, 'Arabian Horse', 9),
       (10, 'Gecko', 10),
       (11, 'Labrador Retriever', 1),
       (12, 'German Shepherd', 1),
       (13, 'Siamese', 2),
       (14, 'Maine Coon', 2),
       (15, 'firess', 4),
       (16, 'Lovebird', 3),
       (17, 'Lionhead', 4),
       (18, 'Flemish Giant', 4),
       (19, 'Betta', 5),
       (20, 'Angelfish', 5);
/*!40000 ALTER TABLE `breed`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caregiver_workers`
--

DROP TABLE IF EXISTS `caregiver_workers`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caregiver_workers`
(
    `id`                 int(11)        NOT NULL AUTO_INCREMENT,
    `user_id`            int(11)        NOT NULL,
    `speciality`         varchar(255)   NOT NULL,
    `experience_years`   int(11)        NOT NULL CHECK (`experience_years` >= 0),
    `hourly_rate`        decimal(10, 2) NOT NULL CHECK (`hourly_rate` >= 0),
    `rating`             decimal(3, 2)           DEFAULT NULL CHECK (`rating` >= 0 and `rating` <= 5),
    `review`             text                    DEFAULT NULL,
    `description`        text                    DEFAULT NULL,
    `service_worker`     varchar(255)            DEFAULT NULL,
    `status_active_work` tinyint(1)              DEFAULT 1,
    `created_at`         timestamp      NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `idx_caregiver_user` (`user_id`),
    KEY `idx_caregiver_status` (`status_active_work`),
    CONSTRAINT `fk_caregiver_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caregiver_workers`
--

-- Dumping data for table `caregiver_workers`

LOCK TABLES `caregiver_workers` WRITE;
/*!40000 ALTER TABLE `caregiver_workers`
    DISABLE KEYS */;
INSERT INTO `caregiver_workers`
VALUES (1, 3, 'Dog Walking and Training', 5, 25.00, 4.80, 'Excellent with large breeds!',
        'Certified dog trainer with experience in obedience training', 'Dog Walker, Trainer', 1, '2025-01-15 08:00:00'),
       (2, 5, 'Exotic Pet Care', 3, 30.00, 4.65, 'Very knowledgeable about reptiles',
        'Specialized in reptiles and exotic pets', 'Exotic Pet Sitter', 1, '2025-02-10 09:30:00'),
       (3, 8, 'Cat Specialist', 7, 20.00, 4.90, 'My cats love her!',
        'Feline behavior specialist with veterinary assistant experience', 'Cat Sitter, Groomer', 1,
        '2025-03-05 10:15:00'),
       (4, 10, 'Small Mammal Expert', 4, 18.00, 4.75, 'Takes great care of my rabbits',
        'Experienced with rabbits, guinea pigs, and hamsters', 'Small Pet Sitter', 1, '2025-01-20 13:00:00');
/*!40000 ALTER TABLE `caregiver_workers`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ilness`
--

DROP TABLE IF EXISTS `ilness`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ilness`
(
    `pet`     int(11)          DEFAULT NULL,
    `allergy` int(11)          DEFAULT NULL,
    `state`   int(11) NOT NULL DEFAULT 1 COMMENT '1= still affected\n2= Healed'
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ilness`
--

LOCK TABLES `ilness` WRITE;
/*!40000 ALTER TABLE `ilness`
    DISABLE KEYS */;
INSERT INTO `ilness`
VALUES (1, 0, 1),
       (1, 1, 2),
       (2, 2, 1),
       (2, 3, 1),
       (3, 4, 2),
       (3, 5, 1),
       (4, 6, 1),
       (4, 7, 2),
       (5, 8, 1),
       (5, 9, 2);
/*!40000 ALTER TABLE `ilness`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_reviews`
--

DROP TABLE IF EXISTS `lesson_reviews`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_reviews`
(
    `id`         int(11)   NOT NULL AUTO_INCREMENT,
    `lesson_id`  int(11)   NOT NULL,
    `user_id`    int(11)   NOT NULL,
    `rating`     double    NOT NULL CHECK (`rating` >= 0 and `rating` <= 5),
    `comment`    text               DEFAULT NULL,
    `status`     tinyint(4)         DEFAULT 1 CHECK (`status` in (0, 1)),
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `idx_lesson_reviews_lesson` (`lesson_id`),
    KEY `idx_lesson_reviews_user` (`user_id`),
    CONSTRAINT `fk_lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 7
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_reviews`
--

LOCK TABLES `lesson_reviews` WRITE;
/*!40000 ALTER TABLE `lesson_reviews`
    DISABLE KEYS */;
INSERT INTO `lesson_reviews`
VALUES (1, 1, 1, 5, 'Great introduction to dog training! Very clear instructions.', 1, '2025-01-12 13:30:00',
        '2025-01-12 13:30:00'),
       (2, 1, 4, 4.9, 'Perfecto!', 0, '2025-01-14 15:45:00', '2025-04-11 19:39:02'),
       (3, 2, 7, 5, 'Finally understand why my cat behaves the way it does!', 1, '2025-01-18 09:20:00',
        '2025-01-18 09:20:00'),
       (4, 3, 9, 3, 'Good basics but needs more detail on water chemistry.', 1, '2025-02-08 11:10:00',
        '2025-02-08 11:10:00'),
       (5, 4, 2, 5, 'Perfect for new rabbit owners like me!', 1, '2025-02-22 14:30:00', '2025-02-22 14:30:00'),
       (6, 1, 1, 4.7, 'Muy bien!', 1, '2025-04-11 19:39:55', '2025-04-11 19:39:55');
/*!40000 ALTER TABLE `lesson_reviews`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons`
(
    `id`                 int(11)      NOT NULL AUTO_INCREMENT,
    `title`              varchar(255) NOT NULL,
    `thumbnail`          varchar(255)                       DEFAULT NULL,
    `description`        text                               DEFAULT NULL,
    `steps`              text         NOT NULL,
    `instruction_images` text                               DEFAULT NULL,
    `level`              enum ('Fácil', 'Medio', 'Difícil') DEFAULT 'Fácil',
    `status`             tinyint(4)                         DEFAULT 1 CHECK (`status` in (0, 1)),
    `created_at`         timestamp    NOT NULL              DEFAULT current_timestamp(),
    `updated_at`         timestamp    NOT NULL              DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 8
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons`
    DISABLE KEYS */;
INSERT INTO `lessons`
VALUES (1, 'Sentarse', 'https://i.pinimg.com/736x/52/56/33/5256330be1a3b4c4191f850f1ecc5922.jpg',
        'Cómo enseñar a tu perro a sentarse',
        'Paso 1: Consigue golosinas pequeñas y saludables como trozos de manzana zanahoria vainitas o pollo.,Paso 2: Colócate frente al perro para captar toda su atención.,Paso 3: Sujeta una golosina en tu mano sin dejar que la tome.,Paso 4: Mueve la golosina desde su nariz hacia arriba y hacia atrás cerca de su cabeza.,Paso 5: Cuando se siente di sentado con voz firme y dale la golosina de inmediato.,Paso 6: Elogia al perro con caricias y palabras como buen chico.,Paso 7: Haz que se levante usando una orden como parado mientras retrocedes.,Paso 8: Repite el ejercicio durante diez minutos y hazlo dos o tres veces al día.,Paso 9: Cuando ya lo haga bien da golosinas solo de vez en cuando pero sigue elogiándolo.',
        'https://www.wikihow.com/images/thumb/f/f1/Teach-Your-Dog-to-Sit-Step-5-Version-4.jpg/v4-728px-Teach-Your-Dog-to-Sit-Step-5-Version-4.jpg.webp,https://www.wikihow.com/images_en/thumb/a/a8/Teach-Your-Dog-to-Sit-Step-6-Version-4.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-6-Version-4.jpg.webp,https://www.wikihow.com/images_en/thumb/1/13/Teach-Your-Dog-to-Sit-Step-7-Version-4.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-7-Version-4.jpg.webp,https://www.wikihow.com/images_en/thumb/e/e2/Teach-Your-Dog-to-Sit-Step-8-Version-4.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-8-Version-4.jpg.webp,https://www.wikihow.com/images_en/thumb/a/a0/Teach-Your-Dog-to-Sit-Step-9-Version-3.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-9-Version-3.jpg.webp,https://www.wikihow.com/images_en/thumb/9/9a/Teach-Your-Dog-to-Sit-Step-10-Version-3.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-10-Version-3.jpg.webp,https://www.wikihow.com/images_en/thumb/c/c9/Teach-Your-Dog-to-Sit-Step-11-Version-3.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-11-Version-3.jpg.webp,https://www.wikihow.com/images_en/thumb/c/c4/Teach-Your-Dog-to-Sit-Step-12-Version-3.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-12-Version-3.jpg.webp,https://www.wikihow.com/images_en/thumb/2/27/Teach-Your-Dog-to-Sit-Step-13-Version-3.jpg/550px-nowatermark-Teach-Your-Dog-to-Sit-Step-13-Version-3.jpg.webp',
        'Fácil', 1, '2025-01-10 09:00:00', '2025-01-10 09:00:00'),
       (2, 'Dar La Pata', 'https://i.pinimg.com/736x/3a/09/2c/3a092ca26b54ab28bc39948bbe2b7eb3.jpg',
        'Enseñar al perro a dar la pata',
        'Paso 1: Elige bocadillos sabrosos que no se desmoronen y úsalos solo para el entrenamiento.,Paso 2: Escoge una orden verbal corta como pata y úsala siempre de forma consistente.,Paso 3: Entrena en un lugar tranquilo sin distracciones como televisión otras mascotas o juguetes.,Paso 4: Haz que el perro se siente usando un bocadillo y una orden como sentado o abajo.,Paso 5: Muestra el bocadillo para llamar su atención y luego ciérralo en el puño.,Paso 6: Espera a que levante la pata y recompénsalo solo si no usa la boca.,Paso 7: Agrega la orden verbal cuando empiece a levantar la pata y recompénsalo al hacerlo.,Paso 8: Añade desafíos como practicar en lugares con distracciones o enseñarle a dar la otra pata.',
        'https://www.wikihow.com/images/thumb/e/e5/Train-a-Dog-to-Give-You-Its-Paw-Step-1-Version-3.jpg/v4-728px-Train-a-Dog-to-Give-You-Its-Paw-Step-1-Version-3.jpg.webp,https://www.wikihow.com/images/thumb/a/a1/Train-a-Dog-to-Give-You-Its-Paw-Step-2-Version-3.jpg/v4-728px-Train-a-Dog-to-Give-You-Its-Paw-Step-2-Version-3.jpg.webp,https://www.wikihow.com/images/thumb/0/0b/Train-a-Dog-to-Give-You-Its-Paw-Step-3-Version-2.jpg/v4-728px-Train-a-Dog-to-Give-You-Its-Paw-Step-3-Version-2.jpg.webp,https://www.wikihow.com/images_en/thumb/7/70/Train-a-Dog-to-Give-You-Its-Paw-Step-4-Version-2.jpg/550px-nowatermark-Train-a-Dog-to-Give-You-Its-Paw-Step-4-Version-2.jpg.webp,https://www.wikihow.com/images_en/thumb/0/05/Train-a-Dog-to-Give-You-Its-Paw-Step-5-Version-2.jpg/550px-nowatermark-Train-a-Dog-to-Give-You-Its-Paw-Step-5-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/8/8e/Train-a-Dog-to-Give-You-Its-Paw-Step-6-Version-2.jpg/v4-728px-Train-a-Dog-to-Give-You-Its-Paw-Step-6-Version-2.jpg.webp,https://www.wikihow.com/images_en/thumb/7/72/Train-a-Dog-to-Give-You-Its-Paw-Step-7-Version-2.jpg/550px-nowatermark-Train-a-Dog-to-Give-You-Its-Paw-Step-7-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/3/37/Train-a-Dog-to-Give-You-Its-Paw-Step-8-Version-2.jpg/v4-728px-Train-a-Dog-to-Give-You-Its-Paw-Step-8-Version-2.jpg.webp',
        'Fácil', 1, '2025-01-15 10:30:00', '2025-04-10 20:10:47'),
       (3, 'Caminar Con Correa', 'https://i.pinimg.com/736x/03/ce/b9/03ceb9aa51ca8edcbc44dc1ad97697ae.jpg',
        'Cómo enseñarle a tu perro a usar correa.',
        'Paso 1: Sé paciente y no esperes que aprenda en un solo día.,Paso 2: Recompensa con golosinas juegos o un clicker para reforzar lo positivo.,Paso 3: Escoge un collar plano y una correa ligera para comenzar.,Paso 4: Deja que se acostumbre al collar y distráelo mientras se lo pones.,Paso 5: Presenta la correa dejándola arrastrar mientras juega.,Paso 6: Mantén la calma para crear un ambiente tranquilo durante el entrenamiento.,Paso 7: Lleva siempre golosinas pequeñas para premiar al cachorro.,Paso 8: Acarícialo y dale golosinas si está nervioso al caminar con correa.,Paso 9: Si tira de la correa detente y recompénsalo cuando vuelva.,Paso 10: Repite el entrenamiento con calma y constancia todos los días.,Paso 11: Pasea varias veces al día para reforzar lo aprendido.,Paso 12: Camina delante del cachorro para mostrar liderazgo.,Paso 13: Ignora a otros perros y recompensa si mantiene la calma.,Paso 14: Usa correa corta y arnés adecuado y evita las correas retractiles.',
        'https://www.wikihow.com/images/thumb/0/0b/Leash-Train-a-Puppy-Step-1-Version-2.jpg/v4-728px-Leash-Train-a-Puppy-Step-1-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/8/81/Leash-Train-a-Puppy-Step-2-Version-2.jpg/v4-728px-Leash-Train-a-Puppy-Step-2-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/5/55/Leash-Train-a-Puppy-Step-3-Version-2.jpg/v4-728px-Leash-Train-a-Puppy-Step-3-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/a/a2/Leash-Train-a-Puppy-Step-4-Version-2.jpg/v4-728px-Leash-Train-a-Puppy-Step-4-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/2/2b/Leash-Train-a-Puppy-Step-5-Version-2.jpg/v4-728px-Leash-Train-a-Puppy-Step-5-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/1/11/Leash-Train-a-Puppy-Step-6-Version-2.jpg/v4-728px-Leash-Train-a-Puppy-Step-6-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/3/3d/Leash-Train-a-Puppy-Step-7-Version-2.jpg/v4-728px-Leash-Train-a-Puppy-Step-7-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/a/ae/Leash-Train-a-Puppy-Step-8.jpg/v4-728px-Leash-Train-a-Puppy-Step-8.jpg.webp,https://www.wikihow.com/images/thumb/8/8e/Leash-Train-a-Puppy-Step-9.jpg/v4-728px-Leash-Train-a-Puppy-Step-9.jpg.webp,https://www.wikihow.com/images/thumb/5/53/Leash-Train-a-Puppy-Step-10.jpg/v4-728px-Leash-Train-a-Puppy-Step-10.jpg.webp,https://www.wikihow.com/images/thumb/0/0b/Leash-Train-a-Puppy-Step-11.jpg/v4-728px-Leash-Train-a-Puppy-Step-11.jpg.webp,https://www.wikihow.com/images/thumb/1/12/Leash-Train-a-Puppy-Step-12.jpg/v4-728px-Leash-Train-a-Puppy-Step-12.jpg.webp,https://www.wikihow.com/images/thumb/6/69/Leash-Train-a-Puppy-Step-13.jpg/v4-728px-Leash-Train-a-Puppy-Step-13.jpg.webp,https://www.wikihow.com/images/thumb/3/38/Leash-Train-a-Puppy-Step-14.jpg/v4-728px-Leash-Train-a-Puppy-Step-14.jpg.webp',
        'Fácil', 1, '2025-02-05 13:00:00', '2025-02-10 15:30:00'),
       (4, 'Quieto', 'https://i.pinimg.com/736x/e7/29/7b/e7297b3f7a42d6ad37d506b3ef26c6f7.jpg',
        'Cómo entrenar a tu perro para que esté tranquilo.',
        'Paso 1: Enseña a tu perro las órdenes básicas como "sentado" o "quieto".,Paso 2: Utiliza un clicker para reforzar los comportamientos positivos.,Paso 3: Practica el autocontrol enseñando a tu perro a esperar antes de obtener algo.,Paso 4: Usa las órdenes "tranquilo" o "quieto" para calmar a tu perro en situaciones emocionantes.,Paso 5: No respondas con gritos o castigos a los comportamientos no deseados.,Paso 6: Si es necesario consulta a un profesional en adiestramiento canino.,Paso 7: Controla el ladrido de tu perro enseñándole la orden "silencio".,Paso 8: Enseña a tu perro a lidiar con la ansiedad por separación.,Paso 9: Introduce a tu perro a otros perros de forma controlada.,Paso 10: Evita las distracciones al entrenar a tu perro manteniéndolo enfocado.,Paso 11: Realiza ejercicio físico regular con tu perro para liberar energía acumulada.,Paso 12: Haz pausas durante las sesiones de juego o entrenamiento para evitar la sobrecarga.',
        'https://www.wikihow.com/images/thumb/7/71/Train-Your-Dog-to-Be-Calm-Step-1.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-1.jpg.webp,https://www.wikihow.com/images/thumb/5/51/Train-Your-Dog-to-Be-Calm-Step-2.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-2.jpg.webp,https://www.wikihow.com/images/thumb/3/38/Train-Your-Dog-to-Be-Calm-Step-3.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-3.jpg.webp,https://www.wikihow.com/images/thumb/8/8c/Train-Your-Dog-to-Be-Calm-Step-4.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-4.jpg.webp,https://www.wikihow.com/images/thumb/a/a9/Train-Your-Dog-to-Be-Calm-Step-5.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-5.jpg.webp,https://www.wikihow.com/images/thumb/6/66/Train-Your-Dog-to-Be-Calm-Step-6.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-6.jpg.webp,https://www.wikihow.com/images/thumb/0/07/Train-Your-Dog-to-Be-Calm-Step-7.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-7.jpg.webp,https://www.wikihow.com/images/thumb/3/32/Train-Your-Dog-to-Be-Calm-Step-8.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-8.jpg.webp,https://www.wikihow.com/images/thumb/8/80/Train-Your-Dog-to-Be-Calm-Step-9.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-9.jpg.webp,https://www.wikihow.com/images/thumb/f/f2/Train-Your-Dog-to-Be-Calm-Step-10.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-10.jpg.webp,https://www.wikihow.com/images/thumb/2/26/Train-Your-Dog-to-Be-Calm-Step-11.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-11.jpg.webp,https://www.wikihow.com/images/thumb/9/95/Train-Your-Dog-to-Be-Calm-Step-12.jpg/v4-728px-Train-Your-Dog-to-Be-Calm-Step-12.jpg.webp',
        'Medio', 1, '2025-02-20 08:00:00', '2025-02-25 10:45:00'),
       (5, 'Buscar Objeto', 'https://i.pinimg.com/736x/b1/1e/04/b11e0499a2f1a41505537cfc60a34554.jpg',
        'Cómo enseñarle a un perro a rastrear cosas.',
        'Paso 1: Elige un área tranquila para entrenar a tu perro preferiblemente sin distracciones.,Paso 2: Escoge un objeto (como su juguete favorito) para que lo rastree.,Paso 3: Juega con tu perro antes del entrenamiento para que se motive.,Paso 4: Ordénale que se siente o se quede quieto antes de empezar.,Paso 5: Coloca el juguete a la vista para que lo recupere fácilmente.,Paso 6: Ordénale que recupere el juguete usando comandos como “Búscalo”.,Paso 7: Esconde el juguete fuera de su vista para que lo rastree con el olfato.,Paso 8: Usa el viento a tu favor colocándote a sotavento del objeto.,Paso 9: Pide a un ayudante que oculte el juguete para aumentar el reto.,Paso 10: Usa un cable y un arnés de rastreo para entrenamientos más avanzados.,Paso 11: Prepara una pista al aire libre con banderines comida y objetos.,Paso 12: Regresa con tu perro sin pisar la pista para no confundir su rastro.,Paso 13: Deja que huela un objeto guía y ordénale rastrear por la pista.,Paso 14: Aumenta la dificultad agregando curvas o alargando la pista.',
        'https://www.wikihow.com/images/thumb/5/56/Teach-a-Dog-to-Track-Step-1-Version-4.jpg/v4-728px-Teach-a-Dog-to-Track-Step-1-Version-4.jpg.webp,https://www.wikihow.com/images/thumb/b/b6/Teach-a-Dog-to-Track-Step-2-Version-4.jpg/v4-728px-Teach-a-Dog-to-Track-Step-2-Version-4.jpg.webp,https://www.wikihow.com/images/thumb/c/c8/Teach-a-Dog-to-Track-Step-3-Version-4.jpg/v4-728px-Teach-a-Dog-to-Track-Step-3-Version-4.jpg.webp,https://www.wikihow.com/images/thumb/a/ae/Teach-a-Dog-to-Track-Step-4-Version-4.jpg/v4-728px-Teach-a-Dog-to-Track-Step-4-Version-4.jpg.webp,https://www.wikihow.com/images/thumb/e/ea/Teach-a-Dog-to-Track-Step-5-Version-4.jpg/v4-728px-Teach-a-Dog-to-Track-Step-5-Version-4.jpg.webp,https://www.wikihow.com/images/thumb/c/c3/Teach-a-Dog-to-Track-Step-6-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-6-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/a/ac/Teach-a-Dog-to-Track-Step-7-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-7-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/b/b7/Teach-a-Dog-to-Track-Step-8-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-8-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/1/1f/Teach-a-Dog-to-Track-Step-9-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-9-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/f/f8/Teach-a-Dog-to-Track-Step-10-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-10-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/7/79/Teach-a-Dog-to-Track-Step-11-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-11-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/6/6c/Teach-a-Dog-to-Track-Step-12-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-12-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/4/43/Teach-a-Dog-to-Track-Step-13-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-13-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/5/5a/Teach-a-Dog-to-Track-Step-14-Version-2.jpg/v4-728px-Teach-a-Dog-to-Track-Step-14-Version-2.jpg.webp',
        'Medio', 1, '2025-03-01 12:15:00', '2025-03-05 09:30:00'),
       (6, 'Hacer Un Truco', 'https://i.pinimg.com/736x/5e/d7/c9/5ed7c92e02f227fbc1cf98e97a7274ab.jpg',
        'Cómo enseñar trucos a tu perro.',
        'Paso 1: Entrena a tu perro con recompensas porque es eficaz mejora la relación y evita el miedo.,Step 2: Descubre qué le motiva como comida juguetes o juegos y prémialo al hacer algo bien.,Step 3: Dale la recompensa justo cuando haga la acción para que entienda qué está reforzando.,Paso 4: Usa un clicker para marcar el buen comportamiento y haz que lo asocie con premios.,Paso 5: Combina el clicker con órdenes como siéntate repitiendo hasta que entienda la señal.',
        'https://www.wikihow.com/images/thumb/a/a3/Teach-Your-Dog-Tricks-Step-1-Version-2.jpg/v4-728px-Teach-Your-Dog-Tricks-Step-1-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/4/44/Teach-Your-Dog-Tricks-Step-2-Version-2.jpg/v4-728px-Teach-Your-Dog-Tricks-Step-2-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/d/d0/Teach-Your-Dog-Tricks-Step-3-Version-2.jpg/v4-728px-Teach-Your-Dog-Tricks-Step-3-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/6/6e/Teach-Your-Dog-Tricks-Step-4-Version-2.jpg/v4-728px-Teach-Your-Dog-Tricks-Step-4-Version-2.jpg.webp,https://www.wikihow.com/images/thumb/9/97/Teach-Your-Dog-Tricks-Step-5-Version-2.jpg/v4-728px-Teach-Your-Dog-Tricks-Step-5-Version-2.jpg.webp',
        'Difícil', 1, '2025-04-10 20:06:39', '2025-04-10 20:06:39');
/*!40000 ALTER TABLE `lessons`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pets`
--

DROP TABLE IF EXISTS `pets`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pets`
(
    `id`                int(11)                NOT NULL AUTO_INCREMENT,
    `users_id`          int(11)                NOT NULL,
    `animal_id`         int(11)                NOT NULL,
    `name`              varchar(100)                    DEFAULT NULL,
    `description`       varchar(250)                    DEFAULT NULL,
    `birthdate`         date                            DEFAULT NULL,
    `gender`            enum ('female','male') NOT NULL,
    `strlization`       enum ('yes','no')      NOT NULL DEFAULT 'no',
    `photo`             blob                            DEFAULT NULL,
    `profile_picture`   blob                            DEFAULT NULL,
    `breed`             int(11)                         DEFAULT NULL,
    `emergency_contact` varchar(45)                     DEFAULT NULL,
    `created_at`        datetime               NOT NULL DEFAULT current_timestamp(),
    `updated_at`        datetime                        DEFAULT NULL,
    `deleted_at`        datetime                        DEFAULT NULL,
    `status`            int(11)                NOT NULL DEFAULT 1 COMMENT '1 -- active\n2 -- inactive',
    PRIMARY KEY (`id`, `status`),
    KEY `users_id` (`users_id`),
    KEY `animal_id` (`animal_id`),
    CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `pets_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `breed` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 23
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--

LOCK TABLES `pets` WRITE;
/*!40000 ALTER TABLE `pets`
    DISABLE KEYS */;
INSERT INTO `pets`
VALUES (1, 1, 1, 'Buddy', NULL, '2020-05-10', 'male', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
       (2, 2, 2, 'Whiskers', NULL, '2019-06-15', 'female', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL,
        NULL, 1),
       (3, 3, 3, 'Polly', NULL, '2021-02-01', 'female', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL,
        1),
       (4, 4, 4, 'Thumper', NULL, '2018-11-20', 'male', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL,
        1),
       (5, 5, 5, 'Goldie', NULL, '2022-07-07', 'female', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL,
        1),
       (6, 6, 6, 'Hammy', NULL, '2021-09-09', 'male', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
       (7, 7, 7, 'Speedy', NULL, '2017-03-30', 'female', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL,
        1),
       (8, 8, 8, 'Slither', NULL, '2020-12-25', 'male', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL,
        1),
       (9, 9, 9, 'Thunder', NULL, '2016-08-17', 'male', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL,
        1),
       (10, 10, 10, 'Scaly', NULL, '2019-04-22', 'female', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL,
        NULL, 1),
       (11, 1, 1, 'Buddy', NULL, '2020-05-10', 'male', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
       (12, 2, 2, 'Whiskers', NULL, '2019-06-15', 'female', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL,
        NULL, 1),
       (13, 3, 3, 'Polly', NULL, '2021-02-01', 'female', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL,
        1),
       (14, 4, 4, 'Thumper', NULL, '2018-11-20', 'male', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL,
        1),
       (15, 5, 5, 'Goldie', NULL, '2022-07-07', 'female', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL,
        1),
       (16, 6, 6, 'Hammy', NULL, '2021-09-09', 'male', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
       (17, 7, 7, 'Speedy', NULL, '2017-03-30', 'female', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL,
        1),
       (18, 8, 8, 'Slither', NULL, '2020-12-25', 'male', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL,
        1),
       (19, 9, 9, 'Thunder', NULL, '2016-08-17', 'male', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL,
        1),
       (20, 10, 10, 'Scaly', NULL, '2019-04-22', 'female', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL,
        1),
       (21, 2, 2, 'Whiskers', NULL, '2019-06-14', 'female', 'yes', NULL, NULL, 1, NULL, '2025-04-04 12:55:48',
        '2025-04-04 12:58:52', '2025-04-04 12:58:52', 0),
       (22, 2, 2, 'Whiskers', NULL, '2019-06-14', 'female', 'yes', NULL, NULL, 1, NULL, '2025-04-10 22:44:56',
        '2025-04-10 22:44:56', NULL, 1);
/*!40000 ALTER TABLE `pets`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place_reviews`
--

DROP TABLE IF EXISTS `place_reviews`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place_reviews`
(
    `id`       int(11) NOT NULL AUTO_INCREMENT,
    `place_id` int(11) NOT NULL,
    `user_id`  int(11) NOT NULL,
    `rating`   int(11) NOT NULL,
    `comment`  text             DEFAULT NULL,
    `status`   int(11) NOT NULL DEFAULT 2 COMMENT '2= Active\\n1= deleted',
    PRIMARY KEY (`id`),
    KEY `place_id` (`place_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `place_reviews_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`),
    CONSTRAINT `place_reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 13
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place_reviews`
--

LOCK TABLES `place_reviews` WRITE;
/*!40000 ALTER TABLE `place_reviews`
    DISABLE KEYS */;
INSERT INTO `place_reviews`
VALUES (1, 1, 1, 5, 'Beautiful park with great areas for dogs to play!', 2),
       (2, 1, 3, 5, 'Perfecto!', 2),
       (3, 2, 5, 3, 'Good service but expensive for routine checkups.', 2),
       (4, 3, 7, 5, 'My dog loves this park! Always clean and well-maintained.', 2),
       (5, 4, 9, 2, 'Nice atmosphere but limited space for cats to roam.', 2),
       (6, 6, 2, 4, 'Great variety of animals but crowded on weekends.', 2),
       (7, 7, 4, 5, 'Fantastic reptile exhibits with knowledgeable staff.', 2),
       (8, 8, 6, 3, 'Interesting fish but some tanks need maintenance.', 2),
       (9, 9, 8, 5, 'Excellent facilities for horse boarding and lessons.', 2),
       (10, 10, 10, 4, 'Good selection of pet supplies at reasonable prices.', 2),
       (11, 1, 1, 5, 'Muy bien!', 1),
       (12, 1, 1, 5, 'Muy bien!', 1);
/*!40000 ALTER TABLE `place_reviews`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `places`
--

DROP TABLE IF EXISTS `places`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `places`
(
    `id`          int(11)        NOT NULL AUTO_INCREMENT,
    `name`        varchar(100)   NOT NULL,
    `address`     varchar(255)   NOT NULL,
    `addresscode` varchar(45)    NOT NULL,
    `estado`      int(11)        NOT NULL DEFAULT 1,
    `filter`      varchar(45)             DEFAULT NULL,
    `latitude`    decimal(10, 8) NOT NULL,
    `longitude`   decimal(11, 8) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 27
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places`
--

LOCK TABLES `places` WRITE;
/*!40000 ALTER TABLE `places`
    DISABLE KEYS */;
INSERT INTO `places`
VALUES  (1, 'ILERNA Barcelona - Centro de Formación Profesional',
         'Carrer de Santa Carolina, 1, Horta-Guinardó, Barcelona', '08025', 1, 'pet-friendly', 41.41076798792987, 2.169450073274888),
       (2, 'Clinica Vet Barcelona', 'Carrer de València, 123', '08011', 1, 'Veterinarios', 41.38510000, 2.17340000),
       (3, 'Pet Shop Central', 'Gran Via de les Corts Catalanes, 456', '08015', 1, 'Tiendas', 41.38550000, 2.16320000),
       (4, 'Dog Cafe BCN', 'Carrer de Blai, 20', '08004', 1, 'Pet-Friendly', 41.37310000, 2.16280000),
       (5, 'Parque Canino Sur', 'Parc de l\'Espanya Industrial', '08014', 1, 'Parques', 41.37560000, 2.14020000),
       (6, 'Vet Express', 'Avinguda Diagonal, 600', '08021', 1, 'Veterinarios', 41.39060000, 2.13810000),
       (7, 'Mascotas y Más', 'Carrer de Sants, 300', '08028', 1, 'Tiendas', 41.37530000, 2.12750000),
       (8, 'Bark & Brew', 'Passeig de Sant Joan, 35', '08010', 1, 'Pet-Friendly', 41.39520000, 2.17420000),
       (9, 'Jardines Felices', 'Parc de la Ciutadella', '08003', 1, 'Parques', 41.38890000, 2.19260000),
       (10, 'Animal Care Center', 'Carrer de Mallorca, 200', '08036', 0, 'Veterinarios', 41.39170000, 2.15990000),
       (11, 'Todo para Tu Mascota', 'Carrer de Girona, 90', '08009', 1, 'Tiendas', 41.39730000, 2.17500000),
       (12, 'Café Perruno', 'Carrer de Pau Claris, 150', '08037', 1, 'Pet-Friendly', 41.39580000, 2.16730000),
       (13, 'Plaza de las Mascotas', 'Parc Joan Miró', '08015', 1, 'Parques', 41.38050000, 2.14960000),
       (14, 'Gardenia', '25, Barcelona, Catalunya', '08018', 1, 'Parques', 41.39005060, 2.18160052),
       (15, 'Dogpital', 'Eixample, Barcelona, Cataluña', '08013', 1, 'Veterinarios', 41.40343756, 2.18022387),
(16, 'Dacs Veterinària', 'Carrer de Lepant, 422, Horta-Guinardó, Barcelona', '08025', 1, 'Veterinarios', 41.411028576214186, 2.168209925307302),
(17, 'Centro Veterinario Animalis', 'C/ de Padilla, 353, Horta-Guinardó, Barcelona', '08025', 1, 'Veterinarios', 41.41035980879314, 2.170856357916645),
(18, 'Clínica Veterinaria Sant Andreu', 'Carrer d''Irlanda, 5-9, Sant Andreu, Barcelona', '08030', 1, 'Veterinarios', 41.43063443133307, 2.1859368420333882),
(19, 'Centre Veterinari Les Corts', 'Carrer de Nicaragua, 90, Les Corts, Barcelona', '08029', 1, 'Veterinarios', 41.38510248851118, 2.1391943044311867),
(20, 'Clínica Veterinària Badalona', 'Carrer de Sant Miquel, 35, bj, Badalona, Barcelona', '08911', 1, 'Veterinarios', 41.44974167696423, 2.2493174179232462),
(21, 'Centro Veterinario de BELLVITGE', 'Av. d''Europa, 217, L''Hospitalet de Llobregat, Barcelona', '08907', 1, 'Veterinarios', 41.356443226005865, 2.1124804015164793),
        (22, 'LoveAnimals Sagrada Familia', 'Carrer de Còrsega, 567, L''Eixample, Barcelona', '08025', 1, 'Tiendas', 41.40689621328974, 2.172894744948339),
        (23, 'Zoo Condal', 'Carrer de Sant Antoni Maria Claret, 87, Horta-Guinardó, Barcelona', '08025', 1, 'Tiendas', 41.40824429904786, 2.1702020925730063),
        (24, 'Kiwoko. Mundo Animal', 'Carrer d''Aribau, 21, L''Eixample, Barcelona', '08011', 1,
         'Tiendas', 41.38687864476977, 2.1611846455625296),
        (25, 'Barkcelona El Born', 'Carrer de l''Espaseria, 4, Ciutat Vella, Barcelona', '08003', 1,
         'Tiendas', 41.38332166475613, 2.1822319344721395),
        (26, 'RONDANIMAL´S', 'Ronda de Sant Antoni de Llefià, 99, Badalona, Barcelona', '08913', 1,
         'Tiendas', 41.44144465006886, 2.2178461115121184),
        (27, 'Tiendanimal', 'Avinguda de la Granvia de l’Hospitalet, 75, Local B4, Barcelona', '08908 J6', 1,
         'Tiendas', 41.35885955688608, 2.129449513427789),
        (28, 'Peluqueria Euro5', 'Carrer de Cartagena, 311, L''Eixample, Barcelona', '08025', 1,
         'Pet-Friendly', 41.410509277388, 2.175032890588969),
        (29, 'Peluqueria | Samoa Estilistes Canins', 'Carrer de la Indústria, 121, L''Eixample, Barcelona', '08025', 1,
         'Pet-Friendly', 41.40788680210208, 2.1717661423850103),
        (30, 'Hotel ILUNION Bel Art', 'Carrer de Lepant, 406, Horta-Guinardó, Barcelona', '08025', 1,
         'Pet-Friendly', 41.41016544089079, 2.169531904364164),
        (31, 'Hotel Praktik Garden', 'Carrer de la Diputació, 325, L''Eixample, Barcelona', '08009', 1,
         'Pet-Friendly', 41.39388476045768, 2.171395961978904),
        (32, 'Picnic Restaurant', 'Carrer del Comerç, 1, Ciutat Vella, Barcelona', '08003', 1,
         'Pet-Friendly', 41.38862206266453, 2.1816115000365515),
        (33, 'Área de perros de la playa de Levante', 'Passeig Marítim del Bogatell, 3574, Sant Martí, Barcelona', '08019', 1,
         'Pet-Friendly', 41.405498842183654, 2.2197216117104492),
        (34, 'Àrea per gossos', 'Passeig de Calvell, 10, Sant Martí, Barcelona', '08005', 1,
         'Parques', 41.3970370287122, 2.206553766960531),
        (35, 'Área para perros - Jardines del Bajo Guinardó', 'Carrer de Lepant, 387, Horta-Guinardó, Barcelona', '08025', 1,
         'Parques', 41.40898079612203, 2.169098780488563),
        (36, 'Área para perros', 'Sant Martí, Barcelona', '08018', 1,
         'Parques', 41.41187545985453, 2.1952829366426903),
        (37, 'Área para perros', 'Avinguda de la Platja, 8, Sant Adrià de Besòs, Barcelona', '08930', 1,
         'Parques', 41.42780883201489, 2.225364140889936),
        (38, 'Pipican', 'Avinguda Meridiana, 79, Sant Martí, Barcelona', '08026', 1,
         'Parques', 41.404945676010364, 2.1864646570119852),
        (39, 'Parque para perros', 'Carrer de Vinyals, 74, Horta-Guinardó, Barcelona', '08041', 1,
         'Parques', 41.41891460414883, 2.1759636872629464),
        (40, 'EL MEU AMIC', 'Botiga 1, Carrer de l''Agricultura, 300-302, Sant Martí, Barcelona', '08020', 1,
         'Pet-Friendly', 41.42034335379689, 2.1985440214180065);
/*!40000 ALTER TABLE `places`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations`
(
    `reservation_id`         int(11)                                              NOT NULL AUTO_INCREMENT,
    `user_id`                int(11)                                              NOT NULL,
    `caregiver_id`           int(11)                                              NOT NULL,
    `pet_id`                 int(11)                                              NOT NULL,
    `reservation_date`       datetime                                             NOT NULL,
    `status`                 enum ('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
    `details`                varchar(100)                                                  DEFAULT NULL,
    `reservationCancelledAt` datetime                                                      DEFAULT NULL,
    `reservationCompletedAt` datetime                                                      DEFAULT NULL,
    PRIMARY KEY (`reservation_id`),
    KEY `user_id` (`user_id`),
    KEY `caregiver_id` (`caregiver_id`),
    KEY `pet_id` (`pet_id`),
    CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
    CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`caregiver_id`) REFERENCES `users` (`id`),
    CONSTRAINT `reservations_ibfk_3` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 16
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations`
    DISABLE KEYS */;
INSERT INTO `reservations`
VALUES (1, 1, 2, 3, '2025-04-10 10:00:00', 'pending', 'Need dog walking for 1 hour in Central Park', NULL, NULL),
       (2, 2, 3, 4, '2025-04-11 11:30:00', 'confirmed', 'Cat sitting for weekend while away', NULL,
        '2025-04-12 11:30:00'),
       (3, 3, 4, 5, '2025-04-12 09:15:00', 'completed', 'Daily fish tank maintenance for 1 week', NULL,
        '2025-04-13 09:15:00'),
       (4, 4, 5, 6, '2025-04-13 14:45:00', 'cancelled', 'Hamster care during vacation', '2025-04-12 14:45:00', NULL),
       (5, 5, 6, 7, '2025-04-14 16:30:00', 'pending', 'Turtle tank cleaning service', NULL, NULL),
       (6, 6, 7, 8, '2025-04-15 08:00:00', 'confirmed', NULL, NULL, NULL),
       (7, 7, 8, 9, '2025-04-16 12:20:00', 'completed', NULL, NULL, NULL),
       (8, 8, 9, 10, '2025-04-17 15:10:00', 'pending', NULL, NULL, NULL),
       (9, 9, 10, 1, '2025-04-18 10:50:00', 'confirmed', NULL, NULL, NULL),
       (10, 10, 1, 2, '2025-04-19 13:40:00', 'completed', NULL, NULL, NULL),
       (11, 1, 3, 1, '2025-04-20 09:00:00', 'pending', 'Dog training session - basic commands', NULL, NULL),
       (12, 4, 1, 4, '2025-04-21 14:00:00', 'confirmed', 'Rabbit nail trimming and health check', NULL, NULL),
       (13, 7, 4, 7, '2025-04-22 11:00:00', 'pending', 'Turtle tank deep cleaning', NULL, NULL),
       (14, 9, 2, 9, '2025-04-23 16:30:00', 'confirmed', 'Horse grooming and exercise', NULL, NULL),
       (15, 2, 5, 2, '2025-04-24 10:15:00', 'completed', 'Cat sitting for 3 days', NULL, '2025-04-27 10:15:00');
/*!40000 ALTER TABLE `reservations`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users`
(
    `id`            int(11)                   NOT NULL AUTO_INCREMENT,
    `firstname`     varchar(100)              NOT NULL,
    `lastname`      varchar(100)              NOT NULL,
    `email`         varchar(100)              NOT NULL,
    `password`      varchar(255)              NOT NULL,
    `address`       varchar(255)              NOT NULL,
    `rol`           int(11)                   NOT NULL DEFAULT 2,
    `telephone`     varchar(45)                        DEFAULT NULL,
    `gender`        enum ('female','male','') NOT NULL,
    `photo`         blob                               DEFAULT NULL,
    `state`         int(11)                   NOT NULL DEFAULT 1,
    `postalcode`    varchar(20)               NOT NULL,
    `birthdate`     date                               DEFAULT NULL,
    `languages`     varchar(100)                       DEFAULT 'English',
    `emergencynum`  varchar(45)                        DEFAULT NULL,
    `paymentmethod` enum ('buzime','tarjeta','paypal') DEFAULT NULL,
    `city`          varchar(100)                       DEFAULT NULL,
    `latitud`       decimal(10, 7)                     DEFAULT NULL,
    `longitud`      decimal(10, 7)                     DEFAULT NULL,
    `createdat`     datetime                  NOT NULL DEFAULT current_timestamp(),
    `updatedAt`     datetime                           DEFAULT NULL,
    `deletedAt`     datetime                           DEFAULT NULL,
    `username`      varchar(100)                       DEFAULT NULL,
    `Token`         longtext                           DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 19
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users`
    DISABLE KEYS */;
INSERT INTO `users`
VALUES (1, 'Alice', 'Smith', 'alice@example.com', 'hashedpassword1', '123 Maple Street, New York, NY', 1,
        '212-555-1234', 'female', NULL, 1, '10001', '1990-01-01', 'English, Spanish', '212-555-4321', 'tarjeta',
        'New York', 40.7128000, -74.0060000, '2025-04-02 17:27:46', '2025-04-03 19:32:58', NULL, 'alicesmith', NULL),
       (2, 'Bob', 'Johnson', 'bob@example.com', 'hashedpassword2', '456 Oak Avenue, Los Angeles, CA', 2, '310-555-2345',
        'male', NULL, 1, '90001', '1985-05-15', 'English', '310-555-5432', 'buzime', 'Los Angeles', 34.0522000,
        -118.2437000, '2025-04-02 17:27:46', NULL, NULL, 'bobjohnson', NULL),
       (3, 'Charlie', 'Brown', 'charlie@example.com', 'hashedpassword3', '789 Blvd, City', 1, '1231231234', 'male',
        NULL, 1, '10003', '1992-08-22', 'English', '7654321098', 'tarjeta', NULL, 51.5074000, -0.1278000,
        '2025-04-02 17:27:46', NULL, NULL, NULL, NULL),
       (4, 'Daisy', 'Miller', 'daisy@example.com', '$2a$10$odQuO5pzRbnXI2pgVlseqOWrfSeBjP2pnQWZ5T.P4KJZ0mdAtheFa', '101 Lane, City', 0, '2345678901', 'female', NULL,
        1, '10004', '1995-12-11', 'English', '6543210987', 'buzime', NULL, 48.8566000, 2.3522000, '2025-04-02 17:27:46',
        '2025-04-03 19:33:01', NULL, NULL, NULL),
       (5, 'Ethan', 'Hunt', 'ethan@example.com', 'hashedpassword5', '202 Road, City', 2, '3456789012', 'male', NULL, 2,
        '10005', '1988-07-30', 'English', '5432109876', 'tarjeta', NULL, -33.8688000, 151.2093000,
        '2025-04-02 17:27:46', NULL, NULL, NULL, NULL),
       (6, 'Fiona', 'Clark', 'fiona@example.com', 'hashedpassword6', '303 Circle, City', 3, '4567890123', 'female',
        NULL, 2, '10006', '1997-09-15', 'English', '4321098765', 'buzime', NULL, 35.6895000, 139.6917000,
        '2025-04-02 17:27:46', '2025-04-03 18:32:08', '2025-04-03 18:32:08', NULL, NULL),
       (7, 'George', 'Lee', 'george@example.com', 'hashedpassword7', '404 Way, City', 3, '5678901234', 'male', NULL, 2,
        '10007', '1993-04-05', 'English', '3210987654', 'tarjeta', NULL, 37.7749000, -122.4194000,
        '2025-04-02 17:27:46', '2025-04-03 18:42:14', '2025-04-03 18:42:14', NULL, NULL),
       (8, 'Hannah', 'Taylor', 'hannah@example.com', 'hashedpassword8', '505 Path, City', 2, '6789012345', 'female',
        NULL, 2, '10008', '1991-06-20', 'English', '2109876543', 'buzime', NULL, 55.7558000, 37.6173000,
        '2025-04-02 17:27:46', NULL, NULL, NULL, NULL),
       (9, 'Ian', 'Moore', 'ian@example.com', 'hashedpassword9', '606 Trail, City', 3, '7890123456', 'male', NULL, 1,
        '10009', '1986-03-12', 'English', '1098765432', 'tarjeta', NULL, 41.9028000, 12.4964000, '2025-04-02 17:27:46',
        NULL, NULL, NULL, NULL),
       (10, 'Jane', 'White', 'jane@example.com', 'hashedpassword10', '707 Drive, City', 1, '8901234567', 'female', NULL,
        1, '10010', '1999-11-25', 'English', '9876543210', 'buzime', NULL, 52.5200000, 13.4050000,
        '2025-04-02 17:27:46', NULL, NULL, NULL, NULL),
       (11, 'gustavo', 'gonzales', 'gusgonza@yowpet.com', 'gusgonza', 'c/ camp d\'arriassa', 2, '123456789', 'male',
        NULL, 1, '12345', '1997-12-12', NULL, NULL, 'paypal', 'Barcelona', NULL, NULL, '2025-04-03 18:12:00',
        '2025-04-03 18:12:00', NULL, NULL, NULL),
       (12, 'Karen', 'Wilson', 'karen@example.com', 'hashedpassword11', '789 Pine Road, Chicago, IL', 2, '312-555-3456',
        'female', NULL, 1, '60601', '1988-11-22', 'English, French', '312-555-6543', 'paypal', 'Chicago', 41.8781000,
        -87.6298000, '2025-03-15 10:00:00', NULL, NULL, 'karenwilson', NULL),
       (13, 'Michael', 'Davis', 'michael@example.com', 'hashedpassword12', '101 Elm Lane, Houston, TX', 1,
        '713-555-4567', 'male', NULL, 1, '77001', '1993-07-18', 'English, Spanish', '713-555-7654', 'tarjeta',
        'Houston', 29.7604000, -95.3698000, '2025-03-20 11:30:00', NULL, NULL, 'michaeldavis', NULL),
       (14, 'Sarah', 'Martinez', 'sarah@example.com', 'hashedpassword13', '202 Cedar Blvd, Phoenix, AZ', 3,
        '602-555-5678', 'female', NULL, 1, '85001', '1995-04-30', 'English', '602-555-8765', 'buzime', 'Phoenix',
        33.4484000, -112.0740000, '2025-04-01 09:15:00', NULL, NULL, 'sarahmartinez', NULL),
       (15, 'David', 'Anderson', 'david@example.com', 'hashedpassword14', '303 Birch Street, Philadelphia, PA', 2,
        '215-555-6789', 'male', NULL, 1, '19101', '1987-09-12', 'English, German', '215-555-9876', 'tarjeta',
        'Philadelphia', 39.9526000, -75.1652000, '2025-04-05 14:45:00', NULL, NULL, 'davidanderson', NULL),
       (16, 'Manuel', 'Pharon', 'mano@yowpet.com', '$2a$10$uePByNH2Teo02fgLrNQ4YuEX7FbAFPlKy7paTxTCBr4Yz5.QFyVDK',
        'No especificado', 2, '', '', _binary 'No especificado', 1, '0', NULL, NULL, NULL, NULL, 'No especificado',
        NULL, NULL, '2025-04-10 17:28:23', '2025-04-10 17:28:23', NULL, 'Mano',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNYW5vIiwiaWF0IjoxNzQ0NDk2ODE4LCJleHAiOjE3NDQ1MDA0MTh9.OVAFoDu-MrteSWGx-ursG6-X3H3zVIbo-bJkYwsshBk'),
       (17, 'Gustavo', 'Gonzales', 'gusgonza@gmail.com', '$2a$10$odQuO5pzRbnXI2pgVlseqOWrfSeBjP2pnQWZ5T.P4KJZ0mdAtheFa',
        'No especificado', 2, '', '', _binary 'No especificado', 1, '0', NULL, NULL, NULL, NULL, 'No especificado',
        NULL, NULL, '2025-05-08 10:55:27', '2025-05-09 11:49:09', NULL, NULL,
        null),
       (18, 'Denys', 'Chechul', 'denys@gmail.com', '$2a$10$odQuO5pzRbnXI2pgVlseqOWrfSeBjP2pnQWZ5T.P4KJZ0mdAtheFa',
        'No especificado', 2, '', '', _binary 'No especificado', 1, '0', NULL, NULL, NULL, NULL, 'No especificado',
        NULL, NULL, '2025-05-08 10:55:27', '2025-05-09 11:49:09', NULL, NULL,
        null);
/*!40000 ALTER TABLE `users`
    ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE = @OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;

-- Dump completed on 2025-05-09 12:46:28
