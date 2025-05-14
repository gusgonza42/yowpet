-- ----------------- Drop Lesson if exist ----------------- --

DROP PROCEDURE IF EXISTS createLesson;
DROP PROCEDURE IF EXISTS updateLesson;
DROP PROCEDURE IF EXISTS deleteLesson;
DROP PROCEDURE IF EXISTS getLesson;
DROP PROCEDURE IF EXISTS getAllLessons;
DROP PROCEDURE IF EXISTS searchLessons;
DROP PROCEDURE IF EXISTS getLessonsByEstado;

-- Procedure to create a new lessons
DELIMITER $$
CREATE PROCEDURE createLesson(
    IN p_title VARCHAR(255),
    IN p_thumbnail VARCHAR(255),
    IN p_description TEXT,
    IN p_steps TEXT,
    IN p_instruction_images TEXT,
    IN p_level ENUM('Fácil', 'Medio', 'Difícil'),
    IN p_status TINYINT(4)
)
BEGIN
    INSERT INTO lessons (title, thumbnail, description, steps, instruction_images, level, status)
    VALUES (p_title, p_thumbnail, p_description, p_steps, p_instruction_images, p_level, p_status);
END$$
DELIMITER ;

-- Procedure to update an existing lessons
DELIMITER $$
CREATE PROCEDURE updateLesson(
    IN p_id INT,
    IN p_title VARCHAR(255),
    IN p_thumbnail VARCHAR(255),
    IN p_description TEXT,
    IN p_steps TEXT,
    IN p_instruction_images TEXT,
    IN p_level ENUM('Fácil', 'Medio', 'Difícil'),
    IN p_status TINYINT(4)
)
BEGIN
    UPDATE lessons
    SET title = p_title,
        thumbnail = p_thumbnail,
        description = p_description,
        steps = p_steps,
        instruction_images = p_instruction_images,
        level = p_level,
        status = p_status,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_id;
END$$
DELIMITER ;

-- Procedure to delete a lessons by ID
DELIMITER $$
CREATE PROCEDURE deleteLesson(IN p_id INT)
BEGIN
    DELETE FROM lessons WHERE id = p_id;
END$$
DELIMITER ;

-- Procedure to get a single lessons by ID
DELIMITER $$
CREATE PROCEDURE getLesson(IN p_id INT)
BEGIN
    SELECT * FROM lessons WHERE id = p_id;
END$$
DELIMITER ;

-- Procedure to get all lessonss
DELIMITER $$
CREATE PROCEDURE getAllLessons()
BEGIN
    SELECT * FROM lessons;
END$$
DELIMITER ;

-- Procedure to search lessonss by title or content
DELIMITER $$

CREATE PROCEDURE searchLessons(
    IN searchKeyword VARCHAR(255)
)
BEGIN
    SELECT *
    FROM lessons
    WHERE title LIKE CONCAT('%', searchKeyword, '%')
       OR description LIKE CONCAT('%', searchKeyword, '%');
END$$

DELIMITER ;

-- Procedure to get lessonss by estado
DELIMITER $$

CREATE PROCEDURE getLessonsByEstado(
    IN estado TINYINT
)
BEGIN
    SELECT *
    FROM lessons
    WHERE status = estado;
END$$

DELIMITER ;