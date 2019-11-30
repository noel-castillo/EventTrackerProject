-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema eventtrackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `eventtrackerdb` ;

-- -----------------------------------------------------
-- Schema eventtrackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eventtrackerdb` DEFAULT CHARACTER SET utf8 ;
USE `eventtrackerdb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `email` VARCHAR(100) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address` ;

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT NOT NULL,
  `street` VARCHAR(100) NULL,
  `city` VARCHAR(100) NULL,
  `state` VARCHAR(100) NULL,
  `zip` VARCHAR(10) NULL,
  `phone` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `photoshoot`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `photoshoot` ;

CREATE TABLE IF NOT EXISTS `photoshoot` (
  `id` INT NOT NULL,
  `length` INT NOT NULL DEFAULT 0,
  `description` TEXT NULL,
  `address_id` INT NOT NULL,
  `user_email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`, `user_email`),
  INDEX `fk_photoshoot_address1_idx` (`address_id` ASC),
  INDEX `fk_photoshoot_user1_idx` (`user_email` ASC),
  CONSTRAINT `fk_photoshoot_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_photoshoot_user1`
    FOREIGN KEY (`user_email`)
    REFERENCES `user` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `photoshoot_image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `photoshoot_image` ;

CREATE TABLE IF NOT EXISTS `photoshoot_image` (
  `id` INT NOT NULL,
  `url` VARCHAR(250) NULL,
  `photoshoot_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_photoshoot_image_Photoshoot_idx` (`photoshoot_id` ASC),
  CONSTRAINT `fk_photoshoot_image_Photoshoot`
    FOREIGN KEY (`photoshoot_id`)
    REFERENCES `photoshoot` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `friends`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `friends` ;

CREATE TABLE IF NOT EXISTS `friends` (
  `user_email` VARCHAR(100) NOT NULL,
  `friend_email` VARCHAR(100) NOT NULL,
  INDEX `fk_friends_user1_idx` (`user_email` ASC),
  INDEX `fk_friends_user2_idx` (`friend_email` ASC),
  CONSTRAINT `fk_friends_user`
    FOREIGN KEY (`user_email`)
    REFERENCES `user` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_friends_friend`
    FOREIGN KEY (`friend_email`)
    REFERENCES `user` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS user@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'user'@'localhost' IDENTIFIED BY 'user';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'user'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtrackerdb`;
INSERT INTO `user` (`email`, `name`, `password`) VALUES ('noel@es', 'Noel', 'admin');
INSERT INTO `user` (`email`, `name`, `password`) VALUES ('annie@es', 'Annie', 'mozz');

COMMIT;


-- -----------------------------------------------------
-- Data for table `address`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtrackerdb`;
INSERT INTO `address` (`id`, `street`, `city`, `state`, `zip`, `phone`) VALUES (1, '99 West Central Street', 'Natick', 'MA', '01760', '760-978-8677');

COMMIT;


-- -----------------------------------------------------
-- Data for table `photoshoot`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtrackerdb`;
INSERT INTO `photoshoot` (`id`, `length`, `description`, `address_id`, `user_email`) VALUES (1, 120, 'A Holiday Shoot!', 1, 'annie@es');

COMMIT;


-- -----------------------------------------------------
-- Data for table `photoshoot_image`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtrackerdb`;
INSERT INTO `photoshoot_image` (`id`, `url`, `photoshoot_id`) VALUES (1, 'https://i.imgur.com/5IUznDP.jpg', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `friends`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtrackerdb`;
INSERT INTO `friends` (`user_email`, `friend_email`) VALUES ('noel@es', 'annie@es');
INSERT INTO `friends` (`user_email`, `friend_email`) VALUES ('annie@es', 'noel@es');

COMMIT;

