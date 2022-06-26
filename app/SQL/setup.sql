CREATE DATABASE IF NOT EXISTS `naturopathie`;
use naturopathie;

DROP TABLE IF EXISTS `T_AGENDA`;CREATE TABLE `T_AGENDA` (
  `client_username` varchar(255) COLLATE utf8_unicode_ci ,
  `seance_id` int(11) ,
  PRIMARY KEY (`client_username`, `seance_id`),
  KEY `seance_id` (`seance_id`),
  CONSTRAINT `T_AGENDA_ibfk_3` FOREIGN KEY (`client_username`) REFERENCES `T_CLIENT` (`user_username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `T_AGENDA_ibfk_4` FOREIGN KEY (`seance_id`) REFERENCES `T_SEANCE` (`seance_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

DROP TABLE IF EXISTS `T_CLIENT`;CREATE TABLE `T_CLIENT` (
  `user_username` varchar(255) COLLATE utf8_unicode_ci ,
  `user_password` varchar(255) COLLATE utf8_unicode_ci ,
  `user_admin` tinyint(1)  DEFAULT '0',
  `client_nom` varchar(50) COLLATE utf8_unicode_ci ,
  `client_prenom` varchar(50) COLLATE utf8_unicode_ci ,
  `client_email` varchar(320) COLLATE utf8_unicode_ci ,
  `client_adresse` varchar(255) COLLATE utf8_unicode_ci ,
  `client_telephone` varchar(10) COLLATE utf8_unicode_ci ,
  `client_sexe` tinyint(1)  DEFAULT '0',
  `client_profession` varchar(255) COLLATE utf8_unicode_ci ,
  `naissance_date` date ,
  `naissance_pays` varchar(255) COLLATE utf8_unicode_ci ,
  `famille_situation` varchar(255) COLLATE utf8_unicode_ci ,
  `urgence_nom` varchar(255) COLLATE utf8_unicode_ci ,
  `urgence_tel` varchar(10) COLLATE utf8_unicode_ci ,
  `medecin_nom` varchar(255) COLLATE utf8_unicode_ci ,
  `medecin_tel` varchar(10) COLLATE utf8_unicode_ci ,
  `medecin_adresse` varchar(255) COLLATE utf8_unicode_ci ,
  PRIMARY KEY (`user_username`),
  UNIQUE KEY `client_username` (`user_username`),
  KEY `famille_situation` (`famille_situation`),
  CONSTRAINT `T_CLIENT_ibfk_1` FOREIGN KEY (`famille_situation`) REFERENCES `T_SITUATION` (`label`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

DROP TABLE IF EXISTS `T_NOTES`;CREATE TABLE `T_NOTES` (
  `seance_id` int(11) ,
  `json` json ,
  UNIQUE KEY `seance_id` (`seance_id`),
  CONSTRAINT `T_NOTES_ibfk_3` FOREIGN KEY (`seance_id`) REFERENCES `T_SEANCE` (`seance_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

DROP TABLE IF EXISTS `T_SEANCE`;CREATE TABLE `T_SEANCE` (
  `seance_id` int(11)  AUTO_INCREMENT,
  `seance_type` varchar(255) COLLATE utf8_unicode_ci  COMMENT 'Type de la séance',
  `seance_debut` datetime  COMMENT 'Jour et heure du rendez-vous',
  `seance_duree` int(11)  COMMENT 'Durée en minutes',
  `seance_prix` int(11)  COMMENT 'Prix en €',
  PRIMARY KEY (`seance_id`),
  KEY `seance_type` (`seance_type`),
  CONSTRAINT `T_SEANCE_ibfk_1` FOREIGN KEY (`seance_type`) REFERENCES `T_SEANCE_TYPE` (`label`),
  CONSTRAINT `T_SEANCE_ibfk_2` FOREIGN KEY (`seance_type`) REFERENCES `T_SEANCE_TYPE` (`label`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 27 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

DROP TABLE IF EXISTS `T_SEANCE_TYPE`;CREATE TABLE `T_SEANCE_TYPE` (
  `label` varchar(255) COLLATE utf8_unicode_ci ,
  `duree` int(11) ,
  `prix` int(11) ,
  `prix_etu_se` int(11) ,
  PRIMARY KEY (`label`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

INSERT INTO `T_SEANCE_TYPE` VALUES 
('Conseil en fleurs de Bach',50,50,0),
('Naturopathie 1er',90,80,60),
('Naturopathie Suivis',60,60,40),
('Massage des pieds au bol Kansu',60,50,30),
('Réflexologie Plantaire',90,60,40);

DROP TABLE IF EXISTS `T_SITUATION`;CREATE TABLE `T_SITUATION` (
  `label` varchar(255) COLLATE utf8_unicode_ci ,
  PRIMARY KEY (`label`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

INSERT INTO `T_SITUATION` VALUES ('Célibataire'),('Divorcé'),('Marié'),('Pacsé'),('Spéparé'),('Veuf');

GRANT ALL ON naturopathie.* TO 'julie' @'localhost' IDENTIFIED BY 'mdpJR03JU!' WITH GRANT OPTION;
FLUSH PRIVILEGES;