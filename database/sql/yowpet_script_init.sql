-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2025 at 04:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12
DROP DATABASE IF EXISTS yowpet;
CREATE DATABASE IF NOT EXISTS yowpet;
USE yowpet;
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
    INSERT INTO breed (categoria, name)
    VALUES (p_animalCatId, p_breedName);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createCaregiverWorker` (IN `p_user_id` INT, IN `p_speciality` VARCHAR(255), IN `p_experience_years` INT, IN `p_hourly_rate` DECIMAL(10,2), IN `p_rating` DECIMAL(3,2), IN `p_review` TEXT, IN `p_description` TEXT, IN `p_service_worker` VARCHAR(255), IN `p_status_active_work` BOOLEAN)   BEGIN
    INSERT INTO caregiver_worker (user_id, speciality, experience_years, hourly_rate, rating, review,
                                  description, service_worker, status_active_work)
    VALUES (p_user_id, p_speciality, p_experience_years, p_hourly_rate, p_rating,
            p_review, p_description, p_service_worker, p_status_active_work);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createLesson` (IN `p_title` VARCHAR(255), IN `p_content` TEXT, IN `p_estado` INT)   BEGIN
INSERT INTO lesson (title, content, estado)
VALUES (p_title, p_content, p_estado);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateLessonReview` (IN `p_lesson_id` BIGINT, IN `p_user_id` BIGINT, IN `p_rating` DOUBLE, IN `p_comment` TEXT)   BEGIN
    INSERT INTO lesson_reviews (lesson_id, user_id, rating, comment, estado)
    VALUES (p_lesson_id, p_user_id, ROUND(p_rating, 1), p_comment, 1);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createPet` (IN `p_name` VARCHAR(255), IN `p_birthdate` DATE, IN `p_gender` VARCHAR(10), IN `p_sterilized` VARCHAR(10), IN `p_profilePicture` VARCHAR(255), IN `p_ownerId` INT, IN `p_animalCategory` INT, IN `p_breed` INT, IN `p_status` INT, IN `p_description` TEXT, IN `p_emergencyContact` VARCHAR(255))   BEGIN
    INSERT INTO pets (name, birthdate, gender, strlization, profile_picture, users_id, animal_id, breed, status,
                      description, emergency_contact, created_at, updated_at)
    VALUES (p_name, p_birthdate, p_gender, p_sterilized, p_profilePicture, p_ownerId, p_animalCategory, p_breed,
            p_status, p_description, p_emergencyContact, NOW(), NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createPlace` (IN `p_name` VARCHAR(255), IN `p_address` VARCHAR(255), IN `p_addresscode` VARCHAR(50))   BEGIN
    INSERT INTO places (name, address, addresscode, estado)
    VALUES (p_name, p_address, p_addresscode, 1);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createPlaceReview` (IN `p_rating` DOUBLE, IN `p_comment` VARCHAR(255), IN `p_place` INT, IN `p_user` INT)   BEGIN
INSERT INTO place_reviews (rating, comment, status, place_id, user_id)
VALUES (ROUND(p_rating, 1), p_comment, 1, p_place, p_user);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createReservation` (IN `p_user_id` INT, IN `p_caregiver_id` INT, IN `p_reservation_date` DATE, IN `p_details` VARCHAR(255))   BEGIN
    INSERT INTO reservations (user_id, caregiver_id, reservation_date, details, status)
    VALUES (p_user_id, p_caregiver_id, p_reservation_date, p_details, 1);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createUser` (IN `p_first_name` VARCHAR(255), IN `p_last_name` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255), IN `p_city` VARCHAR(255), IN `p_address` VARCHAR(255), IN `p_telephone` VARCHAR(20), IN `p_zip_code` INT, IN `p_gender` VARCHAR(50), IN `p_profile_picture` VARCHAR(255), IN `p_rol` INT, IN `p_languages` TEXT, IN `p_payment_method` VARCHAR(255), IN `p_birth_date` DATE)   BEGIN
INSERT INTO users (firstname, lastname, email, password, city, address, telephone, postalcode, gender,
                   photo, rol, languages, paymentmethod, birthdate, createdAt, updatedAt)
