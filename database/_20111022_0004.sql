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
-- Definition of table `blog`.`comment`
--

DROP TABLE IF EXISTS `blog`.`comment`;
CREATE TABLE  `blog`.`comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `entryid` bigint(20) NOT NULL,
  `author` varchar(250) NOT NULL,
  `createdon` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`.`comment`
--

/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
LOCK TABLES `comment` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;


--
-- Definition of table `blog`.`entry`
--

DROP TABLE IF EXISTS `blog`.`entry`;
CREATE TABLE  `blog`.`entry` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) DEFAULT NULL,
  `contents` text NOT NULL,
  `preview` text NOT NULL,
  `subtitle` varchar(250) NOT NULL,
  `createdon` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`.`entry`
--

/*!40000 ALTER TABLE `entry` DISABLE KEYS */;
LOCK TABLES `entry` WRITE;
INSERT INTO `blog`.`entry` VALUES  (1,'Title 1','Contents 1','Preview 1','Subtitle 1',1319229825),
 (2,'Title 2','Contents 2','Preview 2','Subtitle 2',1319229825);
UNLOCK TABLES;
/*!40000 ALTER TABLE `entry` ENABLE KEYS */;


--
-- Definition of table `blog`.`static`
--

DROP TABLE IF EXISTS `blog`.`static`;
CREATE TABLE  `blog`.`static` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`.`static`
--

/*!40000 ALTER TABLE `static` DISABLE KEYS */;
LOCK TABLES `static` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `static` ENABLE KEYS */;


--
-- Definition of table `blog`.`user`
--

DROP TABLE IF EXISTS `blog`.`user`;
CREATE TABLE  `blog`.`user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `level` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`.`user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
LOCK TABLES `user` WRITE;
INSERT INTO `blog`.`user` VALUES  (1,0,'root','Xd1QdlvhuD0Fe2WD3CMlxgLWefQ='),
 (2,10,'kl1nt','87ALPWvB177aIIgLj6/HNgH1WKQ=');
UNLOCK TABLES;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
