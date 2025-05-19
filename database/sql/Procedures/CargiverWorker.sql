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
INSERT INTO caregiver_workers (user_id, speciality, experience_years, hourly_rate, rating, review,
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
UPDATE caregiver_workers
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
DELETE FROM caregiver_workers WHERE id = p_id;
END //
DELIMITER ;

-- Procedure to get a caregiver worker by ID
DELIMITER //
CREATE PROCEDURE getCaregiverWorker(
    IN p_id INT
)
BEGIN
SELECT * FROM caregiver_workers WHERE user_id = p_id;
END //
DELIMITER ;

-- Procedure to get all caregiver workers
DELIMITER //
CREATE PROCEDURE getAllCaregiverWorkers()
BEGIN
SELECT * FROM caregiver_workers;
END //
DELIMITER ;

-- Procedure to get caregivers by category (assuming there's a related table)
DELIMITER //
CREATE PROCEDURE getCaregiverWorkersByCategory(
    IN p_animal_cat_id INT
)
BEGIN
SELECT cw.*
FROM caregiver_workers cw
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
FROM caregiver_workers
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
SELECT * FROM caregiver_workers WHERE user_id = p_user_id;
END //
DELIMITER ;

-- Procedure to get caregiver workers by speciality
DELIMITER //
CREATE PROCEDURE getCaregiverWorkersBySpeciality(
    IN p_speciality VARCHAR(255)
)
BEGIN
SELECT * FROM caregiver_workers WHERE speciality = p_speciality;
END //
DELIMITER ;

-- Procedure to get caregiver workers by rating
DELIMITER //
CREATE PROCEDURE getCaregiverWorkersByRating(
    IN p_rating DECIMAL(3, 2)
)
BEGIN
SELECT * FROM caregiver_workers WHERE rating >= p_rating ORDER BY rating DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE disableCaregiverWorker(
    IN p_id INT
)
BEGIN
UPDATE caregiver_workers
SET status_active_work = 0
WHERE id = p_id;
END //
DELIMITER ;

DELIMITER //

CREATE PROCEDURE getAvailableCaregiverWorkers(
    IN p_status_active_work BOOLEAN
)
BEGIN
SELECT * FROM caregiver_workers WHERE status_active_work = p_status_active_work;
END //
DELIMITER ;
