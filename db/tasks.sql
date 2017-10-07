-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 07, 2017 at 12:40 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tasks`
--

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `sid` varchar(255) NOT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `task_end_date` date NOT NULL,
  `description` longtext NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `task_name`, `task_end_date`, `description`, `created_by`, `updatedAt`, `createdAt`) VALUES
(6, 'First Task', '2017-08-15', 'first task description goes here', 'anwaar', '2017-09-07 11:41:56', '2017-09-04 11:41:56'),
(8, 'Updated Task', '2017-09-09', 'updated task description goes here', 'anwaar Randhawa', '2017-09-04 13:10:12', '2017-09-04 13:10:12'),
(9, 'task from post request', '2017-09-09', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'anwaar', '2017-09-05 04:50:36', '2017-09-05 04:50:36'),
(10, 'tasking', '2017-09-09', 'description goes on here', 'anwaar', '2017-09-05 04:53:31', '2017-09-05 04:53:31'),
(11, 'task from post', '2017-09-10', 'value description', 'anwaar', '2017-09-05 05:16:23', '2017-09-05 05:16:23'),
(13, 'post request 2', '2017-09-11', 'post request description coming from here', 'anwaar', '2017-09-05 05:34:54', '2017-09-05 05:34:54'),
(14, 'Post Request 3', '2017-09-12', 'post request 3 description', 'anwaar', '2017-09-05 05:38:26', '2017-09-05 05:38:26'),
(15, 'new task', '2017-07-03', 'jhgjhgkjhgkjhgkjhg', 'anwaar', '2017-09-05 07:56:50', '2017-09-05 07:56:50'),
(16, 'task with date picker', '2017-09-19', 'description of task given by this', 'anwaar', '2017-09-05 10:04:16', '2017-09-05 10:04:16'),
(17, 'first task after time check', '2017-09-27', 'description of tasks', 'anwaar', '2017-09-05 10:07:54', '2017-09-05 10:07:54'),
(18, 'check 1', '2017-09-19', 'description', 'anwaar', '2017-09-05 10:08:32', '2017-09-05 10:08:32'),
(19, 'task with date picker', '2017-09-25', 'sxdfsd', 'anwaar', '2017-09-05 10:09:00', '2017-09-05 10:09:00'),
(22, 'task with date picker', '2017-09-19', 'asdfsdf', 'anwaar', '2017-09-05 10:13:18', '2017-09-05 10:13:18'),
(23, 'task with date picker', '2017-09-19', 'dfgdfg', 'anwaar', '2017-09-05 10:13:59', '2017-09-05 10:13:59'),
(24, 'check page reload', '2017-09-27', 'page reload description', 'anwaar', '2017-09-06 02:09:07', '2017-09-06 02:09:07'),
(25, 'check after 11 seconds', '2017-09-27', 'description', 'anwaar', '2017-09-06 02:10:13', '2017-09-06 02:10:13'),
(26, 'after 6 seconds', '2017-09-27', 'Description', 'anwaar', '2017-09-06 02:11:05', '2017-09-06 02:11:05'),
(36, 'testing of task work', '2017-09-07', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'anwaar', '2017-09-06 19:17:18', '2017-09-06 19:17:07'),
(45, 'Unit Test Task Updated', '2017-09-22', 'Task Test Description updated', 'anwaar', '2017-09-07 09:36:18', '2017-09-07 09:34:27'),
(49, 'Dynamic URl Test Updated', '2017-09-27', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'anwaar', '2017-09-07 10:28:38', '2017-09-07 10:28:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sid` (`sid`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `tasks` ADD FULLTEXT KEY `FullText` (`task_name`,`description`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1513;
--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
