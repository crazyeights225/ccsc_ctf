SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS store;
USE store;

DROP TABLE IF EXISTS `employees`;

COMMIT;

CREATE USER IF NOT EXISTS 'store'@'localhost' IDENTIFIED BY 'store';
GRANT ALL PRIVILEGES ON store.* TO 'store'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(10) unsigned NOT NULL,
  `username` varchar(40) COLLATE latin1_general_ci NOT NULL,
  `full_name` varchar(40) COLLATE latin1_general_ci NOT NULL,
  `position` varchar(40) COLLATE latin1_general_ci NOT NULL,
  `pass` varchar(40) COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

INSERT INTO `employees` (`id`, `username`, `full_name`, `position`, `pass`) VALUES
(1, 'EatBullets', 'Jake Smith', 'President', 'b026324c6904b2a9cb4b88d6d61c81d1'),
(2, 'PR0_GGRAM3D', 'John Wick', 'Vice President', '26ab0db90d72e28ad0ba1e22ee510510'),
(3, 'CoB@lt', 'Luke Skywalker', 'VP Sales', '6d7fce9fee471194aa8b5b6e47267f03'),
(4, 'SeekNDstroy', 'Han Solo', 'VP Marketing', '48a24b70a0b376535542b996af517398'),
(5, 'Bulletz4Breakfast', 'Obi-Wan Kenobi', 'VP Communications', '1dcca23355272056f04fe8bf20edfce0'),
(6, 'BigDamnHero', 'Jar Jar Binks', 'Sales', '9ae0ea9e3c9c6e1b9b6252c8395efdc1'),
(7, 'IronMAN77', 'Tony Stark', 'VP Engineering', '84bc3da1b3e33a18e8d5e1bdd7a18d7a'),
(8, 'FightClubAlum', 'Anakin Skywalker', 'Programmer', 'CCSCFLAG7{sqli_what_fun}'),
(9, 'BadBaneCat', 'Mace Windu', 'Programmer', 'these_are_not_real_passwords'),
(10, 'Ne0nCat3', 'Clark Kent', 'Programmer', 'hint_there_might_be_other'),
(11, 'IAmNotBatman123', 'Bruce Wayne', 'Programmer', 'useful_info_in_this_table'),
(12, 'PennywiseTheClown', 'Steve Rogers', 'Tester', '7c5aba41f53293b712fd86d08ed5b36e');

ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

COMMIT;
