-- ----------------- Drop if exist ----------------- --

DROP PROCEDURE IF EXISTS getAllPetIllnesses;
DROP PROCEDURE IF EXISTS getPetIllnessesByPet;
DROP PROCEDURE IF EXISTS getPetIllnessOfPet;
DROP PROCEDURE IF EXISTS updatePetIllnessStatus;
DROP PROCEDURE IF EXISTS deletePetIllness;
DROP PROCEDURE IF EXISTS createPetIllness;
DROP PROCEDURE IF EXISTS getPetIllnessesByIllness;


-- Create an Illness
DELIMITER //

CREATE PROCEDURE getAllPetIllnesses()
BEGIN
    SELECT pet,
           allergy,
           state
    FROM ilness;
END
//

CREATE PROCEDURE getPetIllnessesByPet(IN petId INT)
BEGIN
    SELECT pet,
           allergy,
           state
    FROM ilness
    WHERE pet = petId;
END
//

CREATE PROCEDURE getPetIllnessOfPet(IN illnessId INT, IN p_pet INT)
BEGIN
    SELECT pet,
           allergy,
           state
    FROM ilness
    WHERE allergy = illnessId
      AND pet = p_pet;
END
//

CREATE PROCEDURE updatePetIllnessStatus(IN newStatus INT, IN p_pet INT, IN p_allergy INT)
BEGIN
    UPDATE ilness
    SET state = newStatus
    WHERE pet = p_pet
      AND allergy = p_allergy;
END
//

CREATE PROCEDURE deletePetIllness(IN p_pet INT, IN p_allergy INT)
BEGIN
    DELETE
    FROM ilness
    WHERE pet = p_pet
      AND allergy = p_allergy;
END
//

CREATE PROCEDURE createPetIllness(
    IN p_pet INT,
    IN p_allergy INT,
    IN p_state INT
)
BEGIN
    INSERT INTO ilness (pet, allergy, state)
    VALUES (p_pet, p_allergy, p_state);
END;
//

CREATE PROCEDURE getPetIllnessesByIllness(IN illnessId INT)
BEGIN
    SELECT pet,
           allergy,
           state
    FROM ilness
    WHERE allergy = illnessId;
END
//

DELIMITER ;

