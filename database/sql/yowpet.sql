/* =============================================================================
   SCRIPT DE INICIALIZACIÓN DE LA BASE DE DATOS YOWPET

   Este script crea la estructura completa de la base de datos yowpet,
   incluyendo tablas, relaciones y datos iniciales para el funcionamiento
   de la aplicación.
   ============================================================================= */

/* =============================================================================
   1. CREACIÓN DE LA BASE DE DATOS
   ============================================================================= */
DROP DATABASE IF EXISTS yowpet;
CREATE DATABASE IF NOT EXISTS `yowpet`
    DEFAULT CHARACTER SET utf8
    COLLATE utf8_general_ci;
USE `yowpet`;


/* =============================================================================
   2. TABLAS RELACIONADAS CON ANIMALES Y CLASIFICACIÓN
   ============================================================================= */
-- Categorías de animales
DROP TABLE IF EXISTS `animalcategory`;
CREATE TABLE `animalcategory` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Razas de animales
DROP TABLE IF EXISTS `breed`;
CREATE TABLE `breed` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) DEFAULT NULL,
    `categoria` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `categoria` (`categoria`),
    CONSTRAINT `breed_ibfk_1` FOREIGN KEY (`categoria`)
        REFERENCES `animalcategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


/* =============================================================================
   3. TABLAS RELACIONADAS CON SALUD
   ============================================================================= */
-- Alergias
DROP TABLE IF EXISTS `allergies`;
CREATE TABLE `allergies` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL,
    `photo` blob DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Enfermedades
DROP TABLE IF EXISTS `ilness`;
CREATE TABLE `ilness` (
    `pet` int(11) DEFAULT NULL,
    `allergy` int(11) DEFAULT NULL,
    `state` int(11) NOT NULL DEFAULT 1 COMMENT '1= still affected\n2= Healed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


/* =============================================================================
   4. TABLAS DE GESTIÓN DE USUARIOS Y MASCOTAS
   ============================================================================= */
-- Usuarios
DROP TABLE IF EXISTS `users`;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Mascotas
DROP TABLE IF EXISTS `pets`;
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
    CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`users_id`)
        REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `pets_ibfk_2` FOREIGN KEY (`animal_id`)
        REFERENCES `breed` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


/* =============================================================================
   5. TABLAS DE SERVICIOS DE CUIDADORES
   ============================================================================= */
-- Cuidadores
DROP TABLE IF EXISTS `caregiver_workers`;
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
    CONSTRAINT `fk_caregiver_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Reservas
DROP TABLE IF EXISTS `reservations`;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


/* =============================================================================
   6. TABLAS DE CONTENIDO EDUCATIVO
   ============================================================================= */
-- Lecciones
DROP TABLE IF EXISTS `lessons`;
CREATE TABLE `lessons` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `content` text NOT NULL,
    `status` tinyint(4) DEFAULT 1 CHECK (`status` in (0,1)),
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Reseñas de lecciones
DROP TABLE IF EXISTS `lesson_reviews`;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


/* =============================================================================
   7. TABLAS DE LUGARES Y RESEÑAS
   ============================================================================= */
-- Lugares
DROP TABLE IF EXISTS `places`;
CREATE TABLE `places` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `address` varchar(255) NOT NULL,
    `addresscode` varchar(45) NOT NULL,
    `estado` int(11) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Reseñas de lugares
DROP TABLE IF EXISTS `place_reviews`;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


/* =============================================================================
   8. DATOS INICIALES - CATEGORÍAS DE ANIMALES Y RAZAS
   ============================================================================= */
-- Datos para tabla `animalcategory`
LOCK TABLES `animalcategory` WRITE;
INSERT INTO `animalcategory` VALUES
    (1,'Dog'),
    (2,'Cat'),
    (3,'Bird'),
    (4,'Rabbit'),
    (5,'Fish'),
    (6,'Hamster'),
    (7,'Turtle'),
    (8,'Snake'),
    (9,'Horse'),
    (10,'Lizard'),
    (12,'Guinea Pig'),
    (13,'Ferret'),
    (14,'Chinchilla'),
    (15,'Hermit Crab');
UNLOCK TABLES;

