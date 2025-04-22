-- ----------------- Drop Users if exist ----------------- --

DROP PROCEDURE IF EXISTS createUser;
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
    IN p_gender ENUM('female','male',''),
    IN p_postalcode VARCHAR(20),
    IN p_birthdate DATE,
    IN p_languages VARCHAR(100),
    IN p_emergencynum VARCHAR(45),
    IN p_paymentmethod ENUM('buzime','tarjeta','paypal'),
    IN p_city VARCHAR(100),
    IN p_latitud DECIMAL(10,7),
    IN p_longitud DECIMAL(10,7),
    IN p_username VARCHAR(100)
)
BEGIN
    INSERT INTO users (
        firstname, lastname, email, password, address, rol, telephone, gender,
        postalcode, birthdate, languages, emergencynum, paymentmethod, city,
        latitud, longitud, createdat, updatedAt, username, state
    )
    VALUES (
        p_firstname, p_lastname, p_email, p_password, p_address, p_rol, p_telephone, p_gender,
        p_postalcode, p_birthdate, p_languages, p_emergencynum, p_paymentmethod, p_city,
        p_latitud, p_longitud, NOW(), NOW(), p_username, 1
    );
END //

-- Actualizar un usuario existente
CREATE PROCEDURE updateUser(
    IN p_id INT,
    IN p_firstname VARCHAR(100),
    IN p_lastname VARCHAR(100),
    IN p_address VARCHAR(255),
    IN p_rol INT,
    IN p_telephone VARCHAR(45),
    IN p_gender ENUM('female','male',''),
    IN p_postalcode VARCHAR(20),
    IN p_birthdate DATE,
    IN p_languages VARCHAR(100),
    IN p_emergencynum VARCHAR(45),
    IN p_paymentmethod ENUM('buzime','tarjeta','paypal'),
    IN p_city VARCHAR(100),
    IN p_latitud DECIMAL(10,7),
    IN p_longitud DECIMAL(10,7),
    IN p_username VARCHAR(100)
)
BEGIN
    UPDATE users
    SET firstname = p_firstname,
        lastname = p_lastname,
        address = p_address,
        rol = p_rol,
        telephone = p_telephone,
        gender = p_gender,
        postalcode = p_postalcode,
        birthdate = p_birthdate,
        languages = p_languages,
        emergencynum = p_emergencynum,
        paymentmethod = p_paymentmethod,
        city = p_city,
        latitud = p_latitud,
        longitud = p_longitud,
        username = p_username,
        updatedAt = NOW()
    WHERE id = p_id AND state = 1;
END //

-- Eliminar un usuario (borrado lógico)
CREATE PROCEDURE deleteUser(
    IN p_id INT
)
BEGIN
    UPDATE users
    SET deletedAt = NOW(),
        state = 0,
        updatedAt = NOW()
    WHERE id = p_id;
END //

-- Obtener un usuario por ID
CREATE PROCEDURE getUser(
    IN p_id INT
)
BEGIN
    SELECT id, firstname, lastname, email, address, rol, telephone, gender,
           photo, state, postalcode, birthdate, languages, emergencynum,
           paymentmethod, city, latitud, longitud, createdat, updatedAt, username
    FROM users
    WHERE id = p_id;
END //

-- Obtener todos los usuarios activos
CREATE PROCEDURE getAllUsers()
BEGIN
    SELECT id, firstname, lastname, email, address, rol, telephone, gender,
           photo, state, postalcode, birthdate, languages, emergencynum,
           paymentmethod, city, latitud, longitud, createdat, updatedAt, username
    FROM users
    WHERE state = 1;
END //

-- Buscar usuarios por nombre, apellido o correo electrónico
CREATE PROCEDURE searchUsers(
    IN p_search_term VARCHAR(255)
)
BEGIN
    SELECT id, firstname, lastname, email, address, rol, telephone, gender,
           photo, state, postalcode, birthdate, languages, emergencynum,
           paymentmethod, city, latitud, longitud, createdat, updatedAt, username
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
    SELECT id, firstname, lastname, email, address, rol, telephone, gender,
           photo, state, postalcode, birthdate, languages, emergencynum,
           paymentmethod, city, latitud, longitud, createdat, updatedAt, username
    FROM users
    WHERE rol = p_rol AND state = 1;
END //

-- Obtener usuario por email
CREATE PROCEDURE getUserByEmail(
    IN p_email VARCHAR(100)
)
BEGIN
    SELECT id, firstname, lastname, email, password, address, rol, telephone, gender,
           photo, state, postalcode, birthdate, languages, emergencynum,
           paymentmethod, city, latitud, longitud, createdat, updatedAt, username
    FROM users
    WHERE email = p_email AND state = 1;
END //

-- Obtener usuario por nombre de usuario
CREATE PROCEDURE getUserByUsername(
    IN p_username VARCHAR(100)
)
BEGIN
    SELECT id, firstname, lastname, email, password, address, rol, telephone, gender,
           photo, state, postalcode, birthdate, languages, emergencynum,
           paymentmethod, city, latitud, longitud, createdat, updatedAt, username
    FROM users
    WHERE username = p_username AND state = 1;
END //

-- Actualizar el token de un usuario
CREATE PROCEDURE updateUserToken(
    IN p_id INT,
    IN p_token LONGTEXT
)
BEGIN
    UPDATE users
    SET Token = p_token,
        updatedAt = NOW()
    WHERE id = p_id;
END //

-- Validar credenciales de usuario
CREATE PROCEDURE validateUserCredentials(
    IN p_username VARCHAR(100),
    IN p_password VARCHAR(255)
)
BEGIN
    SELECT id, firstname, lastname, email, address, rol, telephone, gender,
           photo, state, postalcode, birthdate, languages, emergencynum,
           paymentmethod, city, latitud, longitud, createdat, updatedAt, username, Token
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
    SET state = 1,
        updatedAt = NOW()
    WHERE id = p_id;
END //

-- Desactivar usuario
CREATE PROCEDURE deactivateUser(
    IN p_id INT
)
BEGIN
    UPDATE users
    SET state = 0,
        updatedAt = NOW()
    WHERE id = p_id;
END //

DELIMITER ;