CREATE DATABASE  IF NOT EXISTS `yowpet` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `yowpet`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: yowpet
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `allergies`
--

DROP TABLE IF EXISTS `allergies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allergies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `photo` blob DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergies`
--

LOCK TABLES `allergies` WRITE;
/*!40000 ALTER TABLE `allergies` DISABLE KEYS */;
INSERT INTO `allergies` VALUES (1,'Insects',NULL),(2,'Pollen',NULL),(3,'Dust Mites',NULL),(4,'Mold',NULL),(5,'Pet Dander',NULL),(6,'Certain Foods',NULL),(7,'Medications',NULL),(8,'Latex',NULL),(9,'Insect Stings',NULL),(10,'Cockroaches',NULL);
/*!40000 ALTER TABLE `allergies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animalcategory`
--

DROP TABLE IF EXISTS `animalcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animalcategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animalcategory`
--

LOCK TABLES `animalcategory` WRITE;
/*!40000 ALTER TABLE `animalcategory` DISABLE KEYS */;
INSERT INTO `animalcategory` VALUES (3,'Bird'),(2,'Cat'),(14,'Chinchilla'),(1,'Dog'),(13,'Ferret'),(5,'Fish'),(12,'Guinea Pig'),(6,'Hamster'),(15,'Hermit Crab'),(9,'Horse'),(10,'Lizard'),(4,'Rabbit'),(8,'Snake'),(7,'Turtle');
/*!40000 ALTER TABLE `animalcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `breed`
--

DROP TABLE IF EXISTS `breed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `breed` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `categoria` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoria` (`categoria`),
  CONSTRAINT `breed_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `animalcategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `breed`
--

LOCK TABLES `breed` WRITE;
/*!40000 ALTER TABLE `breed` DISABLE KEYS */;
INSERT INTO `breed` VALUES (1,'Golden Retriever',1),(2,'Persian',2),(3,'African Grey Parrot',3),(4,'Bunny',4),(5,'Goldfish',5),(6,'Dwarf Hamster',6),(7,'Red-Eared Slider',7),(8,'Python',8),(9,'Arabian Horse',9),(10,'Gecko',10),(11,'Labrador Retriever',1),(12,'German Shepherd',1),(13,'Siamese',2),(14,'Maine Coon',2),(15,'firess',4),(16,'Lovebird',3),(17,'Lionhead',4),(18,'Flemish Giant',4),(19,'Betta',5),(20,'Angelfish',5);
/*!40000 ALTER TABLE `breed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caregiver_workers`
--

DROP TABLE IF EXISTS `caregiver_workers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caregiver_workers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `speciality` varchar(255) NOT NULL,
  `experience_years` int(11) NOT NULL CHECK (`experience_years` >= 0),
  `hourly_rate` decimal(10,2) NOT NULL CHECK (`hourly_rate` >= 0),
  `rating` decimal(3,2) DEFAULT NULL CHECK (`rating` >= 0 and `rating` <= 5),
  `review` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `service_worker` varchar(255) DEFAULT NULL,
  `status_active_work` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_caregiver_user` (`user_id`),
  KEY `idx_caregiver_status` (`status_active_work`),
  CONSTRAINT `fk_caregiver_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caregiver_workers`
--

LOCK TABLES `caregiver_workers` WRITE;
/*!40000 ALTER TABLE `caregiver_workers` DISABLE KEYS */;
INSERT INTO `caregiver_workers` VALUES (1,3,'Dog Walking and Training',5,25.00,4.80,'Excellent with large breeds!','Certified dog trainer with experience in obedience training','Dog Walker, Trainer',1,'2025-01-15 08:00:00'),(2,5,'Exotic Pet Care',3,30.00,4.65,'Very knowledgeable about reptiles','Specialized in reptiles and exotic pets','Exotic Pet Sitter',1,'2025-02-10 09:30:00'),(3,8,'Cat Specialist',7,20.00,4.90,'My cats love her!','Feline behavior specialist with veterinary assistant experience','Cat Sitter, Groomer',1,'2025-03-05 10:15:00'),(4,10,'Small Mammal Expert',4,18.00,4.75,'Takes great care of my rabbits','Experienced with rabbits, guinea pigs, and hamsters','Small Pet Sitter',1,'2025-01-20 13:00:00'),(5,2,'All-Pet Caregiver',6,22.00,4.85,'Reliable for all types of pets','General pet care with first aid certification','Pet Sitter, Walker',0,'2025-02-28 15:45:00');
/*!40000 ALTER TABLE `caregiver_workers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ilness`
--

DROP TABLE IF EXISTS `ilness`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ilness` (
  `pet` int(11) DEFAULT NULL,
  `allergy` int(11) DEFAULT NULL,
  `state` int(11) NOT NULL DEFAULT 1 COMMENT '1= still affected\n2= Healed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ilness`
--

LOCK TABLES `ilness` WRITE;
/*!40000 ALTER TABLE `ilness` DISABLE KEYS */;
INSERT INTO `ilness` VALUES (1,0,1),(1,1,2),(2,2,1),(2,3,1),(3,4,2),(3,5,1),(4,6,1),(4,7,2),(5,8,1),(5,9,2);
/*!40000 ALTER TABLE `ilness` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_reviews`
--

DROP TABLE IF EXISTS `lesson_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lesson_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` double NOT NULL CHECK (`rating` >= 0 and `rating` <= 5),
  `comment` text DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1 CHECK (`status` in (0,1)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_lesson_reviews_lesson` (`lesson_id`),
  KEY `idx_lesson_reviews_user` (`user_id`),
  CONSTRAINT `fk_lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_reviews`
--

LOCK TABLES `lesson_reviews` WRITE;
/*!40000 ALTER TABLE `lesson_reviews` DISABLE KEYS */;
INSERT INTO `lesson_reviews` VALUES (1,1,1,5,'Great introduction to dog training! Very clear instructions.',1,'2025-01-12 13:30:00','2025-01-12 13:30:00'),(2,1,4,4.9,'Perfecto!',0,'2025-01-14 15:45:00','2025-04-11 19:39:02'),(3,2,7,5,'Finally understand why my cat behaves the way it does!',1,'2025-01-18 09:20:00','2025-01-18 09:20:00'),(4,3,9,3,'Good basics but needs more detail on water chemistry.',1,'2025-02-08 11:10:00','2025-02-08 11:10:00'),(5,4,2,5,'Perfect for new rabbit owners like me!',1,'2025-02-22 14:30:00','2025-02-22 14:30:00'),(6,1,1,4.7,'Muy bien!',1,'2025-04-11 19:39:55','2025-04-11 19:39:55');
/*!40000 ALTER TABLE `lesson_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `status` tinyint(4) DEFAULT 1 CHECK (`status` in (0,1)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES (1,'Basic Dog Obedience Training','Learn the fundamentals of training your dog including sit, stay, and come commands.',1,'2025-01-10 09:00:00','2025-01-10 09:00:00'),(2,'Cat Behavior 101','Understanding feline behavior and how to create a cat-friendly environment.',0,'2025-01-15 10:30:00','2025-04-10 20:10:47'),(3,'Aquarium Setup for Beginners','Step-by-step guide to setting up your first freshwater aquarium.',1,'2025-02-05 13:00:00','2025-02-10 15:30:00'),(4,'Small Mammal Care Basics','Essential care tips for rabbits, guinea pigs, and hamsters.',1,'2025-02-20 08:00:00','2025-02-25 10:45:00'),(5,'Avian Nutrition Guide','Proper diet and nutrition for pet birds of all sizes.',1,'2025-03-01 12:15:00','2025-03-05 09:30:00'),(6,'M13','Proyecto de desarrollo de aplicaciones multiplataforma',1,'2025-04-10 20:06:39','2025-04-10 20:06:39'),(7,'M08','Programación multimedia y dispositivos móviles',1,'2025-04-10 20:08:00','2025-04-10 20:08:00');
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pets`
--

DROP TABLE IF EXISTS `pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `animal_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` enum('female','male') NOT NULL,
  `strlization` enum('yes','no') NOT NULL DEFAULT 'no',
  `photo` blob DEFAULT NULL,
  `profile_picture` blob DEFAULT NULL,
  `breed` int(11) DEFAULT NULL,
  `emergency_contact` varchar(45) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1 -- active\n2 -- inactive',
  PRIMARY KEY (`id`,`status`),
  KEY `users_id` (`users_id`),
  KEY `animal_id` (`animal_id`),
  CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pets_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `breed` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--

LOCK TABLES `pets` WRITE;
/*!40000 ALTER TABLE `pets` DISABLE KEYS */;
INSERT INTO `pets` VALUES (1,1,1,'Buddy',NULL,'2020-05-10','male','yes',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(2,2,2,'Whiskers',NULL,'2019-06-15','female','yes',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(3,3,3,'Polly',NULL,'2021-02-01','female','yes',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(4,4,4,'Thumper',NULL,'2018-11-20','male','yes',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(5,5,5,'Goldie',NULL,'2022-07-07','female','yes',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(6,6,6,'Hammy',NULL,'2021-09-09','male','yes',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(7,7,7,'Speedy',NULL,'2017-03-30','female','yes',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(8,8,8,'Slither',NULL,'2020-12-25','male','yes',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(9,9,9,'Thunder',NULL,'2016-08-17','male','yes',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(10,10,10,'Scaly',NULL,'2019-04-22','female','yes',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(11,1,1,'Buddy',NULL,'2020-05-10','male','no',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(12,2,2,'Whiskers',NULL,'2019-06-15','female','no',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(13,3,3,'Polly',NULL,'2021-02-01','female','no',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(14,4,4,'Thumper',NULL,'2018-11-20','male','no',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(15,5,5,'Goldie',NULL,'2022-07-07','female','no',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(16,6,6,'Hammy',NULL,'2021-09-09','male','no',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(17,7,7,'Speedy',NULL,'2017-03-30','female','no',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(18,8,8,'Slither',NULL,'2020-12-25','male','no',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(19,9,9,'Thunder',NULL,'2016-08-17','male','no',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(20,10,10,'Scaly',NULL,'2019-04-22','female','no',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),(21,2,2,'Whiskers',NULL,'2019-06-14','female','yes',NULL,NULL,1,NULL,'2025-04-04 12:55:48','2025-04-04 12:58:52','2025-04-04 12:58:52',0),(22,2,2,'Whiskers',NULL,'2019-06-14','female','yes',NULL,NULL,1,NULL,'2025-04-10 22:44:56','2025-04-10 22:44:56',NULL,1);
/*!40000 ALTER TABLE `pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place_reviews`
--

DROP TABLE IF EXISTS `place_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `place_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 2 COMMENT '2= Active\\n1= deleted',
  PRIMARY KEY (`id`),
  KEY `place_id` (`place_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `place_reviews_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`),
  CONSTRAINT `place_reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place_reviews`
--

LOCK TABLES `place_reviews` WRITE;
/*!40000 ALTER TABLE `place_reviews` DISABLE KEYS */;
INSERT INTO `place_reviews` VALUES (1,1,1,5,'Beautiful park with great areas for dogs to play!',2),(2,1,3,5,'Perfecto!',2),(3,2,5,3,'Good service but expensive for routine checkups.',2),(4,3,7,5,'My dog loves this park! Always clean and well-maintained.',2),(5,4,9,2,'Nice atmosphere but limited space for cats to roam.',2),(6,6,2,4,'Great variety of animals but crowded on weekends.',2),(7,7,4,5,'Fantastic reptile exhibits with knowledgeable staff.',2),(8,8,6,3,'Interesting fish but some tanks need maintenance.',2),(9,9,8,5,'Excellent facilities for horse boarding and lessons.',2),(10,10,10,4,'Good selection of pet supplies at reasonable prices.',2),(11,1,1,5,'Muy bien!',1),(12,1,1,5,'Muy bien!',1);
/*!40000 ALTER TABLE `place_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `places`
--

DROP TABLE IF EXISTS `places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `places` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `addresscode` varchar(45) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1,
  `filter` varchar(45) DEFAULT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places`
--

LOCK TABLES `places` WRITE;
/*!40000 ALTER TABLE `places` DISABLE KEYS */;
INSERT INTO `places` VALUES (1,'Central Park','123 Park Ave, City','P1001',1,NULL,0.00000000,0.00000000),(2,'Pet Hospital','456 Vet St, City','P1002',1,NULL,0.00000000,0.00000000),(3,'Dog Park','789 Bark Blvd, City','P1003',1,NULL,0.00000000,0.00000000),(4,'Cat Café','101 Meow Lane, City','P1004',1,NULL,0.00000000,0.00000000),(5,'El Corte Inglés Plaza de Catalunya','Pl. de Catalunya, 14, L\'Eixample, Barcelona','08002',0,NULL,0.00000000,0.00000000),(6,'Zoo','303 Safari Circle, City','P1006',1,NULL,0.00000000,0.00000000),(7,'Reptile House','404 Slither Way, City','P1007',1,NULL,0.00000000,0.00000000),(8,'Fish Aquarium','505 Swim Path, City','P1008',1,NULL,0.00000000,0.00000000),(9,'Horse Stable','606 Gallop Trail, City','P1009',1,NULL,0.00000000,0.00000000),(10,'Pet Store','707 Treat Drive, City','P1010',1,NULL,0.00000000,0.00000000),(11,'ILERNA Barcelona - Centro de Formación Profesional','Carrer de Santa Carolina, 1, Horta-Guinardó, Barcelona','08025',1,NULL,0.00000000,0.00000000),(12,'Clinica Vet Barcelona','Carrer de València, 123','08011',1,'Veterinarios',41.38510000,2.17340000),(13,'Pet Shop Central','Gran Via de les Corts Catalanes, 456','08015',1,'Tiendas',41.38550000,2.16320000),(14,'Dog Cafe BCN','Carrer de Blai, 20','08004',1,'Pet-Friendly',41.37310000,2.16280000),(15,'Parque Canino Sur','Parc de l\'Espanya Industrial','08014',1,'Parques',41.37560000,2.14020000),(16,'Vet Express','Avinguda Diagonal, 600','08021',1,'Veterinarios',41.39060000,2.13810000),(17,'Mascotas y Más','Carrer de Sants, 300','08028',1,'Tiendas',41.37530000,2.12750000),(18,'Bark & Brew','Passeig de Sant Joan, 35','08010',1,'Pet-Friendly',41.39520000,2.17420000),(19,'Jardines Felices','Parc de la Ciutadella','08003',1,'Parques',41.38890000,2.19260000),(20,'Animal Care Center','Carrer de Mallorca, 200','08036',0,'Veterinarios',41.39170000,2.15990000),(21,'Todo para Tu Mascota','Carrer de Girona, 90','08009',1,'Tiendas',41.39730000,2.17500000),(22,'Café Perruno','Carrer de Pau Claris, 150','08037',1,'Pet-Friendly',41.39580000,2.16730000),(23,'Plaza de las Mascotas','Parc Joan Miró','08015',1,'Parques',41.38050000,2.14960000),(24,'ILERNA Barcelona - Centro de Formación Profesional','Carrer de Santa Carolina, 1, Horta-Guinardó, Barcelona','08025',1,'pet-friendly',10.00000000,10.00000000),(25,'Gardenia','25, Barcelona, Catalunya','08018',1,'Parques',41.39005060,2.18160052),(26,'Dogpital','Eixample, Barcelona, Cataluña','08013',1,'Veterinarios',41.40343756,2.18022387),(27,'Hospital','26, Cerdanyola del Vallès, Catalunya','08290',1,'Veterinarios',41.49311283,2.13306561),(28,'Ilerna','4, Barcelona, Catalunya','08025',1,'Pet-Friendly',41.41066548,2.16922615);
/*!40000 ALTER TABLE `places` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `reservation_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `caregiver_id` int(11) NOT NULL,
  `pet_id` int(11) NOT NULL,
  `reservation_date` datetime NOT NULL,
  `status` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
  `details` varchar(100) DEFAULT NULL,
  `reservationCancelledAt` datetime DEFAULT NULL,
  `reservationCompletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `user_id` (`user_id`),
  KEY `caregiver_id` (`caregiver_id`),
  KEY `pet_id` (`pet_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`caregiver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reservations_ibfk_3` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,1,2,3,'2025-04-10 10:00:00','pending','Need dog walking for 1 hour in Central Park',NULL,NULL),(2,2,3,4,'2025-04-11 11:30:00','confirmed','Cat sitting for weekend while away',NULL,'2025-04-12 11:30:00'),(3,3,4,5,'2025-04-12 09:15:00','completed','Daily fish tank maintenance for 1 week',NULL,'2025-04-13 09:15:00'),(4,4,5,6,'2025-04-13 14:45:00','cancelled','Hamster care during vacation','2025-04-12 14:45:00',NULL),(5,5,6,7,'2025-04-14 16:30:00','pending','Turtle tank cleaning service',NULL,NULL),(6,6,7,8,'2025-04-15 08:00:00','confirmed',NULL,NULL,NULL),(7,7,8,9,'2025-04-16 12:20:00','completed',NULL,NULL,NULL),(8,8,9,10,'2025-04-17 15:10:00','pending',NULL,NULL,NULL),(9,9,10,1,'2025-04-18 10:50:00','confirmed',NULL,NULL,NULL),(10,10,1,2,'2025-04-19 13:40:00','completed',NULL,NULL,NULL),(11,1,3,1,'2025-04-20 09:00:00','pending','Dog training session - basic commands',NULL,NULL),(12,4,1,4,'2025-04-21 14:00:00','confirmed','Rabbit nail trimming and health check',NULL,NULL),(13,7,4,7,'2025-04-22 11:00:00','pending','Turtle tank deep cleaning',NULL,NULL),(14,9,2,9,'2025-04-23 16:30:00','confirmed','Horse grooming and exercise',NULL,NULL),(15,2,5,2,'2025-04-24 10:15:00','completed','Cat sitting for 3 days',NULL,'2025-04-27 10:15:00');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `rol` int(11) NOT NULL DEFAULT 2,
  `telephone` varchar(45) DEFAULT NULL,
  `gender` enum('female','male','') NOT NULL,
  `photo` blob DEFAULT NULL,
  `state` int(11) NOT NULL DEFAULT 1,
  `postalcode` varchar(20) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `languages` varchar(100) DEFAULT 'English',
  `emergencynum` varchar(45) DEFAULT NULL,
  `paymentmethod` enum('buzime','tarjeta','paypal') DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `latitud` decimal(10,7) DEFAULT NULL,
  `longitud` decimal(10,7) DEFAULT NULL,
  `createdat` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `Token` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Alice','Smith','alice@example.com','hashedpassword1','123 Maple Street, New York, NY',1,'212-555-1234','female',NULL,1,'10001','1990-01-01','English, Spanish','212-555-4321','tarjeta','New York',40.7128000,-74.0060000,'2025-04-02 17:27:46','2025-04-03 19:32:58',NULL,'alicesmith',NULL),(2,'Bob','Johnson','bob@example.com','hashedpassword2','456 Oak Avenue, Los Angeles, CA',2,'310-555-2345','male',NULL,1,'90001','1985-05-15','English','310-555-5432','buzime','Los Angeles',34.0522000,-118.2437000,'2025-04-02 17:27:46',NULL,NULL,'bobjohnson',NULL),(3,'Charlie','Brown','charlie@example.com','hashedpassword3','789 Blvd, City',1,'1231231234','male',NULL,1,'10003','1992-08-22','English','7654321098','tarjeta',NULL,51.5074000,-0.1278000,'2025-04-02 17:27:46',NULL,NULL,NULL,NULL),(4,'Daisy','Miller','daisy@example.com','hashedpassword4','101 Lane, City',0,'2345678901','female',NULL,1,'10004','1995-12-11','English','6543210987','buzime',NULL,48.8566000,2.3522000,'2025-04-02 17:27:46','2025-04-03 19:33:01',NULL,NULL,NULL),(5,'Ethan','Hunt','ethan@example.com','hashedpassword5','202 Road, City',2,'3456789012','male',NULL,2,'10005','1988-07-30','English','5432109876','tarjeta',NULL,-33.8688000,151.2093000,'2025-04-02 17:27:46',NULL,NULL,NULL,NULL),(6,'Fiona','Clark','fiona@example.com','hashedpassword6','303 Circle, City',3,'4567890123','female',NULL,2,'10006','1997-09-15','English','4321098765','buzime',NULL,35.6895000,139.6917000,'2025-04-02 17:27:46','2025-04-03 18:32:08','2025-04-03 18:32:08',NULL,NULL),(7,'George','Lee','george@example.com','hashedpassword7','404 Way, City',3,'5678901234','male',NULL,2,'10007','1993-04-05','English','3210987654','tarjeta',NULL,37.7749000,-122.4194000,'2025-04-02 17:27:46','2025-04-03 18:42:14','2025-04-03 18:42:14',NULL,NULL),(8,'Hannah','Taylor','hannah@example.com','hashedpassword8','505 Path, City',2,'6789012345','female',NULL,2,'10008','1991-06-20','English','2109876543','buzime',NULL,55.7558000,37.6173000,'2025-04-02 17:27:46',NULL,NULL,NULL,NULL),(9,'Ian','Moore','ian@example.com','hashedpassword9','606 Trail, City',3,'7890123456','male',NULL,1,'10009','1986-03-12','English','1098765432','tarjeta',NULL,41.9028000,12.4964000,'2025-04-02 17:27:46',NULL,NULL,NULL,NULL),(10,'Jane','White','jane@example.com','hashedpassword10','707 Drive, City',1,'8901234567','female',NULL,1,'10010','1999-11-25','English','9876543210','buzime',NULL,52.5200000,13.4050000,'2025-04-02 17:27:46',NULL,NULL,NULL,NULL),(11,'gustavo','gonzales','gusgonza@yowpet.com','gusgonza','c/ camp d\'arriassa',2,'123456789','male',NULL,1,'12345','1997-12-12',NULL,NULL,'paypal','Barcelona',NULL,NULL,'2025-04-03 18:12:00','2025-04-03 18:12:00',NULL,NULL,NULL),(12,'Karen','Wilson','karen@example.com','hashedpassword11','789 Pine Road, Chicago, IL',2,'312-555-3456','female',NULL,1,'60601','1988-11-22','English, French','312-555-6543','paypal','Chicago',41.8781000,-87.6298000,'2025-03-15 10:00:00',NULL,NULL,'karenwilson',NULL),(13,'Michael','Davis','michael@example.com','hashedpassword12','101 Elm Lane, Houston, TX',1,'713-555-4567','male',NULL,1,'77001','1993-07-18','English, Spanish','713-555-7654','tarjeta','Houston',29.7604000,-95.3698000,'2025-03-20 11:30:00',NULL,NULL,'michaeldavis',NULL),(14,'Sarah','Martinez','sarah@example.com','hashedpassword13','202 Cedar Blvd, Phoenix, AZ',3,'602-555-5678','female',NULL,1,'85001','1995-04-30','English','602-555-8765','buzime','Phoenix',33.4484000,-112.0740000,'2025-04-01 09:15:00',NULL,NULL,'sarahmartinez',NULL),(15,'David','Anderson','david@example.com','hashedpassword14','303 Birch Street, Philadelphia, PA',2,'215-555-6789','male',NULL,1,'19101','1987-09-12','English, German','215-555-9876','tarjeta','Philadelphia',39.9526000,-75.1652000,'2025-04-05 14:45:00',NULL,NULL,'davidanderson',NULL),(16,'Manuel','Pharon','mano@yowpet.com','$2a$10$uePByNH2Teo02fgLrNQ4YuEX7FbAFPlKy7paTxTCBr4Yz5.QFyVDK','No especificado',2,'','',_binary 'No especificado',1,'0',NULL,NULL,NULL,NULL,'No especificado',NULL,NULL,'2025-04-10 17:28:23','2025-04-10 17:28:23',NULL,'Mano','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNYW5vIiwiaWF0IjoxNzQ0NDk2ODE4LCJleHAiOjE3NDQ1MDA0MTh9.OVAFoDu-MrteSWGx-ursG6-X3H3zVIbo-bJkYwsshBk'),(18,'Manuel','Pharon','gusgonza@gmail.com','$2a$10$ar2XZ3ekS8/DJbnfxXUKSeKn5W4IwgXfWuqNDnEC9Q4098IQ73lJC','No especificado',2,'','',_binary 'No especificado',1,'0',NULL,NULL,NULL,NULL,'No especificado',NULL,NULL,'2025-05-08 10:55:27','2025-05-13 13:12:56',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJndXNnb256YUBnbWFpbC5jb20iLCJpYXQiOjE3NDcxMzQ3NzYsImV4cCI6MTc0NzEzODM3Nn0.Wu734orZoKu2apdqY9u1aTHzMdbE4jfVD3v1P6-Wj14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-13 15:19:35
