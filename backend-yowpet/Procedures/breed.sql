-- ----------------- Drop Breed if exist ----------------- --

DROP PROCEDURE IF EXISTS createbreed;
DROP PROCEDURE IF EXISTS updatebreed;
DROP PROCEDURE IF EXISTS deletebreed;
DROP PROCEDURE IF EXISTS getAllBreeds;
DROP PROCEDURE IF EXISTS getBreedById;
DROP PROCEDURE IF EXISTS searchBreedsByName;
DROP PROCEDURE IF EXISTS getBreedsByCategory;


DELIMITER $$
CREATE PROCEDURE createbreed(
    IN p_animalCatId INT,
    IN p_breedName VARCHAR(255)
)
BEGIN
    INSERT INTO breed (categoria, name)
    VALUES (p_animalCatId, p_breedName);
END $$

CREATE PROCEDURE updatebreed(
    IN p_breedId INT,
    IN p_breedName VARCHAR(255),
    IN p_animalCatId INT
)
BEGIN
    UPDATE breed
    SET name = p_breedName,
    categoria = p_animalCatId
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

DELIMITER $$

-- Get all breeds
CREATE PROCEDURE getAllBreeds()
BEGIN
    SELECT id, categoria, name FROM breed;
END $$

-- Get a breed by ID
CREATE PROCEDURE getBreedById(IN p_breedId INT)
BEGIN
    SELECT id, categoria, name FROM breed WHERE id = p_breedId;
END $$

-- Search breeds by name (case-insensitive)
CREATE PROCEDURE searchBreedsByName(IN p_breedName VARCHAR(255))
BEGIN
    SELECT id, categoria, name
    FROM breed
    WHERE LOWER(name) LIKE CONCAT('%', LOWER(p_breedName), '%');
END $$

-- Get breeds by animal category ID
CREATE PROCEDURE getBreedsByCategory(IN p_animalCatId INT)
BEGIN
    SELECT id, categoria, name
    FROM breed
    WHERE categoria = p_animalCatId;
END $$

DELIMITER ;