-- Datos para tabla `breed`
LOCK TABLES `breed` WRITE;
INSERT INTO `breed` VALUES
    (1,'Golden Retriever',1),
    (2,'Persian',2),
    (3,'African Grey Parrot',3),
    (4,'Bunny',4),
    (5,'Goldfish',5),
    (6,'Dwarf Hamster',6),
    (7,'Red-Eared Slider',7),
    (8,'Python',8),
    (9,'Arabian Horse',9),
    (10,'Gecko',10),
    (11,'Labrador Retriever',1),
    (12,'German Shepherd',1),
    (13,'Siamese',2),
    (14,'Maine Coon',2),
    (15,'firess',4),
    (16,'Lovebird',3),
    (17,'Lionhead',4),
    (18,'Flemish Giant',4),
    (19,'Betta',5),
    (20,'Angelfish',5);
UNLOCK TABLES;


/* =============================================================================
   9. DATOS INICIALES - SALUD
   ============================================================================= */
-- Datos para tabla `allergies`
LOCK TABLES `allergies` WRITE;
INSERT INTO `allergies` VALUES
    (1,'Insects',NULL),
    (2,'Pollen',NULL),
    (3,'Dust Mites',NULL),
    (4,'Mold',NULL),
    (5,'Pet Dander',NULL),
    (6,'Certain Foods',NULL),
    (7,'Medications',NULL),
    (8,'Latex',NULL),
    (9,'Insect Stings',NULL),
    (10,'Cockroaches',NULL);
UNLOCK TABLES;

-- Datos para tabla `ilness`
LOCK TABLES `ilness` WRITE;
INSERT INTO `ilness` VALUES
    (1,0,1),
    (1,1,2),
    (2,2,1),
    (2,3,1),
    (3,4,2),
    (3,5,1),
    (4,6,1),
    (4,7,2),
    (5,8,1),
    (5,9,2);
UNLOCK TABLES;


/* =============================================================================
   10. DATOS INICIALES - USUARIOS Y MASCOTAS
   ============================================================================= */
-- Datos para tabla `users`
LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES
    (1,'Alice','Smith','alice@example.com','hashedpassword1','123 Maple Street, New York, NY',1,'212-555-1234','female',NULL,1,'10001','1990-01-01','English, Spanish','212-555-4321','tarjeta','New York',40.7128000,-74.0060000,'2025-04-02 17:27:46','2025-04-03 19:32:58',NULL,'alicesmith',NULL),
    (2,'Bob','Johnson','bob@example.com','hashedpassword2','456 Oak Avenue, Los Angeles, CA',2,'310-555-2345','male',NULL,1,'90001','1985-05-15','English','310-555-5432','buzime','Los Angeles',34.0522000,-118.2437000,'2025-04-02 17:27:46',NULL,NULL,'bobjohnson',NULL),
    (3,'Charlie','Brown','charlie@example.com','hashedpassword3','789 Blvd, City',1,'1231231234','male',NULL,1,'10003','1992-08-22','English','7654321098','tarjeta',NULL,51.5074000,-0.1278000,'2025-04-02 17:27:46',NULL,NULL,NULL,NULL),
    /* Resto de inserciones de usuarios... */
    (16,'Manuel','Pharon','mano@yowpet.com','$2a$10$uePByNH2Teo02fgLrNQ4YuEX7FbAFPlKy7paTxTCBr4Yz5.QFyVDK','No especificado',2,'','',_binary 'No especificado',1,'0',NULL,NULL,NULL,NULL,'No especificado',NULL,NULL,'2025-04-10 17:28:23','2025-04-10 17:28:23',NULL,'Mano','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNYW5vIiwiaWF0IjoxNzQ0NDk2ODE4LCJleHAiOjE3NDQ1MDA0MTh9.OVAFoDu-MrteSWGx-ursG6-X3H3zVIbo-bJkYwsshBk');
UNLOCK TABLES;

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES
                        (5,'David','Wilson','david@example.com','hashedpassword5','789 Pine Road, Chicago, IL',2,'312-555-6789','male',NULL,1,'60007','1988-09-12','English','312-555-9876','paypal','Chicago',41.8781000,-87.6298000,'2025-04-02 17:27:46',NULL,NULL,'davidwilson',NULL),
                        (8,'Emily','Davis','emily@example.com','hashedpassword8','456 Cedar Lane, Boston, MA',2,'617-555-3456','female',NULL,1,'02108','1991-03-28','English, French','617-555-6543','tarjeta','Boston',42.3601000,-71.0589000,'2025-04-02 17:27:46',NULL,NULL,'emilydavis',NULL),
                        (10,'Frank','Brown','frank@example.com','hashedpassword10','123 Elm Street, Seattle, WA',2,'206-555-7890','male',NULL,1,'98101','1987-06-15','English','206-555-0987','buzime','Seattle',47.6062000,-122.3321000,'2025-04-02 17:27:46',NULL,NULL,'frankbrown',NULL);
