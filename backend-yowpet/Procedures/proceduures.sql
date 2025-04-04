-- Drop existing procedures if they exist

-- ----------------- Drop Breed if exist ----------------- --

DROP PROCEDURE IF EXISTS createbreed;
DROP PROCEDURE IF EXISTS updatebreed;
DROP PROCEDURE IF EXISTS deletebreed;

-- ----------------- Drop allergy if exist ----------------- --

DROP PROCEDURE IF EXISTS createallergy;
DROP PROCEDURE IF EXISTS updateallergy;
DROP PROCEDURE IF EXISTS deleteallergy;
DROP PROCEDURE IF EXISTS getallergy;
DROP PROCEDURE IF EXISTS searchallergy;
DROP PROCEDURE IF EXISTS getallergies;

-- ----------------- Drop AnimalCategory if exist ----------------- --

DROP PROCEDURE IF EXISTS createAnimalCategory;
DROP PROCEDURE IF EXISTS updateAnimalCategory;
DROP PROCEDURE IF EXISTS deleteAnimalCategory;
DROP PROCEDURE IF EXISTS getAnimalCategory;
DROP PROCEDURE IF EXISTS getAnimalCategories;
DROP PROCEDURE IF EXISTS searchAnimalCategory;



-- ----------------- Drop CareGiverWorker if exist ----------------- --

DROP PROCEDURE IF EXISTS createCaregiverWorker;
DROP PROCEDURE IF EXISTS updateCaregiverWorker;
DROP PROCEDURE IF EXISTS deleteCaregiverWorker;
DROP PROCEDURE IF EXISTS getCaregiverWorker;
DROP PROCEDURE IF EXISTS getAllCaregiverWorkers;
DROP PROCEDURE IF EXISTS getCaregiverWorkersByCategory;
DROP PROCEDURE IF EXISTS searchCaregiverWorkers;
DROP PROCEDURE IF EXISTS getCaregiverWorkersByUser;
DROP PROCEDURE IF EXISTS getCaregiverWorkersBySpeciality;
DROP PROCEDURE IF EXISTS getCaregiverWorkersByRating;
DROP PROCEDURE IF EXISTS getAvailableCaregiverWorkers;
DROP PROCEDURE IF EXISTS disableCaregiverWorker;





-- ----------------- Drop Place if exist ----------------- --

DROP PROCEDURE IF EXISTS createPlace;
DROP PROCEDURE IF EXISTS updatePlace;
DROP PROCEDURE IF EXISTS deletePlace;
DROP PROCEDURE IF EXISTS getPlace;
DROP PROCEDURE IF EXISTS getAllPlaces;
DROP PROCEDURE IF EXISTS searchPlaces;



-- ----------------- Drop Reservation if exist ----------------- --

DROP PROCEDURE IF EXISTS createReservation;
DROP PROCEDURE IF EXISTS updateReservation;
DROP PROCEDURE IF EXISTS deleteReservation;
DROP PROCEDURE IF EXISTS getReservationById;
DROP PROCEDURE IF EXISTS getReservationsByUser;
DROP PROCEDURE IF EXISTS getReservationsByCareGiver;
DROP PROCEDURE IF EXISTS getReservationsByStatus;
DROP PROCEDURE IF EXISTS completeReservation;


-- ----------------------------------- Breed Procedures --------------------------------- --
DELIMITER $$
CREATE PROCEDURE createbreed(
    IN p_animalCatId INT,
    IN p_breedName VARCHAR(255)
)
BEGIN
    INSERT INTO breed (animal_category_id, name)
    VALUES (p_animalCatId, p_breedName);
END $$

CREATE PROCEDURE updatebreed(
    IN p_breedId INT,
    IN p_breedName VARCHAR(255)
)
BEGIN
    UPDATE breed
    SET name = p_breedName
    WHERE id = p_breedId;
END $$

CREATE PROCEDURE deletebreed(
    IN p_breedId INT
)
BEGIN
    DELETE
    FROM breed
    WHERE id = p_breedId;
END $$

-- ----------------------------------- Allergy Procedures --------------------------------- --

-- Create an Allergy
CREATE PROCEDURE createallergy(
    IN p_id INT,
    IN p_name VARCHAR(255)
)
BEGIN
    INSERT INTO allergies (id, name)
    VALUES (p_id, p_name);
END $$

-- Update an Allergy
CREATE PROCEDURE updateallergy(
    IN p_allergyId INT,
    IN p_allergyName VARCHAR(255)
)
BEGIN
    UPDATE allergies
    SET name = p_allergyName
    WHERE id = p_allergyId;