VALUES (p_first_name, p_last_name, p_email, p_password, p_city, p_address, p_telephone, p_zip_code, p_gender,
        p_profile_picture, p_rol, p_languages, p_payment_method, p_birth_date, NOW(), NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createUserandToken` (IN `p_first_name` VARCHAR(255), IN `p_last_name` VARCHAR(255), IN `p_username` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255), IN `p_city` VARCHAR(255), IN `p_address` VARCHAR(255), IN `p_telephone` VARCHAR(20), IN `p_zip_code` INT, IN `p_gender` VARCHAR(50), IN `p_profile_picture` VARCHAR(255), IN `p_rol` INT, IN `p_languages` TEXT, IN `p_payment_method` VARCHAR(255), IN `p_birth_date` DATE, IN `p_token` VARCHAR(255))   BEGIN

    INSERT INTO users (firstname, lastname, username, email, password, city, address, telephone, postalcode, gender,
                       photo, rol, languages, paymentmethod, birthdate, createdAt, updatedAt, Token)
    VALUES (p_first_name, p_last_name, p_username, p_email, p_password, p_city, p_address, p_telephone, p_zip_code, p_gender,
            p_profile_picture, p_rol, p_languages, p_payment_method, p_birth_date, NOW(), NOW(),p_token);


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteallergy` (IN `p_allergyId` INT)   BEGIN
DELETE FROM allergies WHERE id = p_allergyId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteAnimalCategory` (IN `p_animalCategId` INT)   BEGIN
    DELETE FROM animalcategory WHERE id = p_animalCategId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletebreed` (IN `p_breedId` INT)   BEGIN
    DELETE
    FROM breed
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
    SET status     = 0,
        deleted_at = NOW(),
        updated_at = NOW()
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletePlace` (IN `p_id` INT)   BEGIN
    UPDATE places
    SET estado     = 0
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletePlaceReview` (IN `p_id` INT)   BEGIN
UPDATE place_reviews
SET status = 0
WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteReservation` (IN `p_id` INT)   BEGIN
    UPDATE reservations SET status = 0 WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteUser` (IN `p_user_id` INT)   BEGIN
UPDATE users
SET state     = 2,
    deletedAt = NOW(),
    updatedAt = NOW()
WHERE id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `disableCaregiverWorker` (IN `p_id` INT)   BEGIN
    UPDATE caregiver_worker
    SET status_active_work = 0
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getActiveUsers` ()   BEGIN
SELECT id,
       firstname,
       lastname,
       username,
       email,
       city,
       address,
       state      as status,
       telephone  as phonenumber,
       postalcode as zipCode,
       gender,
       photo      as profilePicture,
       rol,
       languages,
       paymentmethod,
       birthdate
FROM users
WHERE state = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllBreeds` ()   BEGIN
    SELECT id, categoria, name FROM breed;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllCaregiverWorkers` ()   BEGIN
    SELECT * FROM caregiver_worker;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getallergy` (IN `p_allergyId` INT)   BEGIN
SELECT id, name, photo
FROM allergies
WHERE id = p_allergyId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getallergys` ()   BEGIN
SELECT id, name, photo FROM allergies;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllLessonReviews` ()   BEGIN
    SELECT * FROM lesson_reviews WHERE estado <> 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllLessons` ()   BEGIN
SELECT * FROM lesson;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllPets` ()   BEGIN
    SELECT id,
           users_id          AS ownerId,
           animal_id         AS animalCategory,
           name,
           birthdate         AS birthDate,
           gender,
           strlization       AS sterilized,
           profile_picture   AS profilePicture,
           breed,
           status,
           description,
           emergency_contact AS emergencyContact,
           created_at        AS createdAt,
           updated_at        AS updatedAt,
           deleted_at        AS deletedAt
    FROM pets
    WHERE status = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllPlaceReviews` ()   BEGIN
SELECT id,
       ROUND(rating, 1) AS rating,
       comment,
       place_id         as place,
       user_id          as user
FROM place_reviews
WHERE status != 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllPlaces` ()   BEGIN
    SELECT id,
           name,
           address,
           addresscode,
           estado
    FROM places
    WHERE estado <> 0;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `getBreedById` (IN `p_breedId` INT)   BEGIN
    SELECT id, categoria, name FROM breed WHERE id = p_breedId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getBreedsByCategory` (IN `p_animalCatId` INT)   BEGIN
    SELECT id, categoria, name
    FROM breed
    WHERE categoria = p_animalCatId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCaregiverWorker` (IN `p_id` INT)   BEGIN
    SELECT * FROM caregiver_worker WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCaregiverWorkersByCategory` (IN `p_animal_cat_id` INT)   BEGIN
    SELECT cw.*
    FROM caregiver_worker cw
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
    SELECT id,
           users_id          AS ownerId,
           animal_id         AS animalCategory,
           name,
           birthdate         AS birthDate,
           gender,
           strlization       AS sterilized,
           profile_picture   AS profilePicture,
           breed,
           status,
           description,
           emergency_contact AS emergencyContact,
           created_at        AS createdAt,
           updated_at        AS updatedAt,
           deleted_at        AS deletedAt
    FROM pets
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPetsByStatus` (IN `p_status` INT)   BEGIN
    SELECT id,
           users_id          AS ownerId,
           animal_id         AS animalCategory,
           name,
           birthdate         AS birthDate,
           gender,
           strlization,
           profile_picture   AS profilePicture,
           breed,
           status,
           description,
           emergency_contact AS emergencyContact,
           created_at        AS createdAt,
           updated_at        AS updatedAt,
           deleted_at        AS deletedAt
    FROM pets
    WHERE status = p_status;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPlace` (IN `p_id` INT)   BEGIN
    SELECT id,
           name,
           address,
           addresscode,
           estado
    FROM places
    WHERE id = p_id
      AND estado <> 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPlaceReview` (IN `p_id` INT)   BEGIN
SELECT
    id,
    ROUND(rating, 1) AS rating,
    comment,
    place_id as place,
    user_id as user
FROM place_reviews
WHERE id = p_id
  AND status != 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPlaceReviewsByIdandEstado` (IN `p_id` INT, IN `p_estado` INT)   BEGIN
SELECT id,
       ROUND(rating, 1) AS rating,
       comment,
       place_id         as place,
       user_id          as user
FROM place_reviews
WHERE id = p_id
  AND status = p_estado;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPlaceReviewsByPlace` (IN `p_place` INT)   BEGIN
SELECT id,
       ROUND(rating, 1) AS rating,
       comment,
       place_id         as place,
       user_id          as user
FROM place_reviews
WHERE place_id = p_place
  AND status != 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPlaceReviewsByPlaceAndUser` (IN `p_place` INT, IN `p_user` INT)   BEGIN
SELECT id,
       ROUND(rating, 1) AS rating,
       comment,
       place_id         as place,
       user_id          as user
FROM place_reviews
WHERE place_id = p_place
  AND user_id = p_user
  AND status != 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPlaceReviewsByUser` (IN `p_user` INT)   BEGIN
SELECT id,
       ROUND(rating, 1) AS rating,
       comment,
       place_id         as place,
       user_id          as user
FROM place_reviews
WHERE user_id = p_user
  AND status != 0;
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
SELECT id,
       firstname,
       lastname,
       username,
       email,
       city,
       address,
       state      as status,
       telephone  as phonenumber,
       postalcode as zipCode,
       gender,
       photo      as profilePicture,
       rol,
       languages,
       paymentmethod,
       birthdate
FROM users
WHERE id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserByEmail` (IN `p_email` VARCHAR(255))   BEGIN
SELECT id,
       firstname,
       lastname,
       username,
       email,
       city,
       address,
       state      as status,
       telephone  as phonenumber,
       postalcode as zipCode,
       gender,
       photo      as profilePicture,
       rol,
       languages,
       paymentmethod,
       birthdate
FROM users
WHERE email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserByusername` (IN `p_username` VARCHAR(255))   BEGIN
SELECT id,
       firstname,
       lastname,
       username,
       email,
       city,
       address,
       state      as status,
       telephone  as phonenumber,
       postalcode as zipCode,
       gender,
       photo      as profilePicture,
       rol,
       languages,
       paymentmethod,
       birthdate
FROM users
WHERE username = p_username;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUsers` ()   BEGIN
SELECT id,
       firstname,
       lastname,
       username,
       email,
       city,
       address,
       state      as status,
       telephone  as phonenumber,
       postalcode as zipCode,
       gender,
       photo      as profilePicture,
       rol,
       languages,
       paymentmethod,
       birthdate,
       createdAt,
       updatedAt
FROM users;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchallergy` (IN `p_searchTerm` VARCHAR(255))   BEGIN
SELECT id, name, photo
FROM allergies
WHERE name LIKE CONCAT('%', p_searchTerm, '%');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchAnimalCategory` (IN `p_searchTerm` VARCHAR(255))   BEGIN
    SELECT id, name
    FROM animalcategory
    WHERE name LIKE CONCAT('%', p_searchTerm, '%');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchBreedsByName` (IN `p_breedName` VARCHAR(255))   BEGIN
    SELECT id, categoria, name
    FROM breed
    WHERE LOWER(name) LIKE CONCAT('%', LOWER(p_breedName), '%');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchCaregiverWorkers` (IN `p_search_term` VARCHAR(255))   BEGIN
    SELECT *
    FROM caregiver_worker
    WHERE speciality LIKE p_search_term
       OR description LIKE p_search_term
       OR service_worker LIKE p_search_term;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SearchLessonReviewsByRating` (IN `review_rating` DOUBLE)   BEGIN
    SELECT * FROM lesson_reviews WHERE ROUND(rating, 1) = review_rating AND estado <> 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchLessons` (IN `p_search_term` VARCHAR(255))   BEGIN
SELECT *
FROM lesson
WHERE title LIKE p_search_term
   OR content LIKE p_search_term;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchPets` (IN `p_search` VARCHAR(255))   BEGIN
    SELECT id,
           users_id          AS ownerId,
           animal_id         AS animalCategory,
           name,
           birthdate         AS birthDate,
           gender,
           strlization,
           profile_picture   AS profilePicture,
           breed,
           status,
           description,
           emergency_contact AS emergencyContact,
           created_at        AS createdAt,
           updated_at        AS updatedAt,
           deleted_at        AS deletedAt
    FROM pets
    WHERE name LIKE CONCAT('%', p_search, '%')
      AND status = 1; -- Only search among active pets
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchPlaceReviews` (IN `p_rating` DOUBLE)   BEGIN
SELECT id,
       ROUND(rating, 1) AS rating,
       comment,
       place_id         as place,
       user_id          as user
FROM place_reviews
WHERE ROUND(rating, 1) = ROUND(p_rating, 1)
  AND status != 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchPlaces` (IN `p_searchTerm` VARCHAR(255))   BEGIN
    SELECT id,
           name,
           address,
           addresscode,
           estado
    FROM places
    WHERE (name LIKE CONCAT('%', p_searchTerm, '%') OR address LIKE CONCAT('%', p_searchTerm, '%'))
      AND estado <> 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchUsers` (IN `p_searchTerm` VARCHAR(255))   BEGIN
SELECT id,
       firstname,
       lastname,
       email,
       city,
       address,
       state      as status,
       telephone  as phoneNumber,
       postalcode as zipCode,
       gender,
       photo      as profilePicture,
       rol,
       languages,
       paymentmethod,
       birthdate
FROM users
WHERE firstname LIKE CONCAT('%', p_searchTerm, '%')
   OR lastname LIKE CONCAT('%', p_searchTerm, '%')
   OR email LIKE CONCAT('%', p_searchTerm, '%');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SoftDeleteLessonReview` (IN `review_id` BIGINT)   BEGIN
    UPDATE lesson_reviews SET estado = 0 WHERE id = review_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `toAdmin` (IN `p_user_id` INT)   BEGIN
UPDATE users
SET rol       = 1,
    updatedAt = NOW()
WHERE id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `unadmin` (IN `p_user_id` INT)   BEGIN
UPDATE users
SET rol       = 0,
    updatedAt = NOW()
WHERE id = p_user_id;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatebreed` (IN `p_breedId` INT, IN `p_breedName` VARCHAR(255), IN `p_animalCatId` INT)   BEGIN
    UPDATE breed
    SET name = p_breedName,
    categoria = p_animalCatId
    WHERE id = p_breedId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCaregiverWorker` (IN `p_id` INT, IN `p_user_id` INT, IN `p_speciality` VARCHAR(255), IN `p_experience_years` INT, IN `p_hourly_rate` DECIMAL(10,2), IN `p_rating` DECIMAL(3,2), IN `p_review` TEXT, IN `p_description` TEXT, IN `p_service_worker` VARCHAR(255), IN `p_status_active_work` BOOLEAN)   BEGIN
    UPDATE caregiver_worker
    SET user_id            = p_user_id,
        speciality         = p_speciality,
        experience_years   = p_experience_years,
        hourly_rate        = p_hourly_rate,
        rating             = p_rating,
        review             = p_review,
        description        = p_description,
        service_worker     = p_service_worker,
        status_active_work = p_status_active_work
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateLesson` (IN `p_id` INT, IN `p_title` VARCHAR(255), IN `p_content` TEXT, IN `p_estado` INT)   BEGIN
UPDATE lesson
SET title   = p_title,
    content = p_content,
    estado  = p_estado
WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateLessonReview` (IN `review_id` BIGINT, IN `new_rating` DOUBLE, IN `new_comment` TEXT, IN `new_estado` INT)   BEGIN
    UPDATE lesson_reviews
    SET rating  = ROUND(new_rating, 1),
        comment = new_comment,
        estado  = new_estado
    WHERE id = review_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePet` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_birthdate` DATE, IN `p_gender` VARCHAR(10), IN `p_sterilized` INT, IN `p_profilePicture` VARCHAR(255), IN `p_ownerId` INT, IN `p_animalCategory` INT, IN `p_breed` VARCHAR(255), IN `p_status` INT, IN `p_description` TEXT, IN `p_emergencyContact` VARCHAR(255))   BEGIN
    UPDATE pets
    SET name              = p_name,
        birthdate         = p_birthdate,
        gender            = p_gender,
        strlization       = p_sterilized,
        profile_picture   = p_profilePicture,
        users_id          = p_ownerId,
        animal_id         = p_animalCategory,
        breed             = p_breed,
        status            = p_status,
        description       = p_description,
        emergency_contact = p_emergencyContact,
        updated_at        = NOW()
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePlace` (IN `p_id` INT, IN `p_name` VARCHAR(255), IN `p_address` VARCHAR(255), IN `p_addresscode` VARCHAR(50))   BEGIN
    UPDATE places
    SET name        = p_name,
        address     = p_address,
        addresscode = p_addresscode

    WHERE id = p_id
      AND estado <> 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePlaceReview` (IN `p_id` INT, IN `p_rating` DOUBLE, IN `p_comment` VARCHAR(255))   BEGIN
