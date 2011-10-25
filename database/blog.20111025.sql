-- phpMyAdmin SQL Dump
-- version 3.4.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 26, 2011 at 12:42 AM
-- Server version: 5.1.54
-- PHP Version: 5.3.5-1ubuntu7.3

SET AUTOCOMMIT=0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--
-- Creation: Oct 25, 2011 at 09:40 PM
-- Last update: Oct 25, 2011 at 09:40 PM
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `entryid` bigint(20) NOT NULL,
  `author` varchar(250) NOT NULL,
  `createdon` bigint(20) NOT NULL,
  `contents` text NOT NULL,
  `published` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`)
) TYPE=MyISAM  AUTO_INCREMENT=5 ;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `entryid`, `author`, `createdon`, `contents`, `published`) VALUES
(1, 1, 'ikaradimas@hotmail.com', 1319574906, 'test tst test', '\0'),
(4, 1, 'ikaradimas@hotmail.com', 1319575159, 'test tst test', '\0');

-- --------------------------------------------------------

--
-- Table structure for table `entry`
--
-- Creation: Oct 25, 2011 at 09:41 PM
-- Last update: Oct 25, 2011 at 09:41 PM
--

DROP TABLE IF EXISTS `entry`;
CREATE TABLE IF NOT EXISTS `entry` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) DEFAULT NULL,
  `contents` text NOT NULL,
  `preview` text NOT NULL,
  `subtitle` varchar(250) NOT NULL,
  `createdon` bigint(20) NOT NULL,
  `published` bit(1) NOT NULL DEFAULT b'1',
  `archived` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`)
) TYPE=MyISAM  AUTO_INCREMENT=3 ;

--
-- Dumping data for table `entry`
--

INSERT INTO `entry` (`id`, `title`, `contents`, `preview`, `subtitle`, `createdon`, `published`, `archived`) VALUES
(1, 'Title 1', 'Contents 1', 'Preview 1', 'Subtitle 1', 1319229825, '', '\0'),
(2, 'Title 2', 'Contents 2', 'Preview 2', 'Subtitle 2', 1319229825, '', '\0');

-- --------------------------------------------------------

--
-- Table structure for table `level`
--
-- Creation: Oct 25, 2011 at 05:46 PM
-- Last update: Oct 25, 2011 at 05:46 PM
--

DROP TABLE IF EXISTS `level`;
CREATE TABLE IF NOT EXISTS `level` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Action` varchar(250) NOT NULL,
  `Level` int(11) NOT NULL DEFAULT '100',
  PRIMARY KEY (`Id`)
) TYPE=MyISAM  AUTO_INCREMENT=2 ;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`Id`, `Action`, `Level`) VALUES
(1, 'comments/create', 50);

-- --------------------------------------------------------

--
-- Table structure for table `static`
--
-- Creation: Oct 21, 2011 at 08:32 PM
-- Last update: Oct 25, 2011 at 06:18 PM
--

DROP TABLE IF EXISTS `static`;
CREATE TABLE IF NOT EXISTS `static` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`id`)
) TYPE=MyISAM  AUTO_INCREMENT=3 ;

--
-- Dumping data for table `static`
--

INSERT INTO `static` (`id`, `name`, `value`) VALUES
(1, 'latestCommentTime', '0');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--
-- Creation: Oct 21, 2011 at 08:31 PM
-- Last update: Oct 21, 2011 at 08:38 PM
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `level` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) TYPE=MyISAM  AUTO_INCREMENT=3 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `level`, `username`, `password`) VALUES
(1, 0, 'root', 'Xd1QdlvhuD0Fe2WD3CMlxgLWefQ='),
(2, 10, 'kl1nt', '87ALPWvB177aIIgLj6/HNgH1WKQ=');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
