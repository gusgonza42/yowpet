-- ----------------- Drop Pet Procedures if Exist ----------------- --
DROP PROCEDURE IF EXISTS createPet;
DROP PROCEDURE IF EXISTS updatePet;
DROP PROCEDURE IF EXISTS deletePet;
DROP PROCEDURE IF EXISTS getPet;
DROP PROCEDURE IF EXISTS getAllPets;
DROP PROCEDURE IF EXISTS searchPets;
DROP PROCEDURE IF EXISTS getPetsByStatus;
DROP PROCEDURE IF EXISTS getPetsByOwner;

DELIMITER //

-- Create Pet
CREATE PROCEDURE createPet(
    IN p_name VARCHAR(255),
    IN p_birthdate DATE,
    IN p_gender VARCHAR(10),
    IN p_sterilized VARCHAR(10),
    IN p_profilePicture VARCHAR(255),
    IN p_ownerId INT,
    IN p_animalCategory INT,
    IN p_breed INT,
    IN p_status INT,
    IN p_description TEXT,
    IN p_emergencyContact VARCHAR(255)
)
BEGIN
    INSERT INTO pets (name, birthdate, gender, strlization, profile_picture, users_id, animal_id, breed, status,
                      description, emergency_contact, created_at, updated_at)
    VALUES (p_name, p_birthdate, p_gender, p_sterilized, p_profilePicture, p_ownerId, p_animalCategory, p_breed,
            p_status, p_description, p_emergencyContact, NOW(), NOW());
END;

//

-- Update Pet
CREATE PROCEDURE updatePet(
    IN p_id INT,
    IN p_name VARCHAR(255),
    IN p_birthdate DATE,
    IN p_gender VARCHAR(10),
    IN p_sterilized INT,
    IN p_profilePicture VARCHAR(255),
    IN p_ownerId INT,
    IN p_animalCategory INT,
    IN p_breed VARCHAR(255),
    IN p_status INT,
    IN p_description TEXT,
    IN p_emergencyContact VARCHAR(255)
)
BEGIN
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
END;

//

-- Soft Delete Pet
CREATE PROCEDURE deletePet(IN p_id INT)
BEGIN
    UPDATE pets
    SET status     = 0,
        deleted_at = NOW(),
        updated_at = NOW()
    WHERE id = p_id;
END;
//

-- Get Pet by ID
CREATE PROCEDURE getPet(IN p_id INT)
BEGIN
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
END;
//

-- Get All Active Pets
CREATE PROCEDURE getAllPets()
BEGIN
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
END;
//

-- Search Pets by Name
CREATE PROCEDURE searchPets(IN p_search VARCHAR(255))
BEGIN
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
END;
//

-- Get Pets by Status
CREATE PROCEDURE getPetsByStatus(IN p_status INT)
BEGIN
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
END;
//

CREATE PROCEDURE getPetsByOwner(IN p_ownerId INT)
BEGIN
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
    WHERE users_id = p_ownerId
    AND status = 1;
END;

DELIMITER ;
