-- ----------------- Drop if exist ----------------- --

DROP PROCEDURE IF EXISTS createAnimalCategory;
DROP PROCEDURE IF EXISTS updateAnimalCategory;
DROP PROCEDURE IF EXISTS deleteAnimalCategory;
DROP PROCEDURE IF EXISTS getAnimalCategory;
DROP PROCEDURE IF EXISTS getAnimalCategories;
DROP PROCEDURE IF EXISTS searchAnimalCategory;

DELIMITER $$
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