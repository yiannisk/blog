-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Σύστημα: localhost
-- Χρόνος δημιουργίας: 25 Οκτωβρίου 2011 στις 15:06:09
-- Έκδοση Διακομιστή: 5.1.53
-- Έκδοση PHP: 5.3.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Βάση: `blog`
--
CREATE DATABASE IF NOT EXISTS blog DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `blog`;

-- --------------------------------------------------------

--
-- Δομή Πίνακα για τον Πίνακα `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `entryid` bigint(20) NOT NULL,
  `author` varchar(250) NOT NULL,
  `createdon` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Άδειασμα δεδομένων του πίνακα `comment`
--


-- --------------------------------------------------------

--
-- Δομή Πίνακα για τον Πίνακα `entry`
--

CREATE TABLE IF NOT EXISTS `entry` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) DEFAULT NULL,
  `contents` text NOT NULL,
  `preview` text NOT NULL,
  `subtitle` varchar(250) NOT NULL,
  `createdon` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Άδειασμα δεδομένων του πίνακα `entry`
--

INSERT INTO `entry` (`id`, `title`, `contents`, `preview`, `subtitle`, `createdon`) VALUES
(1, 'Title 1', 'Contents 1', 'Preview 1', 'Subtitle 1', 1319229825),
(2, 'Title 2', 'Contents 2', 'Preview 2', 'Subtitle 2', 1319229825);

-- --------------------------------------------------------

--
-- Δομή Πίνακα για τον Πίνακα `level`
--

CREATE TABLE IF NOT EXISTS `level` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Action` varchar(250) NOT NULL,
  `Level` int(11) NOT NULL DEFAULT '100',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Άδειασμα δεδομένων του πίνακα `level`
--

INSERT INTO `level` (`Id`, `Action`, `Level`) VALUES
(1, 'comments/create', 50);

-- --------------------------------------------------------

--
-- Δομή Πίνακα για τον Πίνακα `static`
--

CREATE TABLE IF NOT EXISTS `static` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Άδειασμα δεδομένων του πίνακα `static`
--


-- --------------------------------------------------------

--
-- Δομή Πίνακα για τον Πίνακα `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `level` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Άδειασμα δεδομένων του πίνακα `user`
--

INSERT INTO `user` (`id`, `level`, `username`, `password`) VALUES
(1, 0, 'root', 'Xd1QdlvhuD0Fe2WD3CMlxgLWefQ='),
(2, 10, 'kl1nt', '87ALPWvB177aIIgLj6/HNgH1WKQ=');