END $$

-- Delete an Allergy
CREATE PROCEDURE deleteallergy(
    IN p_allergyId INT
)
BEGIN
    DELETE FROM allergies WHERE id = p_allergyId;
END $$

-- Get a Single Allergy by ID
CREATE PROCEDURE getallergy(
    IN p_allergyId INT
)
BEGIN
    SELECT id, name
    FROM allergies
    WHERE id = p_allergyId;
END $$

-- Get All Allergies
CREATE PROCEDURE getallergies()
BEGIN
    SELECT id, name FROM allergies;
END $$

-- Search Allergies by Name
CREATE PROCEDURE searchallergy(
    IN p_searchTerm VARCHAR(255)
)
BEGIN
    SELECT id, name
    FROM allergies
    WHERE name LIKE CONCAT('%', p_searchTerm, '%');
END $$

-- ----------------------------------- Animal Category Procedures --------------------------------- --

-- Create an Animal Category
CREATE PROCEDURE createAnimalCategory(
    IN p_name VARCHAR(255)
)
BEGIN
    INSERT INTO animalcategory (name)
    VALUES (p_name);
END $$

-- Update an Animal Category
CREATE PROCEDURE updateAnimalCategory(
    IN p_animalCategId INT,
    IN p_animalCategName VARCHAR(255)
)
BEGIN
    UPDATE animalcategory
    SET name = p_animalCategName
    WHERE id = p_animalCategId;
END $$

-- Delete an Animal Category
CREATE PROCEDURE deleteAnimalCategory(
    IN p_animalCategId INT
)
BEGIN
    DELETE FROM animalcategory WHERE id = p_animalCategId;
END $$

-- Get a Single Animal Category by ID
CREATE PROCEDURE getAnimalCategory(
    IN p_animalCategId INT
)
BEGIN
    SELECT id, name
    FROM animalcategory
    WHERE id = p_animalCategId;
END $$

-- Get All Animal Categories
CREATE PROCEDURE getAnimalCategories()
BEGIN
    SELECT id, name FROM animalcategory;
END $$

-- Search Animal Categories by Name
CREATE PROCEDURE searchAnimalCategory(
    IN p_searchTerm VARCHAR(255)
)
BEGIN
    SELECT id, name
    FROM animalcategory
    WHERE name LIKE CONCAT('%', p_searchTerm, '%');
END $$

-- ----------------------------------- User Procedures --------------------------------- --


-- ----------------------------------- Caregiver Worker Procedures --------------------------------- --

-- Procedure to create a new caregiver worker
DELIMITER //
CREATE PROCEDURE createCaregiverWorker(
    IN p_user_id INT,
    IN p_speciality VARCHAR(255),
    IN p_experience_years INT,
    IN p_hourly_rate DECIMAL(10, 2),
    IN p_rating DECIMAL(3, 2),
    IN p_review TEXT,
    IN p_description TEXT,
    IN p_service_worker VARCHAR(255),
    IN p_status_active_work BOOLEAN
)
BEGIN
    INSERT INTO caregiver_worker (user_id, speciality, experience_years, hourly_rate, rating, review,
                                  description, service_worker, status_active_work)
    VALUES (p_user_id, p_speciality, p_experience_years, p_hourly_rate, p_rating,
            p_review, p_description, p_service_worker, p_status_active_work);
END //
DELIMITER ;

-- Procedure to update an existing caregiver worker
DELIMITER //
CREATE PROCEDURE updateCaregiverWorker(
    IN p_id INT,
    IN p_user_id INT,
    IN p_speciality VARCHAR(255),
    IN p_experience_years INT,
    IN p_hourly_rate DECIMAL(10, 2),
    IN p_rating DECIMAL(3, 2),
    IN p_review TEXT,
    IN p_description TEXT,
    IN p_service_worker VARCHAR(255),
    IN p_status_active_work BOOLEAN
)
BEGIN
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
END //
DELIMITER ;

-- Procedure to delete a caregiver worker by ID
DELIMITER //
CREATE PROCEDURE deleteCaregiverWorker(
    IN p_id INT
)
BEGIN
    DELETE FROM caregiver_worker WHERE id = p_id;
END //
DELIMITER ;

-- Procedure to get a caregiver worker by ID
DELIMITER //
CREATE PROCEDURE getCaregiverWorker(
    IN p_id INT
)
BEGIN
    SELECT * FROM caregiver_worker WHERE id = p_id;
END //
DELIMITER ;

