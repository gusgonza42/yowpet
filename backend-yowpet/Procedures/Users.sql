-- ----------------- Drop if exist ----------------- --

DROP PROCEDURE IF EXISTS createUser;
DROP PROCEDURE IF EXISTS updateUser;
DROP PROCEDURE IF EXISTS deleteUser;
DROP PROCEDURE IF EXISTS getUser;
DROP PROCEDURE IF EXISTS getUsers;
DROP PROCEDURE IF EXISTS searchUsers;
DROP PROCEDURE IF EXISTS updateUserProfile;
DROP PROCEDURE IF EXISTS getActiveUsers;
DROP PROCEDURE IF EXISTS toAdmin;
DROP PROCEDURE IF EXISTS unadmin;
DROP PROCEDURE IF EXISTS getAdmins;
DROP PROCEDURE IF EXISTS getUserByusername;
DROP PROCEDURE IF EXISTS getUserByEmail;
DROP PROCEDURE IF EXISTS createUserandToken;


DELIMITER
//
-- Create a User
CREATE PROCEDURE createUser(
    IN p_first_name VARCHAR (255),
    IN p_last_name VARCHAR (255),
    IN p_email VARCHAR (255),
    IN p_password VARCHAR (255),
    IN p_city VARCHAR (255),
    IN p_address VARCHAR (255),
    IN p_telephone VARCHAR (20),
    IN p_zip_code INT,
    IN p_gender VARCHAR (50),
    IN p_profile_picture VARCHAR (255),
    IN p_rol INT,
    IN p_languages TEXT,
    IN p_payment_method VARCHAR (255),
    IN p_birth_date DATE
)
BEGIN
INSERT INTO users (firstname, lastname, email, password, city, address, telephone, postalcode, gender,
                   photo, rol, languages, paymentmethod, birthdate, createdAt, updatedAt)
VALUES (p_first_name, p_last_name, p_email, p_password, p_city, p_address, p_telephone, p_zip_code, p_gender,
        p_profile_picture, p_rol, p_languages, p_payment_method, p_birth_date, NOW(), NOW());
END
//
DELIMITER //
-- Update a User
CREATE PROCEDURE updateUser(
    IN p_user_id INT,
    IN p_first_name VARCHAR (255),
    IN p_last_name VARCHAR (255),
    IN p_email VARCHAR (255),
    IN p_city VARCHAR (255),
    IN p_address VARCHAR (255),
    IN p_telephone VARCHAR (20),
    IN p_zip_code INT,
    IN p_gender VARCHAR (50),
    IN p_profile_picture VARCHAR (255),
    IN p_rol INT,
    IN p_languages TEXT,
    IN p_payment_method VARCHAR (255),
    IN p_birth_date DATE
)
BEGIN
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
END
//

-- Delete a User (Soft Delete)
CREATE PROCEDURE deleteUser(
    IN p_user_id INT
)
BEGIN
UPDATE users
SET state     = 2,
    deletedAt = NOW(),
    updatedAt = NOW()
WHERE id = p_user_id;
END
//

-- Get a Single User by ID
CREATE PROCEDURE getUser(
    IN p_user_id INT
)
BEGIN
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
END
//

-- Get All Users
CREATE PROCEDURE getUsers()
BEGIN
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
END
//

-- Search Users by Name, Last Name, or Email
CREATE PROCEDURE searchUsers(
    IN p_searchTerm VARCHAR (255)
)
BEGIN
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
END
//

-- Update User Profile
CREATE PROCEDURE updateUserProfile(
    IN p_user_id INT,
    IN p_first_name VARCHAR (255),
    IN p_last_name VARCHAR (255),
    IN p_email VARCHAR (255),
    IN p_city VARCHAR (255),
    IN p_address VARCHAR (255),
    IN p_telephone VARCHAR (20),
    IN p_zip_code INT,
    IN p_gender VARCHAR (50),
    IN p_profile_picture VARCHAR (255),
    IN p_languages TEXT,
    IN p_payment_method VARCHAR (255),
    IN p_birth_date DATE
)
BEGIN
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
END
//

-- Get Active Users
CREATE PROCEDURE getActiveUsers()
BEGIN
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
END
//

-- Make User an Admin
CREATE PROCEDURE toAdmin(
    IN p_user_id INT
)
BEGIN
UPDATE users
SET rol       = 1,
    updatedAt = NOW()
WHERE id = p_user_id;
END
//

-- Remove Admin Privileges
CREATE PROCEDURE unadmin(
    IN p_user_id INT
)
BEGIN
UPDATE users
SET rol       = 0,
    updatedAt = NOW()
WHERE id = p_user_id;
END
//

CREATE PROCEDURE getUserByEmail(
    IN p_email VARCHAR (255)
)
BEGIN
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
END
//


CREATE PROCEDURE getUserByusername(
    IN p_username VARCHAR (255)
)
BEGIN
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
END//
DELIMITER ;

CREATE PROCEDURE createUserandToken(
    IN p_first_name VARCHAR (255),
    IN p_last_name VARCHAR (255),
    IN p_username VARCHAR (255),
    IN p_email VARCHAR (255),
    IN p_password VARCHAR (255),
    IN p_city VARCHAR (255),
    IN p_address VARCHAR (255),
    IN p_telephone VARCHAR (20),
    IN p_zip_code INT,
    IN p_gender VARCHAR (50),
    IN p_profile_picture VARCHAR (255),
    IN p_rol INT,
    IN p_languages TEXT,
    IN p_payment_method VARCHAR (255),
    IN p_birth_date DATE,
    IN p_token VARCHAR (255)
)
BEGIN

    INSERT INTO users (firstname, lastname, username, email, password, city, address, telephone, postalcode, gender,
                       photo, rol, languages, paymentmethod, birthdate, createdAt, updatedAt, Token)
    VALUES (p_first_name, p_last_name, p_username, p_email, p_password, p_city, p_address, p_telephone, p_zip_code, p_gender,
            p_profile_picture, p_rol, p_languages, p_payment_method, p_birth_date, NOW(), NOW(),p_token);


END