-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2025 at 07:06 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yowpet`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `completeReservation` (IN `p_id` INT)   BEGIN
update reservations set status = 2 where id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createallergy` (IN `p_id` INT, IN `p_name` VARCHAR(255))   BEGIN
    INSERT INTO allergies (id, name) 
    VALUES (p_id, p_name);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createAnimalCategory` (IN `p_name` VARCHAR(255))   BEGIN
    INSERT INTO animalcategory (name) 
    VALUES (p_name);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createbreed` (IN `p_animalCatId` INT, IN `p_breedName` VARCHAR(255))   BEGIN
    INSERT INTO breed (animal_category_id, name) 
    VALUES (p_animalCatId, p_breedName);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createCaregiverWorker` (IN `p_user_id` INT, IN `p_speciality` VARCHAR(255), IN `p_experience_years` INT, IN `p_hourly_rate` DECIMAL(10,2), IN `p_rating` DECIMAL(3,2), IN `p_review` TEXT, IN `p_description` TEXT, IN `p_service_worker` VARCHAR(255), IN `p_status_active_work` BOOLEAN)   BEGIN
    INSERT INTO caregiver_worker (
        user_id, speciality, experience_years, hourly_rate, rating, review, 
        description, service_worker, status_active_work
    ) VALUES (
        p_user_id, p_speciality, p_experience_years, p_hourly_rate, p_rating, 
        p_review, p_description, p_service_worker, p_status_active_work
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createLesson` (IN `p_title` VARCHAR(255), IN `p_content` TEXT, IN `p_estado` INT)   BEGIN
    INSERT INTO lesson (title, content, estado)
    VALUES (p_title, p_content, p_estado);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateLessonReview` (IN `p_lesson_id` BIGINT, IN `p_user_id` BIGINT, IN `p_rating` DOUBLE, IN `p_comment` TEXT)   BEGIN
    INSERT INTO lesson_reviews (lesson_id, user_id, rating, comment, estado)
    VALUES (p_lesson_id, p_user_id, ROUND(p_rating, 1), p_comment, 1);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createPet` (IN `p_name` VARCHAR(255), IN `p_birthDate` DATE, IN `p_gender` VARCHAR(10), IN `p_sterilized` INT, IN `p_profilePicture` VARCHAR(255), IN `p_ownerId` INT, IN `p_breed` INT, IN `p_status` INT, IN `p_description` TEXT, IN `p_emergencyContact` VARCHAR(255), IN `p_updatedAt` TIMESTAMP)   BEGIN
    INSERT INTO pets (name, birth_date, gender, sterilized, profile_picture, owner_id, breed, status,
                      description, emergency_contact, updated_at, created_at)
    VALUES (p_name, p_birthDate, p_gender, p_sterilized, p_profilePicture, p_ownerId, p_breed,
            p_status, p_description, p_emergencyContact, p_updatedAt, NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createPlace` (IN `p_name` VARCHAR(255), IN `p_address` VARCHAR(255), IN `p_addresscode` VARCHAR(50))   BEGIN
    INSERT INTO places (name, address, addresscode, estado)
    VALUES (p_name, p_address, p_addresscode, 1);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createPlaceReview` (IN `p_rating` DOUBLE, IN `p_comment` VARCHAR(255), IN `p_place` INT, IN `p_user` INT)   BEGIN
    INSERT INTO place_reviews (rating, comment, estado, place, user)
    VALUES (ROUND(p_rating, 1), p_comment, 1, p_place, p_user);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createReservation` (IN `p_user_id` INT, IN `p_caregiver_id` INT, IN `p_reservation_date` DATE, IN `p_details` VARCHAR(255))   BEGIN
    INSERT INTO reservations (user_id, caregiver_id, reservation_date, details, status)
    VALUES (p_user_id, p_caregiver_id, p_reservation_date, p_details, 1);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createUser` (IN `p_first_name` VARCHAR(255), IN `p_last_name` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255), IN `p_city` VARCHAR(255), IN `p_address` VARCHAR(255), IN `p_phone_number` VARCHAR(20), IN `p_zip_code` INT, IN `p_gender` VARCHAR(50), IN `p_profile_picture` VARCHAR(255), IN `p_role` INT, IN `p_languages` TEXT, IN `p_payment_method` VARCHAR(255), IN `p_birth_date` DATE)   BEGIN
    INSERT INTO user (first_name, last_name, email, password, city, address, phone_number, zip_code, gender, profile_picture, role, languages, payment_method, birth_date, created_at)
    VALUES (p_first_name, p_last_name, p_email, p_password, p_city, p_address, p_phone_number, p_zip_code, p_gender, p_profile_picture, p_role, p_languages, p_payment_method, p_birth_date, NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteallergy` (IN `p_allergyId` INT)   BEGIN
    DELETE FROM allergies WHERE id = p_allergyId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteAnimalCategory` (IN `p_animalCategId` INT)   BEGIN
    DELETE FROM animalcategory WHERE id = p_animalCategId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletebreed` (IN `p_breedId` INT)   BEGIN
    DELETE FROM breed 
    WHERE id = p_breedId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteCaregiverWorker` (IN `p_id` INT)   BEGIN
    DELETE FROM caregiver_worker WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteLesson` (IN `p_id` INT)   BEGIN
    DELETE FROM lesson WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletePet` (IN `p_id` INT)   BEGIN
    UPDATE pets
    SET status = 0, deleted_at = NOW()
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletePlace` (IN `p_id` INT)   BEGIN
    UPDATE places
    SET estado = 0, updated_at = NOW()
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletePlaceReview` (IN `p_id` INT)   BEGIN
    UPDATE place_reviews
    SET estado = 0
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteReservation` (IN `p_id` INT)   BEGIN
    UPDATE reservations SET status = 0 WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteUser` (IN `p_user_id` INT)   BEGIN
    UPDATE user 
    SET status = 0,  -- Assuming 0 means inactive
        deleted_at = NOW(),
        updated_at = NOW()
    WHERE id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `disableCaregiverWorker` (IN `p_id` INT)   BEGIN
    UPDATE caregiver_worker
    SET status_active_work = 0
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getActiveUsers` ()   BEGIN
    SELECT * FROM user WHERE status = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllCaregiverWorkers` ()   BEGIN
    SELECT * FROM caregiver_worker;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getallergies` ()   BEGIN
    SELECT id, name FROM allergies;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getallergy` (IN `p_allergyId` INT)   BEGIN
    SELECT id, name 
    FROM allergies 
    WHERE id = p_allergyId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getallergys` ()   BEGIN
    SELECT id, name, photo FROM Allergy;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllLessonReviews` ()   BEGIN
    SELECT * FROM lesson_reviews WHERE estado <> 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllLessons` ()   BEGIN
    SELECT * FROM lesson;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllPets` ()   BEGIN
    SELECT * FROM pets WHERE status = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllPlaceReviews` ()   BEGIN
    SELECT * FROM place_reviews WHERE estado != 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllPlaces` ()   BEGIN
    SELECT * FROM places WHERE estado <> 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAnimalCategories` ()   BEGIN
    SELECT id, name FROM animalcategory;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAnimalCategory` (IN `p_animalCategId` INT)   BEGIN
    SELECT id, name
    FROM animalcategory 
    WHERE id = p_animalCategId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAvailableCaregiverWorkers` (IN `p_status_active_work` BOOLEAN)   BEGIN
    SELECT * FROM caregiver_worker WHERE status_active_work = p_status_active_work;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCaregiverWorker` (IN `p_id` INT)   BEGIN
    SELECT * FROM caregiver_worker WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCaregiverWorkersByCategory` (IN `p_animal_cat_id` INT)   BEGIN
    SELECT cw.* FROM caregiver_worker cw
    JOIN caregiver_worker_category cwc ON cw.id = cwc.caregiver_id
    WHERE cwc.category_id = p_animal_cat_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCaregiverWorkersByRating` (IN `p_rating` DECIMAL(3,2))   BEGIN
    SELECT * FROM caregiver_worker WHERE rating >= p_rating ORDER BY rating DESC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCaregiverWorkersBySpeciality` (IN `p_speciality` VARCHAR(255))   BEGIN
    SELECT * FROM caregiver_worker WHERE speciality = p_speciality;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCaregiverWorkersByUser` (IN `p_user_id` INT)   BEGIN
    SELECT * FROM caregiver_worker WHERE user_id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getLesson` (IN `p_id` INT)   BEGIN
    SELECT * FROM lesson WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetLessonReviewById` (IN `review_id` BIGINT)   BEGIN
    SELECT * FROM lesson_reviews WHERE id = review_id AND estado <> 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getLessonsByEstado` (IN `p_estado` INT)   BEGIN
    SELECT * FROM lesson WHERE estado = p_estado;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPet` (IN `p_id` INT)   BEGIN
    SELECT * FROM pets WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPetsByStatus` (IN `p_status` INT)   BEGIN
    SELECT * FROM pets WHERE status = p_status;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPlace` (IN `p_id` INT)   BEGIN
    SELECT * FROM places WHERE id = p_id AND estado <> 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPlaceReview` (IN `p_id` INT)   BEGIN
    SELECT * FROM place_reviews
    WHERE id = p_id AND estado != 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPlaceReviewsByIdandEstado` (IN `p_id` INT, IN `p_estado` INT)   BEGIN
    SELECT * FROM place_reviews WHERE id = p_id AND estado = p_estado;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPlaceReviewsByPlace` (IN `p_place` INT)   BEGIN
    SELECT * FROM place_reviews WHERE place = p_place AND estado != 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPlaceReviewsByPlaceAndUser` (IN `p_place` INT, IN `p_user` INT)   BEGIN
    SELECT * FROM place_reviews WHERE place = p_place AND user = p_user AND estado != 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPlaceReviewsByUser` (IN `p_user` INT)   BEGIN
    SELECT * FROM place_reviews WHERE user = p_user AND estado != 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPlacesByStatus` (IN `p_status` INT)   BEGIN
    SELECT * FROM places WHERE estado = p_status;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getReservationById` (IN `p_id` INT)   BEGIN
    SELECT * FROM reservations WHERE id = p_id AND status != 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getReservationsByCareGiver` (IN `p_caregiver_id` INT)   BEGIN
    SELECT * FROM reservations WHERE caregiver_id = p_caregiver_id AND status = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getReservationsByStatus` (IN `p_status` INT)   BEGIN
    SELECT * FROM reservations WHERE status = p_status;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getReservationsByUser` (IN `p_user_id` INT)   BEGIN
    SELECT * FROM reservations WHERE user_id = p_user_id AND status = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUser` (IN `p_user_id` INT)   BEGIN
    SELECT * FROM user WHERE id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserByEmail` (IN `p_email` VARCHAR(255))   BEGIN
    SELECT * FROM user WHERE email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUsers` ()   BEGIN
    SELECT * FROM user;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchallergy` (IN `p_searchTerm` VARCHAR(255))   BEGIN
    SELECT id, name 
    FROM allergies 
    WHERE name LIKE CONCAT('%', p_searchTerm, '%');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchAnimalCategory` (IN `p_searchTerm` VARCHAR(255))   BEGIN
    SELECT id, name 
    FROM animalcategory 
    WHERE name LIKE CONCAT('%', p_searchTerm, '%');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchCaregiverWorkers` (IN `p_search_term` VARCHAR(255))   BEGIN
    SELECT * FROM caregiver_worker 
    WHERE speciality LIKE p_search_term 
       OR description LIKE p_search_term
       OR service_worker LIKE p_search_term;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SearchLessonReviewsByRating` (IN `review_rating` DOUBLE)   BEGIN
    SELECT * FROM lesson_reviews WHERE ROUND(rating, 1) = review_rating AND estado <> 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchLessons` (IN `p_search_term` VARCHAR(255))   BEGIN
    SELECT * FROM lesson
    WHERE title LIKE p_search_term
       OR content LIKE p_search_term;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchPets` (IN `p_search` VARCHAR(255))   BEGIN
    SELECT * FROM pets WHERE name LIKE CONCAT('%', p_search, '%') AND status = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchPlaceReviews` (IN `p_rating` DOUBLE)   BEGIN
    SELECT * FROM place_reviews
    WHERE ROUND(rating, 1) = ROUND(p_rating, 1) AND estado != 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchPlaces` (IN `p_searchTerm` VARCHAR(255))   BEGIN
    SELECT * FROM places
    WHERE (name LIKE CONCAT('%', p_searchTerm, '%') OR address LIKE CONCAT('%', p_searchTerm, '%'))
    AND estado <> 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchUsers` (IN `p_searchTerm` VARCHAR(255))   BEGIN
    SELECT * FROM user
    WHERE first_name LIKE CONCAT('%', p_searchTerm, '%')
       OR last_name LIKE CONCAT('%', p_searchTerm, '%')
       OR email LIKE CONCAT('%', p_searchTerm, '%');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SoftDeleteLessonReview` (IN `review_id` BIGINT)   BEGIN
    UPDATE lesson_reviews SET estado = 0 WHERE id = review_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateallergy` (IN `p_allergyId` INT, IN `p_allergyName` VARCHAR(255))   BEGIN
    UPDATE allergies 
    SET name = p_allergyName
    WHERE id = p_allergyId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateAnimalCategory` (IN `p_animalCategId` INT, IN `p_animalCategName` VARCHAR(255))   BEGIN
    UPDATE animalcategory 
    SET name = p_animalCategName
    WHERE id = p_animalCategId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatebreed` (IN `p_breedId` INT, IN `p_breedName` VARCHAR(255))   BEGIN
    UPDATE breed 
    SET name = p_breedName
    WHERE id = p_breedId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCaregiverWorker` (IN `p_id` INT, IN `p_user_id` INT, IN `p_speciality` VARCHAR(255), IN `p_experience_years` INT, IN `p_hourly_rate` DECIMAL(10,2), IN `p_rating` DECIMAL(3,2), IN `p_review` TEXT, IN `p_description` TEXT, IN `p_service_worker` VARCHAR(255), IN `p_status_active_work` BOOLEAN)   BEGIN
    UPDATE caregiver_worker
    SET 
        user_id = p_user_id,
        speciality = p_speciality,
        experience_years = p_experience_years,
        hourly_rate = p_hourly_rate,
        rating = p_rating,
        review = p_review,
        description = p_description,
        service_worker = p_service_worker,
        status_active_work = p_status_active_work
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateLesson` (IN `p_id` INT, IN `p_title` VARCHAR(255), IN `p_content` TEXT, IN `p_estado` INT)   BEGIN
    UPDATE lesson
    SET title = p_title,
        content = p_content,
        estado = p_estado
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateLessonReview` (IN `review_id` BIGINT, IN `new_rating` DOUBLE, IN `new_comment` TEXT, IN `new_estado` INT)   BEGIN
    UPDATE lesson_reviews
    SET rating = ROUND(new_rating, 1),
        comment = new_comment,
        estado = new_estado
    WHERE id = review_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePet` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_birthDate` DATE, IN `p_gender` VARCHAR(10), IN `p_sterilized` INT, IN `p_profilePicture` VARCHAR(255), IN `p_ownerId` INT, IN `p_breed` INT, IN `p_status` INT, IN `p_description` TEXT, IN `p_emergencyContact` VARCHAR(255), IN `p_updatedAt` TIMESTAMP)   BEGIN
    UPDATE pets
    SET name = p_name, birth_date = p_birthDate, gender = p_gender, sterilized = p_sterilized,
        profile_picture = p_profilePicture, owner_id = p_ownerId, breed = p_breed,
        status = p_status, description = p_description, emergency_contact = p_emergencyContact,
        updated_at = p_updatedAt
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePlace` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_address` VARCHAR(255), IN `p_addresscode` VARCHAR(50))   BEGIN
    UPDATE places
    SET name = p_name, address = p_address, addresscode = p_addresscode, updated_at = NOW()
    WHERE id = p_id AND estado <> 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePlaceReview` (IN `p_id` INT, IN `p_rating` DOUBLE, IN `p_comment` VARCHAR(255))   BEGIN
    UPDATE place_reviews
    SET rating = ROUND(p_rating, 1), comment = p_comment
    WHERE id = p_id AND estado != 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateReservation` (IN `p_id` INT, IN `p_reservation_date` DATE, IN `p_details` VARCHAR(255))   BEGIN
    UPDATE reservations
    SET reservation_date = p_reservation_date, details = p_details
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateUser` (IN `p_user_id` INT, IN `p_first_name` VARCHAR(255), IN `p_last_name` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_city` VARCHAR(255), IN `p_address` VARCHAR(255), IN `p_phone_number` VARCHAR(20), IN `p_zip_code` INT, IN `p_gender` VARCHAR(50), IN `p_profile_picture` VARCHAR(255), IN `p_role` INT, IN `p_languages` TEXT, IN `p_payment_method` VARCHAR(255), IN `p_birth_date` DATE)   BEGIN
    UPDATE user 
    SET first_name = p_first_name,
        last_name = p_last_name,
        email = p_email,
        city = p_city,
        address = p_address,
        phone_number = p_phone_number,
        zip_code = p_zip_code,
        gender = p_gender,
        profile_picture = p_profile_picture,
        role = p_role,
        languages = p_languages,
        payment_method = p_payment_method,
        birth_date = p_birth_date,
        updated_at = NOW()
    WHERE id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateUserProfile` (IN `p_user_id` INT, IN `p_first_name` VARCHAR(255), IN `p_last_name` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_city` VARCHAR(255), IN `p_address` VARCHAR(255), IN `p_phone_number` VARCHAR(20), IN `p_zip_code` INT, IN `p_gender` VARCHAR(50), IN `p_profile_picture` VARCHAR(255), IN `p_languages` TEXT, IN `p_payment_method` VARCHAR(255), IN `p_birth_date` DATE)   BEGIN
    UPDATE user
    SET first_name = p_first_name,
        last_name = p_last_name,
        email = p_email,
        city = p_city,
        address = p_address,
        phone_number = p_phone_number,
        zip_code = p_zip_code,
        gender = p_gender,
        profile_picture = p_profile_picture,
        languages = p_languages,
        payment_method = p_payment_method,
        birth_date = p_birth_date,
        updated_at = NOW()
    WHERE id = p_user_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `allergies`
--

CREATE TABLE `allergies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `photo` tinyblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `animalcategory`
--

CREATE TABLE `animalcategory` (
  `id` int(11) NOT NULL,
  `ac_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `animalcategory`
--

INSERT INTO `animalcategory` (`id`, `ac_name`) VALUES
(1, 'Cats'),
(2, 'Dogs');

-- --------------------------------------------------------

--
-- Table structure for table `breed`
--

CREATE TABLE `breed` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `animal_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `breed`
--

INSERT INTO `breed` (`id`, `name`, `animal_category`) VALUES
(1, 'Chihuahua', 1);

-- --------------------------------------------------------

--
-- Table structure for table `caregiver_worker`
--

CREATE TABLE `caregiver_worker` (
  `id` int(11) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `experience_years` int(11) DEFAULT NULL,
  `hourly_rate` double DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `review` varchar(255) DEFAULT NULL,
  `service_worker` varchar(255) DEFAULT NULL,
  `speciality` varchar(255) DEFAULT NULL,
  `status_active_work` bit(1) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `estado` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lesson_reviews`
--

CREATE TABLE `lesson_reviews` (
  `id` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `estado` int(11) NOT NULL,
  `rating` double NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pet`
--

CREATE TABLE `pet` (
  `id` int(11) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `emergency_contact` varchar(255) DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `sterilized` int(11) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `animalcategory_id` int(11) DEFAULT NULL,
  `breed_id` int(11) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pet_allergies`
--

CREATE TABLE `pet_allergies` (
  `pet_id` int(11) NOT NULL,
  `allergy_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `places`
--

CREATE TABLE `places` (
  `id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `addresscode` varchar(45) NOT NULL,
  `estado` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `place_reviews`
--

CREATE TABLE `place_reviews` (
  `id` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `estado` int(11) NOT NULL,
  `rating` double NOT NULL,
  `place_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `r_id` int(11) NOT NULL,
  `r_details` varchar(255) DEFAULT NULL,
  `r_reservation_cancelled_at` datetime(6) DEFAULT NULL,
  `r_reservation_completed_at` datetime(6) DEFAULT NULL,
  `r_reservation_date` datetime(6) DEFAULT NULL,
  `r_status` int(11) DEFAULT NULL,
  `r_care_giver_id` int(11) DEFAULT NULL,
  `r_user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `address` varchar(150) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `languages` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `updated_at` datetime(6) DEFAULT NULL,
  `zip_code` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `address`, `birth_date`, `city`, `created_at`, `deleted_at`, `email`, `first_name`, `gender`, `languages`, `last_name`, `password`, `payment_method`, `phone_number`, `profile_picture`, `role`, `status`, `updated_at`, `zip_code`) VALUES
(1, 'c/ camp d\'arriassa', '1997-12-12', 'Barcelona', '2025-03-20', NULL, 'gusgonza@yowpet.com', 'gustavo', 'male', NULL, 'gonzales', 'gusgonza', 'paypal', 123456789, NULL, 2, 1, NULL, 12345),
(2, 'NuevaDireccion', '1990-01-01', 'NuevaCiudad', '2025-03-20', NULL, 'nuevoemail@example.com', 'NuevoNombre', 'NuevoGenero', NULL, 'NuevoApellido', 'gusgonza', 'paypal', 1234567890, NULL, 2, 1, '2025-03-20 18:46:17.000000', 12345),
(3, 'c/ camp d\'arriassa', '1997-12-12', 'Barcelona', '2025-03-20', NULL, 'gusgonzaaa@yowpet.com', 'gustavo', 'male', NULL, 'gonzales', 'gusgonza', 'paypal', 123456789, NULL, 2, 1, NULL, 12345),
(4, 'c/ camp d\'arriassa', '1997-12-12', 'Barcelona', '2025-03-20', NULL, 'gusgonzaaaa@yowpet.com', 'gustavo', 'male', NULL, 'gonzales', 'gusgonza', 'paypal', 123456789, NULL, 2, 1, NULL, 12345),
(5, 'c/ camp d\'arriassa', '1997-12-12', 'Barcelona', '2025-03-20', '2025-03-20 18:46:44.000000', 'gusgonzaaaaa@yowpet.com', 'gustavo', 'male', NULL, 'gonzales', 'gusgonza', 'paypal', 123456789, NULL, 2, 0, '2025-03-20 18:46:44.000000', 12345);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allergies`
--
ALTER TABLE `allergies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `animalcategory`
--
ALTER TABLE `animalcategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `breed`
--
ALTER TABLE `breed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `animalCateg-breed` (`animal_category`);

--
-- Indexes for table `caregiver_worker`
--
ALTER TABLE `caregiver_worker`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK6hrx0sri455lkuiubifa4dpf2` (`user_id`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lesson_reviews`
--
ALTER TABLE `lesson_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK90gegnnfjaic7xheojnxwtbws` (`lesson_id`),
  ADD KEY `FKoge6kdft9f7rwt6iljcgnolm` (`user_id`);

--
-- Indexes for table `pet`
--
ALTER TABLE `pet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK7fm256m71dr1wrbuumi04i40a` (`animalcategory_id`),
  ADD KEY `FK7fw2rh2krkt5y9ojy3ab2f7xi` (`breed_id`);

--
-- Indexes for table `pet_allergies`
--
ALTER TABLE `pet_allergies`
  ADD KEY `FKh1mhujchr2ggol1f1nogy5i38` (`allergy_id`),
  ADD KEY `FK5q8sif78kgtha4kslonf8yx5b` (`pet_id`);

--
-- Indexes for table `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `place_reviews`
--
ALTER TABLE `place_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKi8bi6hpjt1nub7cx7udqg5jq0` (`place_id`),
  ADD KEY `FKgcxnx543yrguumyeacdmxrm8j` (`user_id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`r_id`),
  ADD KEY `FKgjssj0wdacmog1c63t276as83` (`r_care_giver_id`),
  ADD KEY `FKqhb04f2r956vlwmhlibnwfviu` (`r_user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpes` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allergies`
--
ALTER TABLE `allergies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `animalcategory`
--
ALTER TABLE `animalcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `breed`
--
ALTER TABLE `breed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `caregiver_worker`
--
ALTER TABLE `caregiver_worker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lesson_reviews`
--
ALTER TABLE `lesson_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pet`
--
ALTER TABLE `pet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `places`
--
ALTER TABLE `places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `place_reviews`
--
ALTER TABLE `place_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `r_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `breed`
--
ALTER TABLE `breed`
  ADD CONSTRAINT `animalCateg-breed` FOREIGN KEY (`animal_category`) REFERENCES `animalcategory` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `caregiver_worker`
--
ALTER TABLE `caregiver_worker`
  ADD CONSTRAINT `FK6hrx0sri455lkuiubifa4dpf2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `lesson_reviews`
--
ALTER TABLE `lesson_reviews`
  ADD CONSTRAINT `FK90gegnnfjaic7xheojnxwtbws` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FKoge6kdft9f7rwt6iljcgnolm` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pet`
--
ALTER TABLE `pet`
  ADD CONSTRAINT `FK7fm256m71dr1wrbuumi04i40a` FOREIGN KEY (`animalcategory_id`) REFERENCES `animalcategory` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK7fw2rh2krkt5y9ojy3ab2f7xi` FOREIGN KEY (`breed_id`) REFERENCES `breed` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pet_allergies`
--
ALTER TABLE `pet_allergies`
  ADD CONSTRAINT `FK5q8sif78kgtha4kslonf8yx5b` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FKh1mhujchr2ggol1f1nogy5i38` FOREIGN KEY (`allergy_id`) REFERENCES `allergies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `place_reviews`
--
ALTER TABLE `place_reviews`
  ADD CONSTRAINT `FKgcxnx543yrguumyeacdmxrm8j` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FKi8bi6hpjt1nub7cx7udqg5jq0` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `FKgjssj0wdacmog1c63t276as83` FOREIGN KEY (`r_care_giver_id`) REFERENCES `caregiver_worker` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FKqhb04f2r956vlwmhlibnwfviu` FOREIGN KEY (`r_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
