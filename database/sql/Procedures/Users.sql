-- ----------------- Drop Users if exist ----------------- --

DROP PROCEDURE IF EXISTS createUser;
DROP PROCEDURE IF EXISTS createUserandToken;
DROP PROCEDURE IF EXISTS updateUser;
DROP PROCEDURE IF EXISTS deleteUser;
DROP PROCEDURE IF EXISTS getUser;
DROP PROCEDURE IF EXISTS getAllUsers;
DROP PROCEDURE IF EXISTS searchUsers;
DROP PROCEDURE IF EXISTS getUsersByRole;
DROP PROCEDURE IF EXISTS getUserByEmail;
DROP PROCEDURE IF EXISTS getUserByUsername;
DROP PROCEDURE IF EXISTS updateUserToken;
DROP PROCEDURE IF EXISTS validateUserCredentials;
DROP PROCEDURE IF EXISTS activateUser;
DROP PROCEDURE IF EXISTS deactivateUser;
DROP PROCEDURE IF EXISTS tocargiver;
DROP PROCEDURE IF EXISTS nocargiver;
DROP PROCEDURE IF EXISTS checkifcargiver;

DELIMITER //

-- Crear un usuario nuevo
CREATE PROCEDURE createUser(
    IN p_firstname VARCHAR(100),
    IN p_lastname VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_address VARCHAR(255),
    IN p_rol INT,
    IN p_telephone VARCHAR(45),
    IN p_gender ENUM ('female','male',''),
    IN p_postalcode VARCHAR(20),
    IN p_birthdate DATE,
    IN p_languages VARCHAR(100),
    IN p_emergencynum VARCHAR(45),
    IN p_paymentmethod ENUM ('buzime','tarjeta','paypal'),
    IN p_city VARCHAR(100),
    IN p_latitud DECIMAL(10, 7),
    IN p_longitud DECIMAL(10, 7),
    IN p_username VARCHAR(100)
)
BEGIN
    INSERT INTO users (firstname, lastname, email, password, address, rol, telephone, gender,
                       postalcode, birthdate, languages, emergencynum, paymentmethod, city,
                       latitud, longitud, createdat, updatedAt, username, state)
    VALUES (p_firstname, p_lastname, p_email, p_password, p_address, p_rol, p_telephone, p_gender,
            p_postalcode, p_birthdate, p_languages, p_emergencynum, p_paymentmethod, p_city,
            p_latitud, p_longitud, NOW(), NOW(), p_username, 1);
END //


CREATE PROCEDURE createUserandToken(
    IN p_first_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_city VARCHAR(255),
    IN p_address VARCHAR(255),
    IN p_telephone VARCHAR(20),
    IN p_zip_code INT,
    IN p_gender VARCHAR(50),
    IN p_profile_picture VARCHAR(255),
    IN p_rol INT,
    IN p_languages TEXT,
    IN p_payment_method VARCHAR(255),
    IN p_birth_date DATE,
    IN p_token VARCHAR(255)
)
BEGIN
    INSERT INTO users (firstname, lastname, email, password, city, address, telephone,
                       postalcode, gender, photo, rol, languages, paymentmethod, birthdate,
                       createdAt, updatedAt, Token)
    VALUES (p_first_name, p_last_name, p_email, p_password, p_city,
            p_address, p_telephone, p_zip_code, p_gender, p_profile_picture, p_rol,
            p_languages, p_payment_method, p_birth_date, NOW(), NOW(), p_token);
END //


-- Actualizar un usuario existente
CREATE PROCEDURE updateUser(
    IN p_id INT,
    IN p_firstname VARCHAR(100),
    IN p_lastname VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_address VARCHAR(255),
    IN p_telephone VARCHAR(45),
    IN p_birthdate DATE,
    IN p_city VARCHAR(100)
)
BEGIN
    UPDATE users
    SET firstname = p_firstname,
        lastname  = p_lastname,
        email     = p_email,
        address   = p_address,
        telephone = p_telephone,
        birthdate = p_birthdate,
        city      = p_city,
        updatedAt = NOW()
    WHERE id = p_id
      AND state = 1;
END //

-- Eliminar un usuario (borrado lógico)
CREATE PROCEDURE deleteUser(
    IN p_id INT
)
BEGIN
    UPDATE users
    SET deletedAt = NOW(),
        state     = 0,
        updatedAt = NOW()
    WHERE id = p_id;
END //

-- Obtener un usuario por ID
CREATE PROCEDURE getUser(
    IN p_id INT
)
BEGIN
    SELECT id,
           firstname,
           lastname,
           email,
           address,
           rol,
           telephone,
           gender,
           photo,
           state,
           postalcode,
           birthdate,
           languages,
           emergencynum,
           paymentmethod,
           city,
           latitud,
           longitud,
           createdat,
           updatedAt,
           username
    FROM users
    WHERE id = p_id;
