SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `users` (
  `id` varchar(225) NOT NULL PRIMARY KEY,
  `email` varchar(225) NOT NULL UNIQUE KEY,
  `password` varchar(225) NOT NULL,
  `role` varchar(225) NOT NULL,
  `firstname` varchar(225) NOT NULL,
  `surname` varchar(225) NOT NULL,
  `dob` varchar(225) NOT NULL,
  `gender` varchar(225) NOT NULL,
  `team` varchar(225) NOT NULL,
  `branch` varchar(225) NOT NULL,
  `zone` varchar(225) NOT NULL,
  `region` varchar(225) NOT NULL,
  `contact1` varchar(225) NOT NULL,
  `contact2` varchar(225) NOT NULL
);

CREATE TABLE `clients` (
  `id` varchar(225) NOT NULL PRIMARY KEY,
  `email` varchar(225) NOT NULL UNIQUE KEY,
  `firstname` varchar(225) NOT NULL,
  `surname` varchar(225) NOT NULL,
  `dob` varchar(225) NOT NULL,
  `gender` varchar(225) NOT NULL,
  `contact1` varchar(225) NOT NULL,
  `contact2` varchar(225) NOT NULL,
  `type` varchar(225) NOT NULL,
  `created` varchar(225) NOT NULL,
  `agent` varchar(225) NOT NULL,
  `mstatus` varchar(225) NOT NULL,
  `affordability` varchar(225) NOT NULL,
  `reservation` varchar(225) NOT NULL,
  `amount` varchar(225) NOT NULL,
  `nin` varchar(225) NOT NULL,
  `nin_doc` varchar(225) NOT NULL,
  `nin_eid` varchar(225) NOT NULL,
  `a_letter` varchar(225) NOT NULL,
  `i_letter` varchar(225) NOT NULL,
  `status` varchar(225) NOT NULL,
  `ipps` varchar(225) UNIQUE KEY,
  `mid` varchar(225) UNIQUE KEY
);
