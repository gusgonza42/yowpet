-- ----------------- Drop Agenda if exist ----------------- --

DROP PROCEDURE IF EXISTS getnotification;
DROP PROCEDURE IF EXISTS createnotification;
DROP PROCEDURE IF EXISTS deletenotification;
DROP PROCEDURE IF EXISTS updatenotification;
DROP PROCEDURE IF EXISTS GETALLNOTIFICATION;

DELIMITER $$

CREATE PROCEDURE getnotification(
    IN _Date DATETIME,
     IN _userid INT
)
BEGIN
    SELECT id,
           date,
           Title
    FROM agenda
    WHERE date = _Date
    AND userid = _userid;
END $$

DELIMITER $$

CREATE PROCEDURE createnotification(
    IN _Date DATETIME,
    IN _Title VARCHAR(255),
    IN _userid INT
)
BEGIN
    insert into agenda (date, Title, userid) VALUES (_Date, _Title, _userid);
END $$

CREATE PROCEDURE deletenotification(
    IN _Date DATETIME,
    IN _userid INT
)
BEGIN
    DELETE
    FROM agenda
    WHERE date = _Date
      AND userid = _userid;
END $$

CREATE PROCEDURE updatenotification(
    IN _Date DATETIME,
    IN _Title VARCHAR(255),
    IN _userid INT
)
BEGIN
    UPDATE agenda
    SET Title = _Title
    WHERE date = _Date
      AND userid = _userid;
END $$

CREATE PROCEDURE GETALLNOTIFICATION(
    IN _userid INT
)
BEGIN
    SELECT date
    FROM agenda
    where userid = _userid;
END $$