-- create database if not exists
CREATE DATABASE IF NOT EXISTS `sports_players_db`
    DEFAULT CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `sports_players_db`;

-- create players table
CREATE TABLE IF NOT EXISTS `players` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `sport` ENUM('basketball', 'volleyball', 'soccer', 'football') NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- truncate table to avoid duplicate entries on re-runs
TRUNCATE TABLE `players`;

-- insert dozens of sports players
INSERT INTO `players` (`name`, `gender`, `sport`) VALUES
    -- basketball (male)
    ('LeBron James', 'male', 'basketball'),
    ('Stephen Curry', 'male', 'basketball'),
    ('Kevin Durant', 'male', 'basketball'),
    ('Giannis Antetokounmpo', 'male', 'basketball'),
    ('Luka Doncic', 'male', 'basketball'),
    ('Kobe Bryant', 'male', 'basketball'),
    ('Michael Jordan', 'male', 'basketball'),
    ('Shaquille O''Neal', 'male', 'basketball'),

    -- basketball (female)
    ('Caitlin Clark', 'female', 'basketball'),
    ('Sabrina Ionescu', 'female', 'basketball'),
    ('Breanna Stewart', 'female', 'basketball'),
    ('A''ja Wilson', 'female', 'basketball'),
    ('Sue Bird', 'female', 'basketball'),
    ('Diana Taurasi', 'female', 'basketball'),
    ('Candace Parker', 'female', 'basketball'),
    ('Maya Moore', 'female', 'basketball'),

    -- volleyball (male)
    ('Yuji Nishida', 'male', 'volleyball'),
    ('Earvin N''Gapeth', 'male', 'volleyball'),
    ('Ivan Zaytsev', 'male', 'volleyball'),
    ('Bruno Rezende', 'male', 'volleyball'),
    ('Wilfredo Leon', 'male', 'volleyball'),
    ('Ran Takahashi', 'male', 'volleyball'),
    ('Matthew Anderson', 'male', 'volleyball'),

    -- volleyball (female)
    ('Alyssa Valdez', 'female', 'volleyball'),
    ('Jaja Santiago', 'female', 'volleyball'),
    ('Paola Egonu', 'female', 'volleyball'),
    ('Tijana Boskovic', 'female', 'volleyball'),
    ('Zhu Ting', 'female', 'volleyball'),
    ('Jordan Larson', 'female', 'volleyball'),
    ('Gabriela Guimaraes', 'female', 'volleyball'),
    ('Kim Yeon-koung', 'female', 'volleyball'),

    -- soccer (male)
    ('Lionel Messi', 'male', 'soccer'),
    ('Cristiano Ronaldo', 'male', 'soccer'),
    ('Kylian Mbappe', 'male', 'soccer'),
    ('Erling Haaland', 'male', 'soccer'),
    ('Neymar Jr', 'male', 'soccer'),
    ('Luka Modric', 'male', 'soccer'),
    ('Kevin De Bruyne', 'male', 'soccer'),

    -- soccer (female)
    ('Alex Morgan', 'female', 'soccer'),
    ('Megan Rapinoe', 'female', 'soccer'),
    ('Marta Vieira da Silva', 'female', 'soccer'),
    ('Sam Kerr', 'female', 'soccer'),
    ('Aitana Bonmati', 'female', 'soccer'),
    ('Alexia Putellas', 'female', 'soccer'),
    ('Christine Sinclair', 'female', 'soccer'),

    -- football (male)
    ('Tom Brady', 'male', 'football'),
    ('Patrick Mahomes', 'male', 'football'),
    ('Travis Kelce', 'male', 'football'),
    ('Aaron Rodgers', 'male', 'football'),
    ('Lamar Jackson', 'male', 'football'),
    ('Christian McCaffrey', 'male', 'football'),
    ('Joe Burrow', 'male', 'football'),

    -- football (female)
    ('Diana Flores', 'female', 'football'),
    ('Vanita Krouch', 'female', 'football'),
    ('Salli Clavelle', 'female', 'football'),
    ('Lisa Horton', 'female', 'football'),
    ('Sami Grisafe', 'female', 'football'),
    ('Callie Brownson', 'female', 'football');
