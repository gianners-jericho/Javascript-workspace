CREATE DATABASE IF NOT EXISTS `cars-framework`;
USE `cars-framework`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `cars`;
CREATE TABLE IF NOT EXISTS `cars` (
    `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `year` int NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;


INSERT INTO `cars` (`id`, `name`, `year`)
VALUES (1, 'Lamborghini', 2021),
    (2, 'Ferrari', 2018),
    (3, 'Mercedes-Benz', 2019);

COMMIT;