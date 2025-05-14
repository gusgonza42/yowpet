-- ----------------- Drop if exist ----------------- --

DROP PROCEDURE IF EXISTS createPlaceReview;
DROP PROCEDURE IF EXISTS updatePlaceReview;
DROP PROCEDURE IF EXISTS deletePlaceReview;
DROP PROCEDURE IF EXISTS getPlaceReview;
DROP PROCEDURE IF EXISTS getAllPlaceReviews;
DROP PROCEDURE IF EXISTS searchPlaceReviews;
DROP PROCEDURE IF EXISTS getPlaceReviewsByPlace;
DROP PROCEDURE IF EXISTS getPlaceReviewsByUser;
DROP PROCEDURE IF EXISTS getPlaceReviewsByPlaceAndUser;
DROP PROCEDURE IF EXISTS getPlaceReviewsByIdandEstado;
DROP PROCEDURE IF EXISTS getPlaceReviewsByRating;


-- Create Place Review
DELIMITER  //
CREATE PROCEDURE createPlaceReview(
    IN p_rating DOUBLE,
    IN p_comment VARCHAR(255),
    IN p_place INT,
    IN p_user INT
)

BEGIN
    INSERT INTO place_reviews (rating, comment, status, place_id, user_id)
    VALUES (ROUND(p_rating, 1), p_comment, 1, p_place, p_user);
END //
DELIMITER ;

-- Update Place Review
DELIMITER  //
CREATE PROCEDURE updatePlaceReview(
    IN p_id INT,
    IN p_rating DOUBLE,
    IN p_comment VARCHAR(255),
    IN p_estado INT
)
BEGIN
    UPDATE place_reviews
    SET rating  = ROUND(p_rating, 1),
        comment = p_comment,
        status  = p_estado
    WHERE id = p_id
      AND status = 2;
END //
DELIMITER ;

-- Soft Delete Place Review
DELIMITER  //
CREATE PROCEDURE deletePlaceReview(
    IN p_id INT
)
BEGIN
    UPDATE place_reviews
    SET status = 0
    WHERE id = p_id;
END //
DELIMITER ;

-- Get Place Review by ID
DELIMITER  //
CREATE PROCEDURE getPlaceReview(
    IN p_id INT
)
BEGIN
    SELECT id,
           ROUND(rating, 1) AS rating,
           comment,
           place_id         as place,
           user_id          as user
    FROM place_reviews
    WHERE id = p_id
      AND status = 2;
END //
DELIMITER ;

-- Get All Active Place Reviews
DELIMITER  //
CREATE PROCEDURE getAllPlaceReviews()
BEGIN
    SELECT id,
           ROUND(rating, 1) AS rating,
           comment,
           place_id         as place,
           user_id          as user,
           status           as estado
    FROM place_reviews
    WHERE status = 2;
END //
DELIMITER ;

-- Search Place Reviews by Rating
DELIMITER  //
CREATE PROCEDURE searchPlaceReviews(
    IN p_rating DOUBLE
)
BEGIN
    SELECT id,
           ROUND(rating, 1) AS rating,
           comment,
           place_id         as place,
           user_id          as user
    FROM place_reviews
    WHERE ROUND(rating, 1) = ROUND(p_rating, 1)
      AND status = 2;
END //
DELIMITER ;

-- Get Place Reviews by Place
DELIMITER  //
CREATE PROCEDURE getPlaceReviewsByPlace(
    IN p_place INT
)
BEGIN
    SELECT id,
           ROUND(rating, 1) AS rating,
           comment,
           place_id         as place,
           user_id          as user
    FROM place_reviews
    WHERE place_id = p_place
      AND status = 2;
END //
DELIMITER ;

-- Get Place Reviews by User
DELIMITER  //
CREATE PROCEDURE getPlaceReviewsByUser(
    IN p_user INT
)
BEGIN
    SELECT id,
           ROUND(rating, 1) AS rating,
           comment,
           place_id         as place,
           user_id          as user
    FROM place_reviews
    WHERE user_id = p_user
      AND status = 2;
END //
DELIMITER ;

-- Get Place Reviews by Place and User
DELIMITER  //
CREATE PROCEDURE getPlaceReviewsByPlaceAndUser(
    IN p_place INT,
    IN p_user INT
)
BEGIN
    SELECT id,
           ROUND(rating, 1) AS rating,
           comment,
           place_id         as place,
           user_id          as user
    FROM place_reviews
    WHERE place_id = p_place
      AND user_id = p_user
      AND status = 2;
END //
DELIMITER ;

-- Get Place Reviews by ID and Estado
DELIMITER  //
CREATE PROCEDURE getPlaceReviewsByIdandEstado(
    IN p_id INT,
    IN p_estado INT
)
BEGIN
    SELECT id,
           ROUND(rating, 1) AS rating,
           comment,
           place_id         as place,
           user_id          as user
    FROM place_reviews
    WHERE id = p_id
      AND status = p_estado;
END //
DELIMITER ;

-- Get Place Reviews by Rating
DELIMITER  //
CREATE PROCEDURE getPlaceReviewsByRating(
    IN p_rating DOUBLE
)
BEGIN
    SELECT id,
           ROUND(rating, 1) AS rating,
           comment,
           place_id         as place,
           user_id          as user
    FROM place_reviews
    WHERE ROUND(rating, 1) = ROUND(p_rating, 1)
      AND status = 2;
END //
DELIMITER ;