END //

-- Obtener todos los usuarios activos
CREATE PROCEDURE getAllUsers()
BEGIN
    SELECT id,
           firstname,
           lastname,
           email,
           address,
           rol,
           telephone,
           gender,
           photo,
           state,
           postalcode,
           birthdate,
           languages,
           emergencynum,
           paymentmethod,
           city,
           latitud,
           longitud,
           createdat,
           updatedAt,
           username
    FROM users
    WHERE state = 1;
END //

-- Buscar usuarios por nombre, apellido o correo electrónico
CREATE PROCEDURE searchUsers(
    IN p_search_term VARCHAR(255)
)
BEGIN
    SELECT id,
           firstname,
           lastname,
           email,
           address,
           rol,
           telephone,
           gender,
           photo,
           state,
           postalcode,
           birthdate,
           languages,
           emergencynum,
           paymentmethod,
           city,
           latitud,
           longitud,
           createdat,
           updatedAt,
           username
    FROM users
    WHERE (firstname LIKE CONCAT('%', p_search_term, '%')
        OR lastname LIKE CONCAT('%', p_search_term, '%')
        OR email LIKE CONCAT('%', p_search_term, '%')
        OR username LIKE CONCAT('%', p_search_term, '%'))
      AND state = 1;
END //

-- Obtener usuarios por rol
CREATE PROCEDURE getUsersByRole(
    IN p_rol INT
)
BEGIN
    SELECT id,
           firstname,
           lastname,
           email,
           address,
           rol,
           telephone,
           gender,
           photo,
           state,
           postalcode,
           birthdate,
           languages,
           emergencynum,
           paymentmethod,
           city,
           latitud,
           longitud,
           createdat,
           updatedAt,
           username
    FROM users
    WHERE rol = p_rol
      AND state = 1;
END //

-- Obtener usuario por email
CREATE PROCEDURE getUserByEmail(
    IN p_email VARCHAR(100)
)
BEGIN
    SELECT id,
           firstname,
           lastname,
           email,
           password,
           address,
           rol,
           telephone,
           gender,
           photo,
           state,
           postalcode,
           birthdate,
           languages,
           emergencynum,
           paymentmethod,
           city,
           latitud,
           longitud,
           createdat,
           updatedAt,
           username
    FROM users
    WHERE email = p_email
      AND state = 1;
END //

-- Obtener usuario por nombre de usuario
CREATE PROCEDURE getUserByUsername(
    IN p_username VARCHAR(100)
)
BEGIN
    SELECT id,
           firstname,
           lastname,
           email,
           password,
           address,
           rol,
           telephone,
           gender,
           photo,
           state,
           postalcode,
           birthdate,
           languages,
           emergencynum,
           paymentmethod,
           city,
           latitud,
           longitud,
           createdat,
           updatedAt,
           username
    FROM users
    WHERE username = p_username
      AND state = 1;
END //


CREATE PROCEDURE UpdateUserToken(
    IN p_email VARCHAR(255),
    IN p_token LONGTEXT
)
BEGIN
    UPDATE users
    SET Token     = p_token,
        updatedAt = NOW()
    WHERE email = p_email;
END //

-- Validar credenciales de usuario
CREATE PROCEDURE validateUserCredentials(
    IN p_username VARCHAR(100),
    IN p_password VARCHAR(255)
)
BEGIN
    SELECT id,
           firstname,
           lastname,
           email,
           address,
           rol,
           telephone,
           gender,
           photo,
           state,
           postalcode,
           birthdate,
           languages,
           emergencynum,
           paymentmethod,
           city,
           latitud,
           longitud,
           createdat,
           updatedAt,
           username,
           Token
    FROM users
    WHERE (username = p_username OR email = p_username)
      AND password = p_password
      AND state = 1;
END //

-- Activar usuario
CREATE PROCEDURE activateUser(
    IN p_id INT
)
BEGIN
    UPDATE users
    SET state     = 1,
        updatedAt = NOW()
    WHERE id = p_id;
END //

-- Desactivar usuario
CREATE PROCEDURE deactivateUser(
    IN p_id INT
)
BEGIN
    UPDATE users
    SET state     = 0,
        updatedAt = NOW()
    WHERE id = p_id;
END //

CREATE PROCEDURE tocargiver(
    in p_id int
)
BEGIN
    UPDATE users SET rol = 2 WHERE id = p_id;
END //

CREATE PROCEDURE checkifcargiver(
    in p_id int
)
SELECT COUNT(*) > 0
FROM users
WHERE id = p_id
  AND rol = 2;

END//

CREATE PROCEDURE nocargiver(
    in p_id int
)
BEGIN
    UPDATE users SET rol = 1 WHERE id = p_id;
end//

DELIMITER;