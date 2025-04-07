-- ----------------- Drop if exist ----------------- --

DROP PROCEDURE IF EXISTS GetAllLessonReviews;
DROP PROCEDURE IF EXISTS GetLessonReviewById;
DROP PROCEDURE IF EXISTS SearchLessonReviewsByRating;
DROP PROCEDURE IF EXISTS CreateLessonReview;
DROP PROCEDURE IF EXISTS UpdateLessonReview;
DROP PROCEDURE IF EXISTS SoftDeleteLessonReview;



DELIMITER //
CREATE PROCEDURE GetAllLessonReviews()
BEGIN
SELECT * FROM lesson_reviews WHERE estado <> 0;
END //
DELIMITER ;

-- Procedure to get a lesson review by ID
DELIMITER //
CREATE PROCEDURE GetLessonReviewById(IN review_id BIGINT)
BEGIN
SELECT * FROM lesson_reviews WHERE id = review_id AND estado <> 0;
END //
DELIMITER ;

-- Procedure to search lesson reviews by rounded rating
DELIMITER //
CREATE PROCEDURE SearchLessonReviewsByRating(IN review_rating DOUBLE)
BEGIN
SELECT * FROM lesson_reviews WHERE ROUND(rating, 1) = review_rating AND estado <> 0;
END //
DELIMITER ;

-- Procedure to create a lesson review
DELIMITER //
CREATE PROCEDURE CreateLessonReview(
    IN p_lesson_id BIGINT,
    IN p_user_id BIGINT,
    IN p_rating DOUBLE,
    IN p_comment TEXT
)
BEGIN
INSERT INTO lesson_reviews (lesson_id, user_id, rating, comment, estado)
VALUES (p_lesson_id, p_user_id, ROUND(p_rating, 1), p_comment, 1);
END //
DELIMITER ;

-- Procedure to update a lesson review
DELIMITER //
CREATE PROCEDURE UpdateLessonReview(
    IN review_id BIGINT,
    IN new_rating DOUBLE,
    IN new_comment TEXT,
    IN new_estado INT
)
BEGIN
UPDATE lesson_reviews
SET rating  = ROUND(new_rating, 1),
    comment = new_comment,
    estado  = new_estado
WHERE id = review_id;
END //
DELIMITER ;

-- Procedure to soft delete a lesson review
DELIMITER //
CREATE PROCEDURE SoftDeleteLessonReview(IN review_id BIGINT)
BEGIN
UPDATE lesson_reviews SET estado = 0 WHERE id = review_id;
END //
DELIMITER ;