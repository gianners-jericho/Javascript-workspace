CREATE DATABASE IF NOT EXISTS `mvc-login-registration`;
USE `mvc-login-registration`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
    `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `email` varchar(45) NOT NULL,
    `first_name` varchar(45) NOT NULL,
    `last_name` varchar(45) NOT NULL,
    `hash_password` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

COMMIT;