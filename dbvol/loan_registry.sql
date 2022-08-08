use mysql;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;

create database loan_registry;

use loan_registry;


CREATE TABLE `clients` (
  `id` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `firstname` varchar(225) NOT NULL,
  `surname` varchar(225) NOT NULL,
  `dob` varchar(225) NOT NULL,
  `gender` varchar(225) NOT NULL,
  `contact1` varchar(225) NOT NULL,
  `contact2` varchar(225) NOT NULL,
  `type` varchar(225) NOT NULL,
  `status` varchar(225) NOT NULL,
  `created` varchar(225) NOT NULL,
  `agent` varchar(225) NOT NULL,
  `mstatus` varchar(225) NOT NULL,
  `affordability` varchar(225) NOT NULL,
  `reservation` varchar(225) NOT NULL,
  `amount` varchar(225) NOT NULL,
  `nin` varchar(225) NOT NULL,
  `nin_doc` tinyint(1) NOT NULL DEFAULT 0,
  `eid_doc` tinyint(1) NOT NULL DEFAULT 0,
  `a_letter` tinyint(1) NOT NULL DEFAULT 0,
  `i_letter` tinyint(1) NOT NULL DEFAULT 0,
  `ipps` varchar(225) DEFAULT NULL,
  `mid` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `email`, `firstname`, `surname`, `dob`, `gender`, `contact1`, `contact2`, `type`, `status`, `created`, `agent`, `mstatus`, `affordability`, `reservation`, `amount`, `nin`, `nin_doc`, `eid_doc`, `a_letter`, `i_letter`, `ipps`, `mid`) VALUES
