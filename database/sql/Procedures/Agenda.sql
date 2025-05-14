-- ----------------- Drop Agenda if exist ----------------- --

DROP PROCEDURE IF EXISTS getnotification;
DROP PROCEDURE IF EXISTS createnotification;
DROP PROCEDURE IF EXISTS deletenotification;
DROP PROCEDURE IF EXISTS updatenotification;

DELIMITER $$

CREATE PROCEDURE getnotification(
    IN _Date DATETIME
)
BEGIN
    SELECT id,
           date,
           Title
    FROM agenda
    WHERE date = _Date;
END $$

DELIMITER $$

CREATE PROCEDURE createnotification(
    IN _Date DATETIME,
    IN _Title VARCHAR(255)
)
BEGIN
    insert into agenda (date, Title) VALUES (_Date, _Title);
END $$

CREATE PROCEDURE deletenotification(
    IN _Date DATETIME
)
BEGIN
    DELETE
    FROM agenda
    WHERE date = _Date;
END $$

CREATE PROCEDURE updatenotification(
    IN _Date DATETIME,
    IN _Title VARCHAR(255)
)
BEGIN
    UPDATE agenda
    SET Title = _Title
    WHERE date = _Date;
END $$

CREATE PROCEDURE GETALLNOTIFICATION()
BEGIN
    SELECT date
    FROM agenda;
END $$