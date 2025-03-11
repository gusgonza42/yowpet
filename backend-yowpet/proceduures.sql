-- ----------------------------------- Breed Procedures --------------------------------- --

DELIMITER 
CREATE PROCEDURE createbreed(
    IN p_animalCatId INT,
    IN p_breedName VARCHAR(255)
)
BEGIN
    INSERT INTO breeds (animal_category_id, name) 
    VALUES (p_animalCatId, p_breedName);
END ;

CREATE PROCEDURE updatebreed(
    IN p_breedId INT,
    IN p_breedName VARCHAR(255),
    IN p_CatID INT
)
BEGIN
    UPDATE breeds 
    SET name = p_breedName,
    
    WHERE id = p_breedId;
END $$

CREATE PROCEDURE deletebreed(
    IN p_breedId INT
)
BEGIN
    DELETE FROM breeds 
    WHERE id = p_breedId;
END $$
DELIMITER ;

-- ----------------------------------- Allergy Procedures --------------------------------- --

DELIMITER $$

-- 1. Create an Allergy
CREATE PROCEDURE createallergy(
    IN p_id INT,
    IN p_name VARCHAR(255)
)
BEGIN
    INSERT INTO Allergy (id, name) 
    VALUES (p_id, p_name);
END $$

-- 2. Update an Allergy
CREATE PROCEDURE updateallergy(
    IN p_allergyId INT,
    IN p_allergyName VARCHAR(255)
)
BEGIN
    UPDATE Allergy 
    SET name = p_allergyName
    WHERE id = p_allergyId;
END $$

-- 3. Delete an Allergy
CREATE PROCEDURE deleteallergy(
    IN p_allergyId INT
)
BEGIN
    DELETE FROM Allergy WHERE id = p_allergyId;
END $$

-- 4. Get a Single Allergy by ID
CREATE PROCEDURE getallergy(
    IN p_allergyId INT
)
BEGIN
    SELECT id, name, photo 
    FROM Allergy 
    WHERE id = p_allergyId;
END $$

-- 5. Get All Allergies
CREATE PROCEDURE getallergys()
BEGIN
    SELECT id, name, photo FROM Allergy;
END $$

-- 6. Search Allergies by Name
CREATE PROCEDURE Searchallergy(
    IN p_searchTerm VARCHAR(255)
)
BEGIN
    SELECT id, name, photo 
    FROM Allergy 
    WHERE name LIKE CONCAT('%', p_searchTerm, '%');
END $$

DELIMITER ;

-- ----------------------------------- AnimalCategories Procedures --------------------------------- --

DELIMITER $$

-- 1. Create an Animal Category
CREATE PROCEDURE createAnimalCategory(
    IN p_name VARCHAR(255)
)
BEGIN
    INSERT INTO AnimalCategory (name) 
    VALUES (p_name);
END $$

-- 2. Update an Animal Category
CREATE PROCEDURE updateAnimalCategory(
    IN p_animalCategId INT,
    IN p_animalCategName VARCHAR(255)
)
BEGIN
    UPDATE AnimalCategory 
    SET name = p_animalCategName
    WHERE id = p_animalCategId;
END $$

-- 3. Delete an Animal Category
CREATE PROCEDURE deleteAnimalCategory(
    IN p_animalCategId INT
)
BEGIN
    DELETE FROM AnimalCategory WHERE id = p_animalCategId;
END $$

-- 4. Get a Single Animal Category by ID
CREATE PROCEDURE getAnimalCategory(
    IN p_animalCategId INT
)
BEGIN
    SELECT id, name
    FROM AnimalCategory 
    WHERE id = p_animalCategId;
END $$

-- 5. Get All Animal Categories
CREATE PROCEDURE getAnimalCategories()
BEGIN
    SELECT id, name FROM AnimalCategory;
END $$

-- 6. Search Animal Categories by Name
CREATE PROCEDURE searchAnimalCategory(
    IN p_searchTerm VARCHAR(255)
)
BEGIN
    SELECT id, name 
    FROM AnimalCategory 
    WHERE name LIKE CONCAT('%', p_searchTerm, '%');
END $$

DELIMITER ;

-- ----------------------------------- User Procedures --------------------------------- --

DELIMITER $$

-- 1. Create a User
CREATE PROCEDURE createUser(
    IN p_first_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_city VARCHAR(255),
    IN p_address VARCHAR(255),
    IN p_phone_number INT,
    IN p_zip_code INT,
    IN p_gender VARCHAR(50),
    IN p_profile_picture VARCHAR(255),
    IN p_role INT,
    IN p_languages TEXT,
    IN p_payment_method VARCHAR(255),
    IN p_birth_date DATE
)
BEGIN
    INSERT INTO Users (first_name, last_name, email, password, city, address, phone_number, zip_code, gender, profile_picture, role, languages, payment_method, birth_date, created_at)
    VALUES (p_first_name, p_last_name, p_email, p_password, p_city, p_address, p_phone_number, p_zip_code, p_gender, p_profile_picture, p_role, p_languages, p_payment_method, p_birth_date, NOW());
END $$

-- 2. Update a User
CREATE PROCEDURE updateUser(
    IN p_user_id INT,
    IN p_first_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_city VARCHAR(255),
    IN p_address VARCHAR(255),
    IN p_phone_number INT,
    IN p_zip_code INT,
    IN p_gender VARCHAR(50),
    IN p_profile_picture VARCHAR(255),
    IN p_role INT,
    IN p_languages TEXT,
    IN p_payment_method VARCHAR(255),
    IN p_birth_date DATE
)
BEGIN
    UPDATE Users 
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
END $$

-- 3. Delete a User
CREATE PROCEDURE deleteUser(
    IN p_user_id INT
)
BEGIN
    UPDATE users 
    SET status = 0,  -- Assuming 0 means inactive
        deleted_at = NOW(),
        updated_at = NOW()
    WHERE id = p_user_id;
END $$

-- 4. Get a Single User by ID
CREATE PROCEDURE getUser(
    IN p_user_id INT
)
BEGIN
    SELECT * FROM Users WHERE id = p_user_id;
END $$

-- 5. Get All Users
CREATE PROCEDURE getUsers()
BEGIN
    SELECT * FROM user;
END $$

-- 6. Search Users by Name
CREATE PROCEDURE searchUser(
    IN p_searchTerm VARCHAR(255)
)
BEGIN
    SELECT * 
    FROM user 
    WHERE first_name LIKE CONCAT('%', p_searchTerm, '%')
       OR last_name LIKE CONCAT('%', p_searchTerm, '%')
       OR email LIKE CONCAT('%', p_searchTerm, '%');
END $$

CREATE PROCEDURE getUserByEmail(
IN  p_email VARCHAR(255)
)
BEGIN
SELECT *
FROM Users
WHERE email = p_email;
END$$

CREATE PROCEDURE toAdmin(
IN p_id int
)
BEGIN
UPDATE user
SET role = 0
where id = p_id;


DELIMITER ;

