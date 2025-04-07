-- ----------------- Drop allergy if exist ----------------- --

DROP PROCEDURE IF EXISTS createallergy;
DROP PROCEDURE IF EXISTS updateallergy;
DROP PROCEDURE IF EXISTS deleteallergy;
DROP PROCEDURE IF EXISTS getallergy;
DROP PROCEDURE IF EXISTS searchallergy;
DROP PROCEDURE IF EXISTS getallergies;

DELIMITER $$
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
SELECT id, name, photo
FROM allergies
WHERE id = p_allergyId;
END $$

-- Get All Allergies
CREATE PROCEDURE getallergys()
BEGIN
SELECT id, name, photo FROM allergies;
END $$

-- Search Allergies by Name
CREATE PROCEDURE searchallergy(
    IN p_searchTerm VARCHAR(255)
)
BEGIN
SELECT id, name, photo
FROM allergies
WHERE name LIKE CONCAT('%', p_searchTerm, '%');
END $$
