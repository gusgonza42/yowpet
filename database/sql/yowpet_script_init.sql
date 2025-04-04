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
                                       `id` INT NOT NULL AUTO_INCREMENT,
                                       `firstname` VARCHAR(100) NOT NULL,
                                       `lastname` VARCHAR(100) NOT NULL,
                                       `email` VARCHAR(100) NOT NULL UNIQUE,
                                       `password` VARCHAR(255) NOT NULL,
                                       `address` VARCHAR(255) NOT NULL,
                                       `rol` ENUM('admin', 'caregiver', 'user') NOT NULL DEFAULT 'user',
                                       `telephone` VARCHAR(45) NULL,
                                       `gender` ENUM('female', 'male') NOT NULL,
                                       `photo` BLOB NULL,
                                       `state` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
                                       `postalcode` VARCHAR(20) NOT NULL,
                                       `birthdate` DATE NULL,
                                       `languages` VARCHAR(100) NOT NULL DEFAULT 'English',
                                       `emergencynum` VARCHAR(45) NOT NULL,
                                       `paymentmethod` ENUM('buzime', 'tarjeta') NULL,
                                       `city` VARCHAR(100) NULL,
                                       `latitud` DECIMAL(10,7) NULL,
                                       `longitud` DECIMAL(10,7) NULL,
                                       `createdat` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                       PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `animal_categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `animal_categoria`;
CREATE TABLE IF NOT EXISTS `animal_categoria` (
                                                  `id` INT NOT NULL AUTO_INCREMENT,
                                                  `name` VARCHAR(100) NOT NULL UNIQUE,
                                                  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `animals`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `animals`;
CREATE TABLE IF NOT EXISTS `animals` (
                                         `id` INT NOT NULL AUTO_INCREMENT,
                                         `name` VARCHAR(100) NULL,
                                         `categoria` INT NOT NULL,
                                         PRIMARY KEY (`id`),
                                         FOREIGN KEY (`categoria`) REFERENCES `animal_categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `places`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `places`;
CREATE TABLE IF NOT EXISTS `places` (
                                        `id` INT NOT NULL AUTO_INCREMENT,
                                        `name` VARCHAR(100) NOT NULL,
                                        `address` VARCHAR(255) NOT NULL,
                                        `addresscode` VARCHAR(45) NOT NULL,
                                        PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `place_reviews`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `place_reviews`;
CREATE TABLE IF NOT EXISTS `place_reviews` (
                                               `id` INT NOT NULL AUTO_INCREMENT,
                                               `place_id` INT NOT NULL,
                                               `user_id` INT NOT NULL,
                                               `rating` INT NOT NULL,
                                               `comment` TEXT NULL,
                                               PRIMARY KEY (`id`),
                                               FOREIGN KEY (`place_id`) REFERENCES `places`(`id`),
                                               FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `pets`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pets`;
CREATE TABLE IF NOT EXISTS `pets` (
                                      `id` INT NOT NULL AUTO_INCREMENT,
                                      `users_id` INT NOT NULL,
                                      `animal_id` INT NOT NULL,
                                      `name` VARCHAR(100) NULL,
                                      `birthdate` DATE NULL,
                                      `gender` ENUM('female', 'male') NOT NULL,
                                      `strlization` ENUM('yes', 'no') NULL,
                                      `photo` BLOB NULL,
                                      PRIMARY KEY (`id`),
                                      FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
                                      FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `reservations`
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
                                              FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
                                              FOREIGN KEY (`caregiver_id`) REFERENCES `users`(`id`),
                                              FOREIGN KEY (`pet_id`) REFERENCES `pets`(`id`)
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
