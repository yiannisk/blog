-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.1.54-1ubuntu4


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema blog
--

CREATE DATABASE IF NOT EXISTS blog;
USE blog;

--
-- Definition of table `blog`.`Comment`
--

DROP TABLE IF EXISTS `blog`.`Comment`;
CREATE TABLE  `blog`.`Comment` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `EntryId` bigint(20) NOT NULL,
  `Author` varchar(250) NOT NULL,
  `CreatedOn` bigint(20) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`.`Comment`
--

/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
LOCK TABLES `Comment` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;


--
-- Definition of table `blog`.`Entry`
--

DROP TABLE IF EXISTS `blog`.`Entry`;
CREATE TABLE  `blog`.`Entry` (
  `Id` bigint(20) NOT NULL,
  `Title` varchar(250) DEFAULT NULL,
  `Contents` text NOT NULL,
  `Preview` text NOT NULL,
  `Subtitle` varchar(250) NOT NULL,
  `Createdon` bigint(20) NOT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`.`Entry`
--

/*!40000 ALTER TABLE `Entry` DISABLE KEYS */;
LOCK TABLES `Entry` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `Entry` ENABLE KEYS */;


--
-- Definition of table `blog`.`Static`
--

DROP TABLE IF EXISTS `blog`.`Static`;
CREATE TABLE  `blog`.`Static` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(250) NOT NULL,
  `Value` text NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`.`Static`
--

/*!40000 ALTER TABLE `Static` DISABLE KEYS */;
LOCK TABLES `Static` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `Static` ENABLE KEYS */;


--
-- Definition of table `blog`.`User`
--

DROP TABLE IF EXISTS `blog`.`User`;
CREATE TABLE  `blog`.`User` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Level` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`.`User`
--

/*!40000 ALTER TABLE `User` DISABLE KEYS */;
LOCK TABLES `User` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `User` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
