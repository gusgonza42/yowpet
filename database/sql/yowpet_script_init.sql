-- MySQL Script actualizado

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Yowpet
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `yowpet`;
CREATE SCHEMA IF NOT EXISTS `yowpet` DEFAULT CHARACTER SET utf8;
USE `yowpet`;

-- -----------------------------------------------------
-- Tabla `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `u_id` INT NOT NULL AUTO_INCREMENT,
  `u_firstname` VARCHAR(100) NOT NULL,
  `u_lastname` VARCHAR(100) NOT NULL,
  `u_email` VARCHAR(100) NOT NULL UNIQUE,
  `u_password` VARCHAR(255) NOT NULL,
  `u_address` VARCHAR(255) NOT NULL,
  `u_rol` ENUM('admin', 'caregiver', 'user') NOT NULL DEFAULT 'user',
  `u_telephone` VARCHAR(45) NULL,
  `u_gender` ENUM('female', 'male') NOT NULL,
  `u_photo` BLOB NULL,
  `u_state` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `u_postalcode` VARCHAR(20) NOT NULL,
  `u_birthdate` DATE NULL,
  `u_emergencynum` VARCHAR(45) NOT NULL,
  `u_paymentmethod` ENUM('buzime', 'tarjeta') NULL,
  `u_latitud` DECIMAL(10,7) NULL,
  `u_longitud` DECIMAL(10,7) NULL,
  `u_createdat` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`u_id`),
  UNIQUE INDEX `u_id_UNIQUE` (`u_id` ASC) VISIBLE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `animal_categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `animal_categoria`;
CREATE TABLE IF NOT EXISTS `animal_categoria` (
  `ac_id` INT NOT NULL AUTO_INCREMENT,
  `ac_name` VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (`ac_id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `animals`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `animals`;
CREATE TABLE IF NOT EXISTS `animals` (
  `a_id` INT NOT NULL AUTO_INCREMENT,
  `a_name` VARCHAR(100) NULL,
  `a_categoria` INT NOT NULL,
  PRIMARY KEY (`a_id`),
  INDEX `fk_animals_animal_categoria_idx` (`a_categoria` ASC) VISIBLE,
  CONSTRAINT `fk_animals_animal_categoria`
    FOREIGN KEY (`a_categoria`)
    REFERENCES `animal_categoria` (`ac_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `places`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `places`;
CREATE TABLE IF NOT EXISTS `places` (
  `l_id` INT NOT NULL AUTO_INCREMENT,
  `l_name` VARCHAR(100) NOT NULL,
  `l_address` VARCHAR(255) NOT NULL,
  `l_addresscode` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`l_id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `place_reviews`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `place_reviews`;
CREATE TABLE IF NOT EXISTS `place_reviews` (
  `pr_id` INT NOT NULL AUTO_INCREMENT,
  `place_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `rating` INT NOT NULL,
  `comment` TEXT NULL,
  PRIMARY KEY (`pr_id`),
  FOREIGN KEY (`place_id`) REFERENCES `places`(`l_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`u_id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `cuidadores_work`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cuidadores_work`;
CREATE TABLE IF NOT EXISTS `cuidadores_work` (
  `cuidador_id` INT NOT NULL,
  `User_id` INT NOT NULL,
  PRIMARY KEY (`cuidador_id`, `User_id`),
  INDEX `fk_users_has_users_users2_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_users_has_users_users1_idx` (`cuidador_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_users_users1`
    FOREIGN KEY (`cuidador_id`)
    REFERENCES `users` (`u_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_users_has_users_users2`
    FOREIGN KEY (`User_id`)
    REFERENCES `users` (`u_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `pets`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pets`;
CREATE TABLE IF NOT EXISTS `pets` (
  `p_id` INT NOT NULL AUTO_INCREMENT,
  `p_users_id` INT NOT NULL,
  `p_animal_id` INT NOT NULL,
  `p_name` VARCHAR(100) NULL,
  `p_birthdate` DATE NULL,
  `p_gender` ENUM('female', 'male') NOT NULL,
  `p_strlization` ENUM('yes', 'no') NULL,
  `p_photo` BLOB NULL,
  INDEX `fk_users_has_animals_animals1_idx` (`p_animal_id` ASC) VISIBLE,
  INDEX `fk_users_has_animals_users1_idx` (`p_users_id` ASC) VISIBLE,
  PRIMARY KEY (`p_id`),
  CONSTRAINT `fk_users_has_animals_users1`
    FOREIGN KEY (`p_users_id`)
    REFERENCES `users` (`u_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_users_has_animals_animals1`
    FOREIGN KEY (`p_animal_id`)
    REFERENCES `animals` (`a_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `alergies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `alergies`;
CREATE TABLE IF NOT EXISTS `alergies` (
  `al_id` INT NOT NULL AUTO_INCREMENT,
  `al_name` VARCHAR(100) NULL,
  `al_photo` BLOB NULL,
  PRIMARY KEY (`al_id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `illness`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `illness`;
CREATE TABLE IF NOT EXISTS `illness` (
  `Alergie_id` INT NOT NULL,
  `pet_id` INT NOT NULL,
  PRIMARY KEY (`Alergie_id`, `pet_id`),
  INDEX `fk_Alergies_has_pets_pets1_idx` (`pet_id` ASC) VISIBLE,
  INDEX `fk_Alergies_has_pets_Alergies1_idx` (`Alergie_id` ASC) VISIBLE,
  CONSTRAINT `fk_Alergies_has_pets_Alergies1`
    FOREIGN KEY (`Alergie_id`)
    REFERENCES `alergies` (`al_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Alergies_has_pets_pets1`
    FOREIGN KEY (`pet_id`)
    REFERENCES `pets` (`p_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `reservations` (Nueva tabla para reservas de cuidadores)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reservations`;
CREATE TABLE IF NOT EXISTS `reservations` (
  `reservation_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `caregiver_id` INT NOT NULL,
  `pet_id` INT NOT NULL,
  `reservation_date` DATETIME NOT NULL,
  `status` ENUM('pending', 'confirmed', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`reservation_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`u_id`),
  FOREIGN KEY (`caregiver_id`) REFERENCES `users`(`u_id`),
  FOREIGN KEY (`pet_id`) REFERENCES `pets`(`p_id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `lessons` (Nueva tabla para lecciones educativas)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lessons`;
CREATE TABLE IF NOT EXISTS `lessons` (
  `lesson_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`lesson_id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `lesson_reviews` (Nueva tabla para reseñas de lecciones)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lesson_reviews`;
CREATE TABLE IF NOT EXISTS `lesson_reviews` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `lesson_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `rating` INT NOT NULL,
  `comment` TEXT NULL,
  PRIMARY KEY (`review_id`),
  FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`lesson_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`u_id`)
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;