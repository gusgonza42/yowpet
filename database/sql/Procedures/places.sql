-- ----------------- Drop Place if exist ----------------- --

DROP PROCEDURE IF EXISTS createPlace;
DROP PROCEDURE IF EXISTS updatePlace;
DROP PROCEDURE IF EXISTS deletePlace;
DROP PROCEDURE IF EXISTS getPlace;
DROP PROCEDURE IF EXISTS getAllPlaces;
DROP PROCEDURE IF EXISTS searchPlaces;
DROP PROCEDURE IF EXISTS getPlacesByStatus;


DELIMITER //

-- Create Place
CREATE PROCEDURE createPlace(
    IN p_name VARCHAR(255),
    IN p_address VARCHAR(255),
    IN p_addresscode VARCHAR(50),
    IN p_filter VARCHAR(255),
    IN p_latitude DECIMAL(10, 8),
    IN p_longitude DECIMAL(11, 8)
)
BEGIN
    INSERT INTO places (name, address, addresscode, estado, filter, latitude, longitude)
    VALUES (p_name, p_address, p_addresscode, 1, p_filter,p_latitude,p_longitude);
END //

-- Update Place
CREATE PROCEDURE updatePlace(
    IN p_id INT,
    IN p_name VARCHAR(255),
    IN p_address VARCHAR(255),
    IN p_addresscode VARCHAR(50),
    IN p_filter VARCHAR(255),
    IN p_latitude DECIMAL(10, 8),
    IN p_longitude DECIMAL(11, 8)
)
BEGIN
    UPDATE places
    SET name        = p_name,
        address     = p_address,
        addresscode = p_addresscode,
        filter      = p_filter,
        latitude    = p_latitude,
        longitude   = p_longitude

    WHERE id = p_id
      AND estado <> 0;
END //

-- Soft Delete Place
CREATE PROCEDURE deletePlace(
    IN p_id INT
)
BEGIN
    UPDATE places
    SET estado     = 0
    WHERE id = p_id;
END //

-- Get Place by ID
CREATE PROCEDURE getPlace(
    IN p_id INT
)
BEGIN
    SELECT id,
           name,
           address,
           addresscode,
           estado,
           filter,
           latitude,
           longitude
    FROM places
    WHERE id = p_id
      AND estado <> 0;
END //

-- Get All Active Places
CREATE PROCEDURE getAllPlaces()
BEGIN
    SELECT id,
           name,
           address,
           addresscode,
           estado,
           filter,
           latitude,
           longitude
    FROM places
    WHERE estado <> 0;
END //



-- Search Places by Name or Address
CREATE PROCEDURE searchPlaces(
    IN p_searchTerm VARCHAR(255)
)
BEGIN
    SELECT id,
           name,
           address,
           addresscode,
           estado,
           filter,
           latitude,
           longitude
    FROM places
    WHERE (name LIKE CONCAT('%', p_searchTerm, '%') OR address LIKE CONCAT('%', p_searchTerm, '%'))
      AND estado <> 0;
END //

-- Get Places by Status
CREATE PROCEDURE getPlacesByStatus(
    IN p_status INT
)
BEGIN
    SELECT id,
           name,
           address,
           addresscode,
           estado,
           filter,
           latitude,
           longitude
    FROM places
    WHERE estado = p_status;
END //

DELIMITER ;