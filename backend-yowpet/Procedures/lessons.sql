-- ----------------- Drop Lesson if exist ----------------- --

DROP PROCEDURE IF EXISTS createLesson;
DROP PROCEDURE IF EXISTS updateLesson;
DROP PROCEDURE IF EXISTS deleteLesson;
DROP PROCEDURE IF EXISTS getLesson;
DROP PROCEDURE IF EXISTS getAllLessons;
DROP PROCEDURE IF EXISTS searchLessons;
DROP PROCEDURE IF EXISTS getLessonsByEstado;
DROP PROCEDURE IF EXISTS GetAllLessonReviews;
DROP PROCEDURE IF EXISTS GetLessonReviewById;
DROP PROCEDURE IF EXISTS SearchLessonReviewsByRating;
DROP PROCEDURE IF EXISTS CreateLessonReview;
DROP PROCEDURE IF EXISTS UpdateLessonReview;
DROP PROCEDURE IF EXISTS SoftDeleteLessonReview;

-- Procedure to create a new lessons
DELIMITER //
CREATE PROCEDURE createLesson(
    IN p_title VARCHAR(255),
    IN p_content TEXT,
    IN p_estado INT
)
BEGIN
INSERT INTO lessons (title, content, estado)
VALUES (p_title, p_content, p_estado);
END //
DELIMITER ;

-- Procedure to update an existing lessons
DELIMITER //
CREATE PROCEDURE updateLesson(
    IN p_id INT,
    IN p_title VARCHAR(255),
    IN p_content TEXT,
    IN p_estado INT
)
BEGIN
UPDATE lessons
SET title   = p_title,
    content = p_content,
    estado  = p_estado
WHERE id = p_id;
END //
DELIMITER ;

-- Procedure to delete a lessons by ID
DELIMITER //
CREATE PROCEDURE deleteLesson(
    IN p_id INT
)
BEGIN
DELETE FROM lessons WHERE id = p_id;
END //
DELIMITER ;

-- Procedure to get a single lessons by ID
DELIMITER //
CREATE PROCEDURE getLesson(
    IN p_id INT
)
BEGIN
SELECT * FROM lessons WHERE id = p_id;
END //
DELIMITER ;

-- Procedure to get all lessonss
DELIMITER //
CREATE PROCEDURE getAllLessons()
BEGIN
SELECT * FROM lessons;
END //
DELIMITER ;

-- Procedure to search lessonss by title or content
DELIMITER //
CREATE PROCEDURE searchLessons(
    IN p_search_term VARCHAR(255)
)
BEGIN
SELECT *
FROM lessons
WHERE title LIKE p_search_term
   OR content LIKE p_search_term;
END //
DELIMITER ;

-- Procedure to get lessonss by estado
DELIMITER //
CREATE PROCEDURE getLessonsByEstado(
    IN p_estado INT
)
BEGIN
SELECT * FROM lessons WHERE estado = p_estado;
END //
DELIMITER ;