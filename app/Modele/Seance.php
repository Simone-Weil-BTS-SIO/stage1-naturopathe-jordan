<?php

require_once SITE_ROOT.'Framework/Modele.php';

class Seance extends Modele {

    public static $limit = 10;

    public function getLastID() {
        return self::getBdd()->lastInsertId();
    }

    public function getAmount() {
        $sql = "SELECT COUNT(*) as count_seance FROM T_AGENDA";
        $requete = $this->executerRequete($sql);
        return $requete->fetch(PDO::FETCH_ASSOC)["count_seance"];
    }

    public function getSeance($id) {
        $sql = "SELECT * FROM T_SEANCE WHERE seance_id = {$id}";
        return $this->executerRequete($sql)->fetch(PDO::FETCH_ASSOC);
    }

    public function getNotes($id) {
        $sql = "SELECT json FROM T_NOTES WHERE seance_id = ?";
        $requete = $this->executerRequete($sql,array($id));
        if ($requete->rowCount() == 1) {
            $resultat = $requete->fetch();
            return $resultat['json'];
        }
        return "[]";
    }

    public function getNextSeances($page=1) {
        if ($page < 1) $page = 1;
        $page -= 1;
        $limit = self::$limit;
        $offset = (self::$limit)*$page;
        $sql = "SELECT user_username as username, client_nom as nom, client_prenom as prenom, S.seance_id as id, seance_type as type, seance_debut as debut, seance_duree as duree, seance_prix as prix 
            FROM T_SEANCE S, T_CLIENT C, T_AGENDA A 
            WHERE S.seance_id = A.seance_id AND A.client_username = C.user_username AND seance_debut >= NOW() 
            ORDER BY seance_debut ASC"; // LIMIT {$limit} OFFSET {$offset}
        $requete = $this->executerRequete($sql);
        return $requete->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getSeances($page=1) {
        if ($page < 1) $page = 1;
        $page -= 1;
        $limit = self::$limit;
        $offset = (self::$limit)*$page;
        $sql = "SELECT user_username as username, client_nom as nom, client_prenom as prenom, S.seance_id as id, seance_type as type, seance_debut as debut, seance_duree as duree, seance_prix as prix 
            FROM T_SEANCE S, T_CLIENT C, T_AGENDA A 
            WHERE S.seance_id = A.seance_id AND A.client_username = C.user_username
            ORDER BY seance_debut DESC"; // LIMIT {$limit} OFFSET {$offset}
        $requete = $this->executerRequete($sql);
        return $requete->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getSeancesASC($page=1) {
        if ($page < 1) $page = 1;
        $page -= 1;
        $limit = self::$limit;
        $offset = (self::$limit)*$page;
        $sql = "SELECT user_username as username, client_nom as nom, client_prenom as prenom, S.seance_id as id, seance_type as type, seance_debut as debut, seance_duree as duree, seance_prix as prix 
            FROM T_SEANCE S, T_CLIENT C, T_AGENDA A 
            WHERE S.seance_id = A.seance_id AND A.client_username = C.user_username
            ORDER BY seance_debut ASC"; //LIMIT {$limit} OFFSET {$offset}
        $requete = $this->executerRequete($sql);
        return $requete->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getSeancesOfDay($date) {
        $sql = "SELECT user_username as username, client_nom as nom, client_prenom as prenom, S.seance_id as id, seance_type as type, seance_debut as debut, seance_duree as duree, seance_prix as prix 
            FROM T_SEANCE S, T_CLIENT C, T_AGENDA A WHERE S.seance_id = A.seance_id
            AND A.client_username = C.user_username AND DATE(S.seance_debut) = ? ORDER BY seance_debut ASC";
        $requete = $this->executerRequete($sql,array($date));
        return $requete->fetchAll(PDO::FETCH_ASSOC);
    }

    public function setNotes($id,$notes) {
        $sql = "INSERT INTO T_NOTES (seance_id, json) VALUES (?, ?) ON DUPLICATE KEY UPDATE json = ?";
        $requete = $this->executerRequete($sql,array($id, $notes, $notes));
    }
    
    public function getSeancesTypes() {
        $sql = "SELECT label, duree, prix, prix_etu_se FROM T_SEANCE_TYPE";
        $requete = $this->executerRequete($sql);
        return $requete->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deleteSeance($id) {
        $sql = "DELETE FROM T_SEANCE WHERE seance_id = ?";
        $requete = $this->executerRequete($sql,array($id));
    }

    public function newSeance($user,$type,$date,$duree,$prix) {
        $sql = "INSERT INTO T_SEANCE (seance_type, seance_debut, seance_duree, seance_prix) VALUES (?, ?, ?, ?)";
        $this->executerRequete($sql, array($type, date('Y/m/d G:i:s', strtotime($date)), $duree, $prix));
        $lastId = $this->getLastID();
        $this->addSeanceClient($user, $lastId);
        $sql = "INSERT INTO T_NOTES (seance_id, json) VALUES (? , '[]')";
        $this->executerRequete($sql, array($lastId));
    }

    public function addSeanceClient($idClient, $idSeance) {
        $sql = "INSERT INTO T_AGENDA (client_username, seance_id) VALUES (?, ?)";
        $this->executerRequete($sql, array($idClient, $idSeance));
    }



}