('03b1fc1f-4a76-4910-b6e3-2c613666956b', 'vfred@gmail.com', 'Voslo', 'Fred', '{\"year\":1954,\"month\":1,\"day\":1}', 'Male', '0783311028', '0783311028', 'CS Client', 'Valid Prospect', '{\"year\":2022,\"month\":5,\"day\":17}', '07e00e21-2d15-4db5-a062-3b521fb25613', 'Pending Tracking', '', 'No', '', '', 0, 0, 0, 0, NULL, NULL),
('042ee9d7-c7ad-4600-b3e2-8df73cafdaae', 'ppmunga@gmail.com', 'Mungati', 'Fred', '{\"year\":1992,\"month\":1,\"day\":8}', 'Male', '0783311028', '0783311028', 'LBF Client', 'Converted', '{\"year\":2022,\"month\":7,\"day\":19}', 'c06d9a8d-b865-4f1c-b4ad-7b27eb2e63a6', 'Disbursed', '', 'No', '1000000', '', 0, 0, 0, 0, NULL, '947937575ouierhouhoeu'),
('0e15a044-d42e-4fd4-a1c3-51e178d9c25d', 'maurice@gmail.com', 'Maurice', 'Mutabazi', '{\"year\":1992,\"month\":5,\"day\":6}', 'Male', '0772882926', '0783311028', 'CS Client', 'Prospect', '{\"year\":2022,\"month\":1,\"day\":10}', '07e00e21-2d15-4db5-a062-3b521fb25613', 'Pending Tracking', '', 'No', '', '', 0, 0, 0, 0, NULL, NULL),
('175d2cd9-8f67-4fda-a9c5-756b8f0d45b6', 'ppmunga@gmail.com', 'Mungati', 'Peter', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', '0783311028', '0783311028', 'LBF Client', 'Converted', '{\"year\":2022,\"month\":4,\"day\":21}', '12534163-2242-4cd9-91e3-5c2a2e57f754', 'Disbursed', '', 'No', '1000000', '', 0, 0, 0, 0, NULL, '94793567kuhdoiufhge'),
('2169a6aa-9f75-4db1-8ed2-e4a2d45dd92b', 'Rjbjam@gmail.com', 'Rajab', 'Jamal', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', '0783311028', '0772882928', 'LBF Client', 'Lead', '{\"year\":2022,\"month\":5,\"day\":16}', 'c06d9a8d-b865-4f1c-b4ad-7b27eb2e63a6', 'Pending Tracking', '', 'No', '', '', 0, 0, 0, 0, NULL, '308308486'),
('2c1bf98c-4f73-42ff-b8f6-1149ed329cef', 'kMandu@gmail.com', 'Kaduna', 'Mandu', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', '0783311028', '0783311028', 'LBF Client', 'Converted', '{\"year\":2022,\"month\":5,\"day\":14}', '12534163-2242-4cd9-91e3-5c2a2e57f754', 'Disbursed', '', 'No', '1000000', '', 0, 0, 0, 0, NULL, '946976389'),
('300166d0-4669-4d42-bf92-a470dd0facb4', 'ppmunga@gmail.com', 'Mungati', 'Paul', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', '0783311028', '078331108', 'LBF Client', 'Lead', '{\"year\":2022,\"month\":7,\"day\":19}', 'c06d9a8d-b865-4f1c-b4ad-7b27eb2e63a6', 'Valuation', '', 'No', '1000000', '', 0, 0, 0, 0, NULL, '9479377jyggsnjpoijrpf'),
('31dfec3d-452e-4460-8402-6fd1cd504199', 'julinaju@gmail.com', 'Julia', 'Najuma', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', '0783311028', '0783311028', 'LBF Client', 'Converted', '{\"year\":2022,\"month\":5,\"day\":14}', '12534163-2242-4cd9-91e3-5c2a2e57f754', 'Disbursed', '', 'No', '1000000', '', 0, 0, 0, 0, NULL, '385652652'),
('431d792d-f138-48d2-99ed-19e5f928f234', 'ppmunga@gmail.com', 'Mungati', 'Joseph', '{\"year\":1992,\"month\":1,\"day\":9}', 'Male', '0783311028', '0772404798', 'LBF Client', 'Prospect', '{\"year\":2022,\"month\":7,\"day\":19}', 'c06d9a8d-b865-4f1c-b4ad-7b27eb2e63a6', '', '', '', '', '', 0, 0, 0, 0, NULL, NULL),
('43541d8a-1c63-494c-ba4d-43fce10c2418', 'xkabogo@gmail.com', 'Xenon', 'Kabogoza', '{\"year\":1995,\"month\":1,\"day\":20}', 'Male', '0783311028', '0772882928', 'LBF Client', 'Converted', '{\"year\":2022,\"month\":5,\"day\":14}', '5808867a-c8a7-4f4e-a808-fcc37162dea5', 'Pending Caveat Placement', '', 'No', '1000000', '', 0, 0, 0, 0, NULL, '947937575kugtfdsodl'),
('47d6cd2a-129a-45d3-86de-944c78e6171a', 'kfranc@gmail.com', 'Kimera', 'Francis', '{\"year\":1992,\"month\":7,\"day\":11}', 'Male', '0783311028', '0783311028', 'LBF Client', 'Converted', '{\"year\":2022,\"month\":4,\"day\":21}', '5808867a-c8a7-4f4e-a808-fcc37162dea5', 'Disbursed', '', 'No', '', '', 0, 0, 0, 0, NULL, '947935671'),
('536165f0-9146-4223-88eb-24561375258a', 'mandy@gmail.com', 'Mwesigwa', 'Andrew', '{\"year\":1994,\"month\":8,\"day\":13}', 'Male', '0783311028', '0783311028', 'LBF Client', 'Valid Prospect', '{\"year\":2022,\"month\":4,\"day\":21}', '12534163-2242-4cd9-91e3-5c2a2e57f754', 'Pending Tracking', '', 'No', '', '', 0, 0, 0, 0, NULL, NULL),
('54c55457-44dd-4acf-9a20-5922dfc500ca', 'benal@gmail.com', 'Benson', 'Arsenal', '{\"year\":1995,\"month\":1,\"day\":7}', 'Male', '0783311028', '0783311028', 'LBF Client', 'Converted', '{\"year\":2022,\"month\":5,\"day\":17}', '5808867a-c8a7-4f4e-a808-fcc37162dea5', 'Disbursed', '', 'No', '', '', 0, 0, 0, 0, NULL, '76557463'),
('62f97e02-ab58-42a3-8d8a-554a7ea18687', 'ppmuga@gmail.com', 'Mungati', 'Pearl', '{\"year\":1995,\"month\":1,\"day\":7}', 'Female', '0783311028', '0783311028', 'LBF Client', 'Prospect', '{\"year\":2022,\"month\":7,\"day\":22}', 'c06d9a8d-b865-4f1c-b4ad-7b27eb2e63a6', '', '', '', '', '', 0, 0, 0, 0, NULL, NULL),
('6546aaf2-7086-44d9-aefc-99010d8e77d2', 'gloonaluz@gmail.com', 'Gloria', 'Naluzee', '{\"year\":1993,\"month\":1,\"day\":16}', 'Female', '0783311028', '0772882928', 'LBF Client', 'Prospect', '{\"year\":2022,\"month\":5,\"day\":14}', '5808867a-c8a7-4f4e-a808-fcc37162dea5', '', '', '', '', '', 0, 0, 0, 0, NULL, NULL),
('72d18906-f188-46b0-ab60-58f3ea541caa', 'jack@gmail.com', 'Jack', 'Mutabazi', '{\"year\":1992,\"month\":5,\"day\":6}', 'Male', '0772882926', '0783311028', 'CS Client', 'Prospect', '{\"year\":2021,\"month\":6,\"day\":1}', '07e00e21-2d15-4db5-a062-3b521fb25613', 'Pending Tracking', '', 'No', '', '', 0, 0, 0, 0, NULL, NULL),
('72fbcd37-606a-4256-8cc9-34851a0d1670', 'mojo@gmail.com', 'Mojo', 'Joseph', '{\"year\":1995,\"month\":1,\"day\":5}', 'Male', '0783311028', '0783311028', 'LBF Client', 'Lead', '{\"year\":2022,\"month\":4,\"day\":21}', '12534163-2242-4cd9-91e3-5c2a2e57f754', 'Disbursed', '', 'No', '', '', 0, 0, 0, 0, NULL, '947937575'),
('7a7b62c1-6071-4c09-9365-7ea39887571b', 'kasilamino@gmail.com', 'Kasila', 'Minolas', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', '0783311028', '0772882928', 'LBF Client', 'Prospect', '{\"year\":2022,\"month\":5,\"day\":16}', 'c06d9a8d-b865-4f1c-b4ad-7b27eb2e63a6', '', '', '', '', '', 0, 0, 0, 0, NULL, NULL),
('7c106d96-208c-406a-a813-552b424677ee', 'kerimadala@gmail.com', 'keriya', 'Madala', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', '0783311028', '0772882928', 'LBF Client', 'Prospect', '{\"year\":2022,\"month\":5,\"day\":16}', 'c06d9a8d-b865-4f1c-b4ad-7b27eb2e63a6', '', '', '', '', '', 0, 0, 0, 0, NULL, NULL),
('9a5e8522-fff0-422a-a9df-f0661f14c103', 'frod@gmail.com', 'Frod', 'Mutabazi', '{\"year\":1992,\"month\":5,\"day\":6}', 'Male', '0772882926', '0783311028', 'CS Client', 'Converted', '{\"year\":2021,\"month\":1,\"day\":1}', '07e00e21-2d15-4db5-a062-3b521fb25613', 'Pending Tracking', '2000', 'No', '1000000', '45764', 1, 1, 1, 1, NULL, NULL),
('bd86147d-3211-4f92-89f5-39d266254b38', 'rodgmasa@gmail.com', 'Rodgers', 'Masaba', '{\"year\":1995,\"month\":1,\"day\":6}', 'Male', '0783311028', '0772882928', 'LBF Client', 'Prospect', '{\"year\":2022,\"month\":5,\"day\":14}', '64d24032-1845-460b-91ba-7d1884cd3d7b', '', '', '', '', '', 0, 0, 0, 0, NULL, NULL),
('c326d911-6007-42b6-8b47-29e72fd6dc72', 'lajul@gmail.com', 'Lajul', 'Mutabazi', '{\"year\":1992,\"month\":5,\"day\":6}', 'Male', '0772882926', '0783311028', 'CS Client', 'Lead', '{\"year\":2021,\"month\":1,\"day\":1}', '07e00e21-2d15-4db5-a062-3b521fb25613', 'Pending Tracking', '2000', 'Yes', '700000000', 'CM9702610DER1D', 1, 1, 1, 1, NULL, NULL),
('c3c037c3-e8ae-4809-93ad-db3b8b5f8a35', 'kamdis@gmail.com', 'Kamara', 'Dison', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', '0783311028', '0783311028', 'LBF Client', 'Prospect', '{\"year\":2022,\"month\":5,\"day\":14}', 'ab0a3f88-27c0-4c81-be0b-03a16d44cea5', '', '', '', '', '', 0, 0, 0, 0, NULL, NULL),
('d91dd8ee-8c84-48eb-b934-fc65a8fca490', 'yvonne@hotmail.com', 'Yvonne', 'Mariam', '{\"year\":2000,\"month\":1,\"day\":1}', 'Female', '0783311028', '0783311028', 'CS Client', 'Converted', '{\"year\":2022,\"month\":5,\"day\":18}', '07e00e21-2d15-4db5-a062-3b521fb25613', 'Pending Tracking', '87467692', 'No', '1000000', 'CM9702610DER1D', 1, 1, 1, 1, NULL, NULL),
('fd1994bf-5ef1-4d67-9ad2-169349c25421', 'umkarm@gmail.com', 'Uthman', 'Karim', '{\"year\":1996,\"month\":1,\"day\":27}', 'Male', '0783311028', '0772882928', 'CS Client', 'Converted', '{\"year\":2022,\"month\":5,\"day\":14}', '10331aaf-4894-4985-af05-89f41b5bf091', 'Pending Tracking', '2000', 'No', '1000000', 'CM9702610DER1Djvv', 1, 1, 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `firstname`, `surname`, `dob`, `gender`, `team`, `branch`, `zone`, `region`, `contact1`, `contact2`) VALUES
('07e00e21-2d15-4db5-a062-3b521fb25613', 'paula@gmail.com', '$2b$10$m.ajElshJF703c3IbdLYheo76rtqIyP6ES/TWLcWM415LXK03Qb9K', 'CS Agent', 'Paula', 'Namataa', '{\"year\":2008,\"month\":10,\"day\":21}', 'Female', 'C', 'Mukono', 'South', 'Central', '0783311028', '0772882926'),
('10331aaf-4894-4985-af05-89f41b5bf091', 'abdul@gmail.com', '$2b$10$/ZWVethAwx91c.Auvm4pbuFllIqN.LkmB0PlmV4ew.74y8V8gEW2K', 'CS Agent', 'Abdull', 'Salaam', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', 'A', 'Mukono', 'South', 'Central', '0783311028', '0783311028'),
('116d2406-665d-4758-a6df-f2fb6d63d62d', 'tulz@gmail.com', '$2b$10$sMu64eashNP6yYusfvYwO.RADa0cQSJKyOhxJspllbxusIvKi6Voa', 'LBF Branch Manager', 'Tulz', 'Mandala', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', 'A', 'City', 'South', 'Central', '0783311028', '0783311028'),
('12534163-2242-4cd9-91e3-5c2a2e57f754', 'mrasg@gmail.com', '$2b$10$BgjfglYxUWm4lLz24coJDeM02.XYk/eZ6f0Gb9WuiD..8b0jVzd6i', 'LBF Leader', 'Marcus', 'Rashford', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', 'A', 'City', 'South', 'Central', '0783311028', '0783311028'),
('15c860b2-9c30-4af7-a9d8-47e8a664dce1', 'janice@gmail.com', '$2b$10$bVCHEhISMnMlEJ6I4VOhj.DZ1UUJxxF6Co9ugytUP0pS3Y7fRriP6', 'LBF Agent', 'Janice', 'Natume', '{\"year\":2000,\"month\":1,\"day\":1}', 'Female', 'A', 'Mukono', 'South', 'Central', '0783311028', '0783311028'),
('1c9a7f91-e3a4-44aa-8976-861253423721', 'regina@gmail.com', '$2b$10$H3kvE6RnJyBDyYps.Pp4hu9EuOwhUh/dG9RwqQseuHwdwrVu.uU4q', 'CS Agent', 'Regina', 'Namatovu', '{\"year\":2000,\"month\":1,\"day\":1}', 'Female', 'A', 'Masaka', 'South', 'Great Masaka', '0783311028', '0772882926'),
('1d73ea1f-4d89-4b6f-8321-9890744cd79d', 'kanye@gmail.com', '$2b$10$N8psOT5stb177CHSmXCC8.EtA5pNzIrq9YDtsy3S1ECB3FvXxMgQe', 'CS Agent', 'Kanye', 'Mukasa', '{\"year\":1993,\"month\":6,\"day\":18}', 'Female', 'A', 'Mukono', 'South', 'Central', '0783311028', '0783311028'),
('1df3df22-c6ff-4b9e-b435-ac9b31abf430', 'john@gmail.com', '$2b$10$6UyGkJV5H4PWoG0piTjKpel1AIxIDc7PRv7xLr.URhg4h/czIZCZq', 'CS Agent', 'John', 'Mwonge', '{\"year\":1997,\"month\":1,\"day\":2}', 'Male', 'A', 'Ntungamo', 'South', 'Kigezi', '0783311028', '0772882926'),
('22185055-06c8-4918-852c-bfe840fd5c4a', 'yoli@gmail.com', '$2b$10$3Mc2CiVzCJIloRNv1YahDexbM1CW/5Z25J5gZxkE.VdzlUF1a6QMi', 'LBF Agent', 'Yoli', 'Kamara', '{\"year\":2000,\"month\":1,\"day\":1}', 'Female', 'A', 'City', 'South', 'Central', '0783311028', '0783311028'),
('2ed134b1-a19c-4d8b-a66b-e4c21e1ebf48', 'reidjama@gmail.com', '$2b$10$1uv7YyJyAPNRc0QNrGbOg.awgz5WWUzQEV4XviT9l00fsAxBzueo.', 'LBF Agent', 'Reid', 'Jamal', '{\"year\":1991,\"month\":1,\"day\":10}', 'Male', 'A', 'Mityana', 'South', 'Central', '0783311028', '0783311028'),
('365ed082-aa77-4aab-8454-4f0daf454d36', 'emma@gmail.com', '$2b$10$q539O60ToEaCPV.pstDnh..EvONQYHPaOAmkl4LXVr9Qx2N2o1J0K', 'CS Branch Manager', 'Emma', 'Katurebbe', '{\"year\":2000,\"month\":1,\"day\":1}', 'Female', 'A', 'Mityana', 'South', 'Central', '0783311028', '0772882926'),
('51b238b3-41c2-43ab-b135-6c886accc65d', 'henry@gmail.com', '$2b$10$Yv7f.Hc3qeT0.fIDjU17WeCUNAMsrGNuB7Rxnsp0T5cIpIdyCI6G2', 'CS Agent', 'Henry', 'Mugisha', '', 'Male', 'B', '', '', '', '0783311028', '0772882926'),
('5808867a-c8a7-4f4e-a808-fcc37162dea5', 'kbenz@gmail.com', '$2b$10$alckGu10tCvWo4.q9SmfoeUNuMzY/81xNpytI0YG.drXRyR0fyaWC', 'LBF Agent', 'Karim', 'Benzema', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', 'A', 'City', 'South', 'Central', '0783311028', '0783311028'),
('64d24032-1845-460b-91ba-7d1884cd3d7b', 'bsharp@gmail.com', '$2b$10$iR7NnirjdhBLaYuEjNxbP.z.SnXXvbBC00PFSyW7RMHk/PhnzSJhq', 'LBF Leader', 'Brown', 'Shapiri', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', 'A', 'Mbale', 'South', 'Eastern', '0783311028', '0783311028'),
('67d7fba9-34a8-4348-8cc1-ca4b6cd226d9', 'james@gmail.com', '$2b$10$4QgEr9T6euJU8LhnqyuGnO7nb4PVjB3suT/XU9i/DXwsU8Nee6jdC', 'LBF Agent', 'James', 'Mugisha', '', 'Male', 'A', '', '', '', '0783311028', '0772882926'),
('6d702adb-5903-4ef9-854c-6fcec389cecb', 'tim@gmail.com', '$2b$10$UQayQaK6VzLMxUWfsqzMA.BDLEfTv/I0kM9EGcCn2TfObk6Rwoq6a', 'LBF Agent', 'Tim', 'Mugisha', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', 'B', 'Mukono', 'South', 'Central', '0783311028', '0772882926'),
('7ab96d23-69b2-4c01-892b-1d38d6e8f08e', 'ivy@gmail.com', '$2b$10$YOMOKjX7zfVP0.u8XG8V..q3i89y6VYo7dQqfzujK4lnYmTXiQZCe', 'CS Leader', 'Mungati', 'Ivy', '{\"year\":2000,\"month\":1,\"day\":1}', 'Female', 'A', 'Mukono', 'South', 'Central', '0783311028', '0783311028'),
('7d12c76a-70b9-424f-a76b-64854df80bc8', 'ppmunga@gmail.com', '$2b$10$UTYaJ9KPAG7zkFmco.vFf.QYHSxrJX.bioKwSUXwnZXqkOEKbkzl.', 'Admin', 'Mungati', 'Peter', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', 'A', 'Mukono', 'South', 'Central', '0783311028', '0783311028'),
('7f4ea01c-ddbb-463b-b0c9-976d0f9d1f82', 'cami@gmail.com', '$2b$10$jGxyBxpHFirSE.iQdcdEbOmQ4V4Rwd4PXwDBUxe9.JO3tZDdnb31i', 'CS Branch Manager', 'Camil', 'Mukasa', '{\"year\":2000,\"month\":1,\"day\":1}', 'Female', 'A', 'Mukono', 'South', 'Central', '0783311028', '0783311028'),
('96887d0a-4437-4ce6-b850-ad78e699cc74', 'fatuma@gmail.com', '$2b$10$DxrD6aaaiLuhsX0GYEjTTul03sjwjFEK0TdN9oxJubkFYPsKyQ9lu', 'CS Agent', 'Fatuma', 'Nakanja', '{\"year\":2000,\"month\":1,\"day\":1}', 'Female', 'A', 'Mukono', 'South', 'Central', '0783311028', '0783311028'),
('ab0a3f88-27c0-4c81-be0b-03a16d44cea5', 'paulamunga@gmail.com', '$2b$10$rp3MQboT1Ljo2dxdtftg1OG3EWZZw2s7GJ.6YwKC5GL72m.vJLLRu', 'LBF Leader', 'Mungati', 'Paula', '{\"year\":2008,\"month\":11,\"day\":21}', 'Female', 'B', 'Mukono', 'South', 'Central', '0783311028', '0783311028'),
('b9afb5ba-2d22-46ca-8b99-ad173ecaa746', 'amanda@gmail.com', '$2b$10$ovi/wgpGjwKDOn5P3tCiBur3X2L3YxeLTXWR9zqf3LLsUr/.ZcBGK', 'LBF Agent', 'Amanda', 'Mugisha', '{\"year\":2000,\"month\":1,\"day\":1}', 'Female', 'B', 'Mukono', 'South', 'Central', '0783311028', '0772882926'),
('b9eb03ab-6d26-4a3e-b51d-59a1e0de1fbe', 'alumz@gmail.com', '$2b$10$7u9jIn1jCvCkbk63qDXf1ubTP4WhW0sdSGdLs1hxsm4YWyx.PKUwm', 'CS Agent', 'Alumz', 'Fred', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', 'A', 'Mukono', 'South', 'Central', '0783311028', '0783311028'),
('c06d9a8d-b865-4f1c-b4ad-7b27eb2e63a6', 'libo@gmail.com', '$2b$10$fhbv5GbIbXKrEDHb.0ds6.YmptWWExz7yuVRU0NBGu0x2l.1k/zV2', 'LBF Agent', 'Libo', 'Njomba', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', 'B', 'City', 'South', 'Central', '0783311028', '0783311028'),
('d35e8201-51a2-470f-98e3-57db8ea730a6', 'mpho@gmail.com', '$2b$10$vBt4Pc4lVRqAoMfufeSVV.Lsa9kxtQnA1SFKY9R2v648wP2Lzq3Uu', 'LBF Leader', 'Mpho', 'Wama', '{\"year\":2000,\"month\":1,\"day\":1}', 'Female', 'B', 'City', 'South', 'Central', '0783311028', '0783311028'),
('e8229373-855c-4729-8db7-431eca8fe3af', 'mark@gmail.com', '$2b$10$Lf6da4wTRbenrgty/Vk5xuWcLgwLnyV4RouD5v17IdrMZKHytoxFS', 'CS Leader', 'Mark', 'Mugisha', '{\"year\":2000,\"month\":1,\"day\":1}', 'Female', 'B', 'Mukono', 'South', 'Central', '0783311028', '0772882926'),
('e95aa6f7-2c74-460b-b5fe-30a3b9120933', 'rob@gmail.com', '$2b$10$/Yh5Mpxjsh97HjrqlUb0EeqU3xRjWSHx/1nBShV43bk4NcFCKoHr2', 'CS Agent', 'Robby', 'Mukasa', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', 'A', 'Mukono', 'South', 'Central', '0783311028', '0783311028'),
('ec07741e-47bd-4ea9-8b68-bd9bb60f213f', 'kamanda@gmail.com', '$2b$10$p6QfA0FzBDuO5t4Jy6.AqeElLsylyNtuwr/OXJXx6IQcdqfZ0hpLm', 'CS Region Manager', 'Alex', 'Kamanda', '{\"year\":2000,\"month\":1,\"day\":1}', 'Male', 'A', 'Mukono', 'South', 'Central', '0783311028', '0783411028');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ipps` (`ipps`),
  ADD UNIQUE KEY `mid` (`mid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