UNLOCK TABLES;

-- Datos para tabla `pets` (versión simplificada)
LOCK TABLES `pets` WRITE;
INSERT INTO `pets` VALUES
    (1,1,1,'Buddy',NULL,'2020-05-10','male','yes',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),
    (2,2,2,'Whiskers',NULL,'2019-06-15','female','yes',NULL,NULL,1,NULL,'2025-04-03 13:59:16',NULL,NULL,1),
    /* Resto de inserciones de mascotas... */
    (22,2,2,'Whiskers',NULL,'2019-06-14','female','yes',NULL,NULL,1,NULL,'2025-04-10 22:44:56','2025-04-10 22:44:56',NULL,1);
UNLOCK TABLES;


/* =============================================================================
   11. DATOS INICIALES - SERVICIOS DE CUIDADORES
   ============================================================================= */
-- Datos para tabla `caregiver_workers`
LOCK TABLES `caregiver_workers` WRITE;
INSERT INTO `caregiver_workers` VALUES
    (1,3,'Dog Walking and Training',5,25.00,4.80,'Excellent with large breeds!','Certified dog trainer with experience in obedience training','Dog Walker, Trainer',1,'2025-01-15 08:00:00'),
    (2,5,'Exotic Pet Care',3,30.00,4.65,'Very knowledgeable about reptiles','Specialized in reptiles and exotic pets','Exotic Pet Sitter',1,'2025-02-10 09:30:00'),
    (3,8,'Cat Specialist',7,20.00,4.90,'My cats love her!','Feline behavior specialist with veterinary assistant experience','Cat Sitter, Groomer',1,'2025-03-05 10:15:00'),
    (4,10,'Small Mammal Expert',4,18.00,4.75,'Takes great care of my rabbits','Experienced with rabbits, guinea pigs, and hamsters','Small Pet Sitter',1,'2025-01-20 13:00:00'),
    (5,2,'All-Pet Caregiver',6,22.00,4.85,'Reliable for all types of pets','General pet care with first aid certification','Pet Sitter, Walker',0,'2025-02-28 15:45:00');
UNLOCK TABLES;

-- Datos para tabla `reservations`
LOCK TABLES `reservations` WRITE;
INSERT INTO `reservations` VALUES
    (1,1,2,3,'2025-04-10 10:00:00','pending','Need dog walking for 1 hour in Central Park',NULL,NULL),
    (2,2,3,4,'2025-04-11 11:30:00','confirmed','Cat sitting for weekend while away',NULL,'2025-04-12 11:30:00'),
    /* Resto de inserciones de reservas... */
    (15,2,5,2,'2025-04-24 10:15:00','completed','Cat sitting for 3 days',NULL,'2025-04-27 10:15:00');
UNLOCK TABLES;


/* =============================================================================
   12. DATOS INICIALES - CONTENIDO EDUCATIVO Y LUGARES
   ============================================================================= */
-- Datos para tabla `lessons`
LOCK TABLES `lessons` WRITE;
INSERT INTO `lessons` VALUES
    (1,'Basic Dog Obedience Training','Learn the fundamentals of training your dog including sit, stay, and come commands.',1,'2025-01-10 09:00:00','2025-01-10 09:00:00'),
    (2,'Cat Behavior 101','Understanding feline behavior and how to create a cat-friendly environment.',0,'2025-01-15 10:30:00','2025-04-10 20:10:47'),
    (3,'Aquarium Setup for Beginners','Step-by-step guide to setting up your first freshwater aquarium.',1,'2025-02-05 13:00:00','2025-02-10 15:30:00'),
    (4,'Small Mammal Care Basics','Essential care tips for rabbits, guinea pigs, and hamsters.',1,'2025-02-20 08:00:00','2025-02-25 10:45:00');
UNLOCK TABLES;