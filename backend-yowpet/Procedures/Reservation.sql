-- ----------------- Drop Reservation if exist ----------------- --

DROP PROCEDURE IF EXISTS createReservation;
DROP PROCEDURE IF EXISTS updateReservation;
DROP PROCEDURE IF EXISTS deleteReservation;
DROP PROCEDURE IF EXISTS getReservationById;
DROP PROCEDURE IF EXISTS getReservationsByUser;
DROP PROCEDURE IF EXISTS getReservationsByCareGiver;
DROP PROCEDURE IF EXISTS getReservationsByStatus;
DROP PROCEDURE IF EXISTS completeReservation;

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
    WHERE reservation_id = p_id;
END$$
DELIMITER ;

-- Delete Reservation (Soft Delete)
DELIMITER $$
CREATE PROCEDURE deleteReservation(
    IN p_id INT
)
BEGIN
    UPDATE reservations SET status = 0 WHERE reservation_id = p_id;
END$$
DELIMITER ;

-- Get Reservation by ID
DELIMITER $$
CREATE PROCEDURE getReservationById(
    IN p_id INT
)
BEGIN
    SELECT reservation_id   as id,
           user_id          as user,
           caregiver_id     as caregiver,
           reservation_date as reservationDate,
           details          as details,
           status           as status,
           pet_id           as pet
    FROM reservations
    WHERE reservation_id = p_id
      AND status != 0;
END$$
DELIMITER ;

-- Get Reservations by User
DELIMITER $$
CREATE PROCEDURE getReservationsByUser(
    IN p_user_id INT
)
BEGIN
    SELECT reservation_id   as id,
           user_id          as user,
           caregiver_id     as caregiver,
           reservation_date as reservationDate,
           details          as details,
           status           as status,
           pet_id           as pet
    FROM reservations
    WHERE user_id = p_user_id
      AND status = 1;
END$$
DELIMITER ;

-- Get Reservations by Caregiver
DELIMITER $$
CREATE PROCEDURE getReservationsByCareGiver(
    IN p_caregiver_id INT
)
BEGIN
    SELECT reservation_id   as id,
           user_id          as user,
           caregiver_id     as caregiver,
           reservation_date as reservationDate,
           details          as details,
           status           as status,
           pet_id           as pet
    FROM reservations
    WHERE caregiver_id = p_caregiver_id
      AND status = 1;
END$$
DELIMITER ;

-- Get Reservations by Status
DELIMITER $$
CREATE PROCEDURE getReservationsByStatus(
    IN p_status INT
)
BEGIN
    SELECT reservation_id   as id,
           user_id          as user,
           caregiver_id     as caregiver,
           reservation_date as reservationDate,
           details          as details,
           status           as status,
           pet_id           as pet
    FROM reservations
    WHERE status = p_status;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE completeReservation(
    IN p_id INT
)
BEGIN
    update reservations set status = 2 where reservation_id = p_id;
END $$
DELIMITER ;
