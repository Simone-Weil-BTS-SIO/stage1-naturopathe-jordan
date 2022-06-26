-- MySQL dump 10.13  Distrib 5.7.38, for Linux (x86_64)
--
-- Host: localhost    Database: naturov2
-- ------------------------------------------------------
-- Server version	5.7.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `T_AGENDA`
--

DROP TABLE IF EXISTS `T_AGENDA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_AGENDA` (
  `client_username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `seance_id` int(11) NOT NULL,
  PRIMARY KEY (`client_username`,`seance_id`),
  KEY `seance_id` (`seance_id`),
  CONSTRAINT `T_AGENDA_ibfk_3` FOREIGN KEY (`client_username`) REFERENCES `T_CLIENT` (`user_username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `T_AGENDA_ibfk_4` FOREIGN KEY (`seance_id`) REFERENCES `T_SEANCE` (`seance_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_AGENDA`
--

LOCK TABLES `T_AGENDA` WRITE;
/*!40000 ALTER TABLE `T_AGENDA` DISABLE KEYS */;
INSERT INTO `T_AGENDA` VALUES ('florianCoulon',27);
/*!40000 ALTER TABLE `T_AGENDA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_CLIENT`
--

DROP TABLE IF EXISTS `T_CLIENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_CLIENT` (
  `user_username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_admin` tinyint(1) NOT NULL DEFAULT '0',
  `client_nom` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `client_prenom` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `client_email` varchar(320) COLLATE utf8_unicode_ci NOT NULL,
  `client_adresse` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `client_telephone` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `client_sexe` tinyint(1) NOT NULL DEFAULT '0',
  `client_profession` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `naissance_date` date NOT NULL,
  `naissance_pays` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `famille_situation` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `urgence_nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `urgence_tel` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `medecin_nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `medecin_tel` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `medecin_adresse` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`user_username`),
  UNIQUE KEY `client_username` (`user_username`),
  KEY `famille_situation` (`famille_situation`),
  CONSTRAINT `T_CLIENT_ibfk_1` FOREIGN KEY (`famille_situation`) REFERENCES `T_SITUATION` (`label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_CLIENT`
--

LOCK TABLES `T_CLIENT` WRITE;
/*!40000 ALTER TABLE `T_CLIENT` DISABLE KEYS */;
INSERT INTO `T_CLIENT` VALUES ('florianCoulon','$2y$10$T33GkQF/2G5z.j9QskCg.uQr/6iRG9jBE30PEOIRB8.IHKflDqIZK',0,'Coulon','Florian','','','',0,'','2022-06-26','','Célibataire','','','','','');
/*!40000 ALTER TABLE `T_CLIENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_NOTES`
--

DROP TABLE IF EXISTS `T_NOTES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_NOTES` (
  `seance_id` int(11) NOT NULL,
  `json` json NOT NULL,
  UNIQUE KEY `seance_id` (`seance_id`),
  CONSTRAINT `T_NOTES_ibfk_3` FOREIGN KEY (`seance_id`) REFERENCES `T_SEANCE` (`seance_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_NOTES`
--

LOCK TABLES `T_NOTES` WRITE;
/*!40000 ALTER TABLE `T_NOTES` DISABLE KEYS */;
INSERT INTO `T_NOTES` VALUES (25,'[]'),(26,'[]'),(27,'[{\"label\": \"Antécédents familiaux\", \"notes\": [{\"color\": \"#ff8040\", \"notes\": [{\"color\": \"#ff8040\", \"notes\": [], \"content\": \"Parking Son\", \"multiline\": true}], \"content\": \"GP\", \"multiline\": false}]}, {\"label\": \"Antécédents médicaux\", \"notes\": []}, {\"label\": \"Médication/compléments alimentaires\", \"notes\": []}, {\"label\": \"Système ORL\", \"notes\": []}, {\"label\": \"Système gynécologique\", \"notes\": []}, {\"label\": \"Système urinaire\", \"notes\": []}, {\"label\": \"Système nerveux\", \"notes\": []}, {\"label\": \"Système endocrinien\", \"notes\": []}, {\"label\": \"Système cardio-vasculaire\", \"notes\": []}, {\"label\": \"Peau\", \"notes\": []}, {\"label\": \"Système locomoteur\", \"notes\": []}, {\"label\": \"Système digestif\", \"notes\": []}, {\"label\": \"Énergie\", \"notes\": []}, {\"label\": \"Sommeil\", \"notes\": []}, {\"label\": \"Activité physique\", \"notes\": []}, {\"label\": \"Psycho - émotionnel\", \"notes\": []}, {\"label\": \"Analyses / Prise de sang\", \"notes\": []}]');
/*!40000 ALTER TABLE `T_NOTES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_SEANCE`
--

DROP TABLE IF EXISTS `T_SEANCE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_SEANCE` (
  `seance_id` int(11) NOT NULL AUTO_INCREMENT,
  `seance_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Type de la séance',
  `seance_debut` datetime NOT NULL COMMENT 'Jour et heure du rendez-vous',
  `seance_duree` int(11) NOT NULL COMMENT 'Durée en minutes',
  `seance_prix` int(11) NOT NULL COMMENT 'Prix en €',
  PRIMARY KEY (`seance_id`),
  KEY `seance_type` (`seance_type`),
  CONSTRAINT `T_SEANCE_ibfk_1` FOREIGN KEY (`seance_type`) REFERENCES `T_SEANCE_TYPE` (`label`),
  CONSTRAINT `T_SEANCE_ibfk_2` FOREIGN KEY (`seance_type`) REFERENCES `T_SEANCE_TYPE` (`label`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_SEANCE`
--

LOCK TABLES `T_SEANCE` WRITE;
/*!40000 ALTER TABLE `T_SEANCE` DISABLE KEYS */;
INSERT INTO `T_SEANCE` VALUES (3,'Naturopathie 1er','1970-01-01 01:00:00',90,80),(8,'Naturopathie Suivis','2022-06-26 08:53:00',60,60),(16,'Naturopathie 1er','2022-06-26 21:01:00',90,80),(17,'Réflexologie Plantaire','2022-06-26 21:01:00',90,60),(25,'Naturopathie Suivis','2022-06-26 22:05:00',60,60),(26,'Naturopathie 1er','2022-06-27 22:05:00',90,80),(27,'Naturopathie 1er','2022-06-26 23:22:00',90,60);
/*!40000 ALTER TABLE `T_SEANCE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_SEANCE_TYPE`
--

DROP TABLE IF EXISTS `T_SEANCE_TYPE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_SEANCE_TYPE` (
  `label` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `duree` int(11) NOT NULL,
  `prix` int(11) NOT NULL,
  `prix_etu_se` int(11) NOT NULL,
  PRIMARY KEY (`label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_SEANCE_TYPE`
--

LOCK TABLES `T_SEANCE_TYPE` WRITE;
/*!40000 ALTER TABLE `T_SEANCE_TYPE` DISABLE KEYS */;
INSERT INTO `T_SEANCE_TYPE` VALUES ('Conseil en fleurs de Bach',50,50,0),('Naturopathie 1er',90,80,60),('Naturopathie Suivis',60,60,40),('Réflexologie Plantaire',90,60,40);
/*!40000 ALTER TABLE `T_SEANCE_TYPE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_SITUATION`
--

DROP TABLE IF EXISTS `T_SITUATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_SITUATION` (
  `label` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_SITUATION`
--

LOCK TABLES `T_SITUATION` WRITE;
/*!40000 ALTER TABLE `T_SITUATION` DISABLE KEYS */;
INSERT INTO `T_SITUATION` VALUES ('Célibataire'),('Divorcé'),('Marié'),('Pacsé'),('Spéparé'),('Veuf');
/*!40000 ALTER TABLE `T_SITUATION` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-27  0:02:06