UPDATE place_reviews
SET rating  = ROUND(p_rating, 1),
    comment = p_comment
WHERE id = p_id
  AND status != 0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateReservation` (IN `p_id` INT, IN `p_reservation_date` DATE, IN `p_details` VARCHAR(255))   BEGIN
    UPDATE reservations
    SET reservation_date = p_reservation_date,
        details          = p_details
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateUser` (IN `p_user_id` INT, IN `p_first_name` VARCHAR(255), IN `p_last_name` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_city` VARCHAR(255), IN `p_address` VARCHAR(255), IN `p_telephone` VARCHAR(20), IN `p_zip_code` INT, IN `p_gender` VARCHAR(50), IN `p_profile_picture` VARCHAR(255), IN `p_rol` INT, IN `p_languages` TEXT, IN `p_payment_method` VARCHAR(255), IN `p_birth_date` DATE)   BEGIN
UPDATE users
SET firstname     = p_first_name,
    lastname      = p_last_name,
    email         = p_email,
    city          = p_city,
    address       = p_address,
    telephone     = p_telephone,
    postalcode    = p_zip_code,
    gender        = p_gender,
    photo         = p_profile_picture,
    rol           = p_rol,
    languages     = p_languages,
    paymentmethod = p_payment_method,
    birthdate     = p_birth_date,
    updatedAt     = NOW()
WHERE id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateUserProfile` (IN `p_user_id` INT, IN `p_first_name` VARCHAR(255), IN `p_last_name` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_city` VARCHAR(255), IN `p_address` VARCHAR(255), IN `p_telephone` VARCHAR(20), IN `p_zip_code` INT, IN `p_gender` VARCHAR(50), IN `p_profile_picture` VARCHAR(255), IN `p_languages` TEXT, IN `p_payment_method` VARCHAR(255), IN `p_birth_date` DATE)   BEGIN
UPDATE users
SET firstname     = p_first_name,
    lastname      = p_last_name,
    email         = p_email,
    city          = p_city,
    address       = p_address,
    telephone     = p_telephone,
    postalcode    = p_zip_code,
    gender        = p_gender,
    photo         = p_profile_picture,
    languages     = p_languages,
    paymentmethod = p_payment_method,
    birthdate     = p_birth_date,
    updatedAt     = NOW()
WHERE id = p_user_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `allergies`
--

CREATE TABLE `allergies` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `photo` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `allergies`
--

INSERT INTO `allergies` (`id`, `name`, `photo`) VALUES
(1, 'Insects', NULL),
(2, 'Pollen', NULL),
(3, 'Dust Mites', NULL),
(4, 'Mold', NULL),
(5, 'Pet Dander', NULL),
(6, 'Certain Foods', NULL),
(7, 'Medications', NULL),
(8, 'Latex', NULL),
(9, 'Insect Stings', NULL),
(10, 'Cockroaches', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `animalcategory`
--

CREATE TABLE `animalcategory` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `animalcategory`
--

INSERT INTO `animalcategory` (`id`, `name`) VALUES
(3, 'Bird'),
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

-- --------------------------------------------------------

--
-- Table structure for table `breed`
--

CREATE TABLE `breed` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `breed`
--

INSERT INTO `breed` (`id`, `name`, `categoria`) VALUES
(1, 'Golden Retriever', 1),
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
(15, 'Cockatiel', 3),
(16, 'Lovebird', 3),
(17, 'Lionhead', 4),
(18, 'Flemish Giant', 4),
(19, 'Betta', 5),
(20, 'Angelfish', 5);

-- --------------------------------------------------------

--
-- Table structure for table `caregiver_workers`
--

CREATE TABLE `caregiver_workers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `speciality` varchar(255) NOT NULL,
  `experience_years` int(11) NOT NULL CHECK (`experience_years` >= 0),
  `hourly_rate` decimal(10,2) NOT NULL CHECK (`hourly_rate` >= 0),
  `rating` decimal(3,2) DEFAULT NULL CHECK (`rating` >= 0 and `rating` <= 5),
  `review` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `service_worker` varchar(255) DEFAULT NULL,
  `status_active_work` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `caregiver_workers`
--

INSERT INTO `caregiver_workers` (`id`, `user_id`, `speciality`, `experience_years`, `hourly_rate`, `rating`, `review`, `description`, `service_worker`, `status_active_work`, `created_at`) VALUES
(1, 3, 'Dog Walking and Training', 5, 25.00, 4.80, 'Excellent with large breeds!', 'Certified dog trainer with experience in obedience training', 'Dog Walker, Trainer', 1, '2025-01-15 08:00:00'),
(2, 5, 'Exotic Pet Care', 3, 30.00, 4.65, 'Very knowledgeable about reptiles', 'Specialized in reptiles and exotic pets', 'Exotic Pet Sitter', 1, '2025-02-10 09:30:00'),
(3, 8, 'Cat Specialist', 7, 20.00, 4.90, 'My cats love her!', 'Feline behavior specialist with veterinary assistant experience', 'Cat Sitter, Groomer', 1, '2025-03-05 10:15:00'),
(4, 10, 'Small Mammal Expert', 4, 18.00, 4.75, 'Takes great care of my rabbits', 'Experienced with rabbits, guinea pigs, and hamsters', 'Small Pet Sitter', 1, '2025-01-20 13:00:00'),
(5, 2, 'All-Pet Caregiver', 6, 22.00, 4.85, 'Reliable for all types of pets', 'General pet care with first aid certification', 'Pet Sitter, Walker', 0, '2025-02-28 15:45:00');

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `status` tinyint(4) DEFAULT 1 CHECK (`status` in (0,1)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `title`, `content`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Basic Dog Obedience Training', 'Learn the fundamentals of training your dog including sit, stay, and come commands.', 1, '2025-01-10 09:00:00', '2025-01-10 09:00:00'),
(2, 'Cat Behavior 101', 'Understanding feline behavior and how to create a cat-friendly environment.', 1, '2025-01-15 10:30:00', '2025-01-20 08:15:00'),
(3, 'Aquarium Setup for Beginners', 'Step-by-step guide to setting up your first freshwater aquarium.', 1, '2025-02-05 13:00:00', '2025-02-10 15:30:00'),
(4, 'Small Mammal Care Basics', 'Essential care tips for rabbits, guinea pigs, and hamsters.', 1, '2025-02-20 08:00:00', '2025-02-25 10:45:00'),
(5, 'Avian Nutrition Guide', 'Proper diet and nutrition for pet birds of all sizes.', 1, '2025-03-01 12:15:00', '2025-03-05 09:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `lesson_reviews`
--

CREATE TABLE `lesson_reviews` (
  `id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` double NOT NULL CHECK (`rating` >= 0 and `rating` <= 5),
  `comment` text DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1 CHECK (`status` in (0,1)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `lesson_reviews`
--

INSERT INTO `lesson_reviews` (`id`, `lesson_id`, `user_id`, `rating`, `comment`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 5, 'Great introduction to dog training! Very clear instructions.', 1, '2025-01-12 13:30:00', '2025-01-12 13:30:00'),
(2, 1, 4, 4, 'Helpful tips but would like more advanced techniques too.', 1, '2025-01-14 15:45:00', '2025-01-14 15:45:00'),
(3, 2, 7, 5, 'Finally understand why my cat behaves the way it does!', 1, '2025-01-18 09:20:00', '2025-01-18 09:20:00'),
(4, 3, 9, 3, 'Good basics but needs more detail on water chemistry.', 1, '2025-02-08 11:10:00', '2025-02-08 11:10:00'),
(5, 4, 2, 5, 'Perfect for new rabbit owners like me!', 1, '2025-02-22 14:30:00', '2025-02-22 14:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `id` int(11) NOT NULL,
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
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1 -- active\n2 -- inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`id`, `users_id`, `animal_id`, `name`, `description`, `birthdate`, `gender`, `strlization`, `photo`, `profile_picture`, `breed`, `emergency_contact`, `created_at`, `updated_at`, `deleted_at`, `status`) VALUES
(1, 1, 1, 'Buddy', NULL, '2020-05-10', 'male', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(2, 2, 2, 'Whiskers', NULL, '2019-06-15', 'female', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(3, 3, 3, 'Polly', NULL, '2021-02-01', 'female', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(4, 4, 4, 'Thumper', NULL, '2018-11-20', 'male', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(5, 5, 5, 'Goldie', NULL, '2022-07-07', 'female', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(6, 6, 6, 'Hammy', NULL, '2021-09-09', 'male', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(7, 7, 7, 'Speedy', NULL, '2017-03-30', 'female', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(8, 8, 8, 'Slither', NULL, '2020-12-25', 'male', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(9, 9, 9, 'Thunder', NULL, '2016-08-17', 'male', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(10, 10, 10, 'Scaly', NULL, '2019-04-22', 'female', 'yes', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(11, 1, 1, 'Buddy', NULL, '2020-05-10', 'male', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(12, 2, 2, 'Whiskers', NULL, '2019-06-15', 'female', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(13, 3, 3, 'Polly', NULL, '2021-02-01', 'female', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(14, 4, 4, 'Thumper', NULL, '2018-11-20', 'male', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(15, 5, 5, 'Goldie', NULL, '2022-07-07', 'female', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(16, 6, 6, 'Hammy', NULL, '2021-09-09', 'male', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(17, 7, 7, 'Speedy', NULL, '2017-03-30', 'female', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(18, 8, 8, 'Slither', NULL, '2020-12-25', 'male', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(19, 9, 9, 'Thunder', NULL, '2016-08-17', 'male', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(20, 10, 10, 'Scaly', NULL, '2019-04-22', 'female', 'no', NULL, NULL, 1, NULL, '2025-04-03 13:59:16', NULL, NULL, 1),
(21, 2, 2, 'Whiskers', NULL, '2019-06-14', 'female', 'yes', NULL, NULL, 1, NULL, '2025-04-04 12:55:48', '2025-04-04 12:58:52', '2025-04-04 12:58:52', 0);

-- --------------------------------------------------------

--
-- Table structure for table `places`
--

CREATE TABLE `places` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `addresscode` varchar(45) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `places`
--

INSERT INTO `places` (`id`, `name`, `address`, `addresscode`, `estado`) VALUES
(1, 'Central Park', '123 Park Ave, City', 'P1001', 1),
(2, 'Pet Hospital', '456 Vet St, City', 'P1002', 1),
(3, 'Dog Park', '789 Bark Blvd, City', 'P1003', 1),
(4, 'Cat Café', '101 Meow Lane, City', 'P1004', 1),
(5, 'El Corte Inglés Plaza de Catalunya', 'Pl. de Catalunya, 14, L\'Eixample, Barcelona', '08002', 0),
(6, 'Zoo', '303 Safari Circle, City', 'P1006', 1),
(7, 'Reptile House', '404 Slither Way, City', 'P1007', 1),
(8, 'Fish Aquarium', '505 Swim Path, City', 'P1008', 1),
(9, 'Horse Stable', '606 Gallop Trail, City', 'P1009', 1),
(10, 'Pet Store', '707 Treat Drive, City', 'P1010', 1),
(11, 'ILERNA Barcelona - Centro de Formación Profesional', 'Carrer de Santa Carolina, 1, Horta-Guinardó, Barcelona', '08025', 1);

-- --------------------------------------------------------

--
-- Table structure for table `place_reviews`
--

CREATE TABLE `place_reviews` (
  `id` int(11) NOT NULL,
  `place_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `status` enum('deleted','active') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `place_reviews`
--

INSERT INTO `place_reviews` (`id`, `place_id`, `user_id`, `rating`, `comment`, `status`) VALUES
(1, 1, 1, 5, 'Beautiful park with great areas for dogs to play!', 'active'),
(2, 1, 3, 4, 'Lots of space but could use more water stations.', 'active'),
(3, 2, 5, 3, 'Good service but expensive for routine checkups.', 'active'),
(4, 3, 7, 5, 'My dog loves this park! Always clean and well-maintained.', 'active'),
(5, 4, 9, 2, 'Nice atmosphere but limited space for cats to roam.', 'active'),
(6, 6, 2, 4, 'Great variety of animals but crowded on weekends.', 'active'),
(7, 7, 4, 5, 'Fantastic reptile exhibits with knowledgeable staff.', 'active'),
(8, 8, 6, 3, 'Interesting fish but some tanks need maintenance.', 'active'),
(9, 9, 8, 5, 'Excellent facilities for horse boarding and lessons.', 'active'),
(10, 10, 10, 4, 'Good selection of pet supplies at reasonable prices.', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `reservation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `caregiver_id` int(11) NOT NULL,
  `pet_id` int(11) NOT NULL,
  `reservation_date` datetime NOT NULL,
  `status` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
  `details` varchar(100) DEFAULT NULL,
  `reservationCancelledAt` datetime DEFAULT NULL,
  `reservationCompletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`reservation_id`, `user_id`, `caregiver_id`, `pet_id`, `reservation_date`, `status`, `details`, `reservationCancelledAt`, `reservationCompletedAt`) VALUES
(1, 1, 2, 3, '2025-04-10 10:00:00', 'pending', 'Need dog walking for 1 hour in Central Park', NULL, NULL),
(2, 2, 3, 4, '2025-04-11 11:30:00', 'confirmed', 'Cat sitting for weekend while away', NULL, '2025-04-12 11:30:00'),
(3, 3, 4, 5, '2025-04-12 09:15:00', 'completed', 'Daily fish tank maintenance for 1 week', NULL, '2025-04-13 09:15:00'),
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

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `rol` int(11) NOT NULL DEFAULT 2,
  `telephone` varchar(45) DEFAULT NULL,
  `gender` enum('female','male') NOT NULL,
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
  `Token` TEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `address`, `rol`, `telephone`, `gender`, `photo`, `state`, `postalcode`, `birthdate`, `languages`, `emergencynum`, `paymentmethod`, `city`, `latitud`, `longitud`, `createdat`, `updatedAt`, `deletedAt`, `username`, `Token`) VALUES
(1, 'Alice', 'Smith', 'alice@example.com', 'hashedpassword1', '123 Maple Street, New York, NY', 1, '212-555-1234', 'female', NULL, 1, '10001', '1990-01-01', 'English, Spanish', '212-555-4321', 'tarjeta', 'New York', 40.7128000, -74.0060000, '2025-04-02 17:27:46', '2025-04-03 19:32:58', NULL, 'alicesmith', NULL),
(2, 'Bob', 'Johnson', 'bob@example.com', 'hashedpassword2', '456 Oak Avenue, Los Angeles, CA', 2, '310-555-2345', 'male', NULL, 1, '90001', '1985-05-15', 'English', '310-555-5432', 'buzime', 'Los Angeles', 34.0522000, -118.2437000, '2025-04-02 17:27:46', NULL, NULL, 'bobjohnson', NULL),
(3, 'Charlie', 'Brown', 'charlie@example.com', 'hashedpassword3', '789 Blvd, City', 1, '1231231234', 'male', NULL, 1, '10003', '1992-08-22', 'English', '7654321098', 'tarjeta', NULL, 51.5074000, -0.1278000, '2025-04-02 17:27:46', NULL, NULL, NULL, NULL),
(4, 'Daisy', 'Miller', 'daisy@example.com', 'hashedpassword4', '101 Lane, City', 0, '2345678901', 'female', NULL, 1, '10004', '1995-12-11', 'English', '6543210987', 'buzime', NULL, 48.8566000, 2.3522000, '2025-04-02 17:27:46', '2025-04-03 19:33:01', NULL, NULL, NULL),
(5, 'Ethan', 'Hunt', 'ethan@example.com', 'hashedpassword5', '202 Road, City', 2, '3456789012', 'male', NULL, 2, '10005', '1988-07-30', 'English', '5432109876', 'tarjeta', NULL, -33.8688000, 151.2093000, '2025-04-02 17:27:46', NULL, NULL, NULL, NULL),
(6, 'Fiona', 'Clark', 'fiona@example.com', 'hashedpassword6', '303 Circle, City', 3, '4567890123', 'female', NULL, 2, '10006', '1997-09-15', 'English', '4321098765', 'buzime', NULL, 35.6895000, 139.6917000, '2025-04-02 17:27:46', '2025-04-03 18:32:08', '2025-04-03 18:32:08', NULL, NULL),
(7, 'George', 'Lee', 'george@example.com', 'hashedpassword7', '404 Way, City', 3, '5678901234', 'male', NULL, 2, '10007', '1993-04-05', 'English', '3210987654', 'tarjeta', NULL, 37.7749000, -122.4194000, '2025-04-02 17:27:46', '2025-04-03 18:42:14', '2025-04-03 18:42:14', NULL, NULL),
(8, 'Hannah', 'Taylor', 'hannah@example.com', 'hashedpassword8', '505 Path, City', 2, '6789012345', 'female', NULL, 2, '10008', '1991-06-20', 'English', '2109876543', 'buzime', NULL, 55.7558000, 37.6173000, '2025-04-02 17:27:46', NULL, NULL, NULL, NULL),
(9, 'Ian', 'Moore', 'ian@example.com', 'hashedpassword9', '606 Trail, City', 3, '7890123456', 'male', NULL, 1, '10009', '1986-03-12', 'English', '1098765432', 'tarjeta', NULL, 41.9028000, 12.4964000, '2025-04-02 17:27:46', NULL, NULL, NULL, NULL),
(10, 'Jane', 'White', 'jane@example.com', 'hashedpassword10', '707 Drive, City', 1, '8901234567', 'female', NULL, 1, '10010', '1999-11-25', 'English', '9876543210', 'buzime', NULL, 52.5200000, 13.4050000, '2025-04-02 17:27:46', NULL, NULL, NULL, NULL),
(11, 'gustavo', 'gonzales', 'gusgonza@yowpet.com', 'gusgonza', 'c/ camp d\'arriassa', 2, '123456789', 'male', NULL, 1, '12345', '1997-12-12', NULL, NULL, 'paypal', 'Barcelona', NULL, NULL, '2025-04-03 18:12:00', '2025-04-03 18:12:00', NULL, NULL, NULL),
(12, 'Karen', 'Wilson', 'karen@example.com', 'hashedpassword11', '789 Pine Road, Chicago, IL', 2, '312-555-3456', 'female', NULL, 1, '60601', '1988-11-22', 'English, French', '312-555-6543', 'paypal', 'Chicago', 41.8781000, -87.6298000, '2025-03-15 10:00:00', NULL, NULL, 'karenwilson', NULL),
(13, 'Michael', 'Davis', 'michael@example.com', 'hashedpassword12', '101 Elm Lane, Houston, TX', 1, '713-555-4567', 'male', NULL, 1, '77001', '1993-07-18', 'English, Spanish', '713-555-7654', 'tarjeta', 'Houston', 29.7604000, -95.3698000, '2025-03-20 11:30:00', NULL, NULL, 'michaeldavis', NULL),
(14, 'Sarah', 'Martinez', 'sarah@example.com', 'hashedpassword13', '202 Cedar Blvd, Phoenix, AZ', 3, '602-555-5678', 'female', NULL, 1, '85001', '1995-04-30', 'English', '602-555-8765', 'buzime', 'Phoenix', 33.4484000, -112.0740000, '2025-04-01 09:15:00', NULL, NULL, 'sarahmartinez', NULL),
(15, 'David', 'Anderson', 'david@example.com', 'hashedpassword14', '303 Birch Street, Philadelphia, PA', 2, '215-555-6789', 'male', NULL, 1, '19101', '1987-09-12', 'English, German', '215-555-9876', 'tarjeta', 'Philadelphia', 39.9526000, -75.1652000, '2025-04-05 14:45:00', NULL, NULL, 'davidanderson', NULL);

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `breed`
--
ALTER TABLE `breed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria` (`categoria`);

--
-- Indexes for table `caregiver_workers`
--
ALTER TABLE `caregiver_workers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_caregiver_user` (`user_id`),
  ADD KEY `idx_caregiver_status` (`status_active_work`);

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
  ADD KEY `idx_lesson_reviews_lesson` (`lesson_id`),
  ADD KEY `idx_lesson_reviews_user` (`user_id`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`,`status`),
  ADD KEY `users_id` (`users_id`),
  ADD KEY `animal_id` (`animal_id`);

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
  ADD KEY `place_id` (`place_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `caregiver_id` (`caregiver_id`),
  ADD KEY `pet_id` (`pet_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allergies`
--
ALTER TABLE `allergies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `animalcategory`
--
ALTER TABLE `animalcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `breed`
--
ALTER TABLE `breed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `caregiver_workers`
--
ALTER TABLE `caregiver_workers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `lesson_reviews`
--
ALTER TABLE `lesson_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pets`
--
ALTER TABLE `pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `places`
--
ALTER TABLE `places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `place_reviews`
--
ALTER TABLE `place_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `breed`
--
ALTER TABLE `breed`
  ADD CONSTRAINT `breed_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `animalcategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `caregiver_workers`
--
ALTER TABLE `caregiver_workers`
  ADD CONSTRAINT `fk_caregiver_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `lesson_reviews`
--
ALTER TABLE `lesson_reviews`
  ADD CONSTRAINT `fk_lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pets_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `breed` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `place_reviews`
--
ALTER TABLE `place_reviews`
  ADD CONSTRAINT `place_reviews_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`),
  ADD CONSTRAINT `place_reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`caregiver_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reservations_ibfk_3` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
