-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema todoapp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema todoapp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `todoapp` DEFAULT CHARACTER SET utf8 ;
USE `todoapp` ;

-- -----------------------------------------------------
-- Table `todoapp`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todoapp`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `pass` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `iduser_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name` (`name` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`activity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todoapp`.`activities` (
  `idactivity` INT NOT NULL AUTO_INCREMENT,
  `history` VARCHAR(300) NULL,
  `timestamp` DATE NULL,
  `users_id` INT(11) NOT NULL,
  PRIMARY KEY (`idactivity`, `users_id`),
  INDEX `fk_activity_users_idx` (`users_id` ASC),
  CONSTRAINT `fk_activity_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `todoapp`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `todoapp` ;

-- -----------------------------------------------------
-- Table `todoapp`.`todos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todoapp`.`todos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `status` TINYINT(1) NOT NULL,
  `timeOut` INT(11) NOT NULL,
  `users_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  UNIQUE INDEX `idtodo_UNIQUE` (`id` ASC),
  INDEX `fk_todos_users_idx` (`users_id` ASC),
  CONSTRAINT `fk_todos_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `todoapp`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 68
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