-- Procedure to get all caregiver workers
DELIMITER //
CREATE PROCEDURE getAllCaregiverWorkers()
BEGIN
    SELECT * FROM caregiver_worker;
END //
DELIMITER ;

-- Procedure to get caregivers by category (assuming there's a related table)
DELIMITER //
CREATE PROCEDURE getCaregiverWorkersByCategory(
    IN p_animal_cat_id INT
)
BEGIN
    SELECT cw.*
    FROM caregiver_worker cw
             JOIN caregiver_worker_category cwc ON cw.id = cwc.caregiver_id
    WHERE cwc.category_id = p_animal_cat_id;
END //
DELIMITER ;

-- Procedure to search caregiver workers by a keyword in name, speciality, or description
DELIMITER //
CREATE PROCEDURE searchCaregiverWorkers(
    IN p_search_term VARCHAR(255)
)
BEGIN
    SELECT *
    FROM caregiver_worker
    WHERE speciality LIKE p_search_term
       OR description LIKE p_search_term
       OR service_worker LIKE p_search_term;
END //
DELIMITER ;

-- Procedure to get a caregiver worker by user ID
DELIMITER //
CREATE PROCEDURE getCaregiverWorkersByUser(
    IN p_user_id INT
)
BEGIN
    SELECT * FROM caregiver_worker WHERE user_id = p_user_id;
END //
DELIMITER ;

-- Procedure to get caregiver workers by speciality
DELIMITER //
CREATE PROCEDURE getCaregiverWorkersBySpeciality(
    IN p_speciality VARCHAR(255)
)
BEGIN
    SELECT * FROM caregiver_worker WHERE speciality = p_speciality;
END //
DELIMITER ;

-- Procedure to get caregiver workers by rating
DELIMITER //
CREATE PROCEDURE getCaregiverWorkersByRating(
    IN p_rating DECIMAL(3, 2)
)
BEGIN
    SELECT * FROM caregiver_worker WHERE rating >= p_rating ORDER BY rating DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE disableCaregiverWorker(
    IN p_id INT
)
BEGIN
    UPDATE caregiver_worker
    SET status_active_work = 0
    WHERE id = p_id;
END //
DELIMITER ;

DELIMITER //

CREATE PROCEDURE getAvailableCaregiverWorkers(
    IN p_status_active_work BOOLEAN
)
BEGIN
    SELECT * FROM caregiver_worker WHERE status_active_work = p_status_active_work;
END //
DELIMITER ;


-- ----------------------------------- Lesson Procedures --------------------------------- --



-- ----------------------------------- Lesson Reviews Procedures --------------------------------- --

-- Procedure to get all lesson reviews (excluding deleted ones)
DELIMITER //
CREATE PROCEDURE GetAllLessonReviews()
BEGIN
    SELECT * FROM lesson_reviews WHERE estado <> 0;
END //
DELIMITER ;

-- Procedure to get a lesson review by ID
DELIMITER //
CREATE PROCEDURE GetLessonReviewById(IN review_id BIGINT)
BEGIN
    SELECT * FROM lesson_reviews WHERE id = review_id AND estado <> 0;
END //
DELIMITER ;

-- Procedure to search lesson reviews by rounded rating
DELIMITER //
CREATE PROCEDURE SearchLessonReviewsByRating(IN review_rating DOUBLE)
BEGIN
    SELECT * FROM lesson_reviews WHERE ROUND(rating, 1) = review_rating AND estado <> 0;
END //
DELIMITER ;

-- Procedure to create a lesson review
DELIMITER //
CREATE PROCEDURE CreateLessonReview(
    IN p_lesson_id BIGINT,
    IN p_user_id BIGINT,
    IN p_rating DOUBLE,
    IN p_comment TEXT
)
BEGIN
    INSERT INTO lesson_reviews (lesson_id, user_id, rating, comment, estado)
    VALUES (p_lesson_id, p_user_id, ROUND(p_rating, 1), p_comment, 1);
END //
DELIMITER ;

-- Procedure to update a lesson review
DELIMITER //
CREATE PROCEDURE UpdateLessonReview(
    IN review_id BIGINT,
    IN new_rating DOUBLE,
    IN new_comment TEXT,
    IN new_estado INT
)
BEGIN
    UPDATE lesson_reviews
    SET rating  = ROUND(new_rating, 1),
        comment = new_comment,
        estado  = new_estado
    WHERE id = review_id;
END //
DELIMITER ;

-- Procedure to soft delete a lesson review
DELIMITER //
CREATE PROCEDURE SoftDeleteLessonReview(IN review_id BIGINT)
BEGIN
    UPDATE lesson_reviews SET estado = 0 WHERE id = review_id;
END //
DELIMITER ;


-- ----------------------------------- Pet Procedures --------------------------------- --



-- ----------------------------------- Place Procedures --------------------------------- --

DELIMITER //

-- Create Place
CREATE PROCEDURE createPlace(
    IN p_name VARCHAR(255),
    IN p_address VARCHAR(255),
    IN p_addresscode VARCHAR(50)
)
BEGIN
    INSERT INTO places (name, address, addresscode, estado)
    VALUES (p_name, p_address, p_addresscode, 1);
END //

-- Update Place
CREATE PROCEDURE updatePlace(
    IN p_id INT,
    IN p_name VARCHAR(255),
    IN p_address VARCHAR(255),
    IN p_addresscode VARCHAR(50)
)
BEGIN
    UPDATE places
    SET name        = p_name,
        address     = p_address,
        addresscode = p_addresscode,
        updated_at  = NOW()
    WHERE id = p_id
      AND estado <> 0;
END //

-- Soft Delete Place
CREATE PROCEDURE deletePlace(
    IN p_id INT
)
BEGIN
    UPDATE places
    SET estado     = 0,
        updated_at = NOW()
    WHERE id = p_id;
END //

-- Get Place by ID
CREATE PROCEDURE getPlace(
    IN p_id INT
)
BEGIN
    SELECT * FROM places WHERE id = p_id AND estado <> 0;
END //

-- Get All Active Places
CREATE PROCEDURE getAllPlaces()
BEGIN
    SELECT * FROM places WHERE estado <> 0;
END //

-- Search Places by Name or Address
CREATE PROCEDURE searchPlaces(
    IN p_searchTerm VARCHAR(255)
)
BEGIN
    SELECT *
    FROM places
    WHERE (name LIKE CONCAT('%', p_searchTerm, '%') OR address LIKE CONCAT('%', p_searchTerm, '%'))
      AND estado <> 0;
END //

-- Get Places by Status
CREATE PROCEDURE getPlacesByStatus(
    IN p_status INT
)
BEGIN
    SELECT * FROM places WHERE estado = p_status;
END //

DELIMITER ;


-- ----------------------------------- Place-review Procedures --------------------------------- --



-- ----------------------------------- Reseervation Procedures --------------------------------- --

-- Create Reservation
DELIMITER $$
CREATE PROCEDURE createReservation(
    IN p_user_id INT,
    IN p_caregiver_id INT,
    IN p_reservation_date DATE,
    IN p_details VARCHAR(255)
)
BEGIN
    INSERT INTO reservations (user_id, caregiver_id, reservation_date, details, status)
    VALUES (p_user_id, p_caregiver_id, p_reservation_date, p_details, 1);
END$$
DELIMITER ;

-- Update Reservation
DELIMITER $$
CREATE PROCEDURE updateReservation(
    IN p_id INT,
    IN p_reservation_date DATE,
    IN p_details VARCHAR(255)
)
BEGIN
    UPDATE reservations
    SET reservation_date = p_reservation_date,
        details          = p_details
    WHERE id = p_id;
END$$
DELIMITER ;

-- Delete Reservation (Soft Delete)
DELIMITER $$
CREATE PROCEDURE deleteReservation(
    IN p_id INT
)
BEGIN
    UPDATE reservations SET status = 0 WHERE id = p_id;
END$$
DELIMITER ;

-- Get Reservation by ID
DELIMITER $$
CREATE PROCEDURE getReservationById(
    IN p_id INT
)
BEGIN
    SELECT * FROM reservations WHERE id = p_id AND status != 0;
END$$
DELIMITER ;

-- Get Reservations by User
DELIMITER $$
CREATE PROCEDURE getReservationsByUser(
    IN p_user_id INT
)
BEGIN
    SELECT * FROM reservations WHERE user_id = p_user_id AND status = 1;
END$$
DELIMITER ;

-- Get Reservations by Caregiver
DELIMITER $$
CREATE PROCEDURE getReservationsByCareGiver(
    IN p_caregiver_id INT
)
BEGIN
    SELECT * FROM reservations WHERE caregiver_id = p_caregiver_id AND status = 1;
END$$
DELIMITER ;

-- Get Reservations by Status
DELIMITER $$
CREATE PROCEDURE getReservationsByStatus(
    IN p_status INT
)
BEGIN
    SELECT * FROM reservations WHERE status = p_status;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE completeReservation(
    IN p_id INT
)
BEGIN
    update reservations set status = 2 where id = p_id;
END $$
DELIMITER ;
