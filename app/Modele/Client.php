<?php

require_once SITE_ROOT.'Framework/Modele.php';
require_once SITE_ROOT.'Framework/Helper.php';

class Client extends Modele {

    public static $limit = 10;

    public function getAmount() {
        $sql = "SELECT COUNT(*) as count_client FROM T_CLIENT";
        $requete = $this->executerRequete($sql);
        return $requete->fetch(PDO::FETCH_ASSOC)["count_client"];
    }



    public function getSituationFamille() {
        $sql = "SELECT label FROM T_SITUATION";
        $requete = $this->executerRequete($sql);
        return $requete->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getClients($page=1) {
        if ($page < 1) $page = 1;
        $page -= 1;
        $limit = self::$limit;
        $offset = (self::$limit)*$page;
        $sql = "SELECT user_username as username, client_nom as nom, client_prenom as prenom, client_sexe as sexe, client_telephone as telephone, client_email as email
            FROM T_CLIENT C 
            ORDER BY client_nom ASC, client_prenom ASC LIMIT {$limit} OFFSET {$offset}";
        $requete = $this->executerRequete($sql);
        return $requete->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getInfos($login) {
        $sql = "SELECT *, NULL AS user_password FROM T_CLIENT WHERE user_username = ?";
        $requete = $this->executerRequete($sql, array($login));
        if ($requete->rowCount() == 0) throw new Exception("Utilisateur inconnu");
        $utilisateur = $requete->fetch(PDO::FETCH_ASSOC);
        return $utilisateur;
    }

    public function editClient($data) {
        try {
            if (!isset($data["user_username"])) return false;
            $username = $data["user_username"];
            $keys = array_map(function ($k, $v) {
                return $k ." = ?";
            }, array_keys($data), array_values($data));
            $keys = implode(", ", $keys);
            $values = array_map(function($val){ return $val; },array_values($data));
            $sql = "UPDATE T_CLIENT SET ".$keys." WHERE user_username = '".$username."';";
            $requete = $this->executerRequete($sql, $values);
            return true;
        } catch(PDOException $e) {
            return false;
        }
    }

    public function getSeances($username) {
        $sql = "SELECT S.seance_id as id, seance_type as type, seance_debut as debut, seance_duree as duree, seance_prix as prix from T_SEANCE S, T_CLIENT C, T_AGENDA A WHERE C.user_username = ? AND A.client_username = C.user_username AND S.seance_id = A.seance_id ORDER BY S.seance_debut DESC";
        $requete = $this->executerRequete($sql, array($username));
        return $requete->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getSeanceForDay($username, $day) {
        $sql = "SELECT user_username as username, client_nom as nom, client_prenom as prenom, S.seance_id as id, seance_type as type, seance_debut as debut, seance_duree as duree, seance_prix as prix 
        FROM T_SEANCE S, T_CLIENT C, T_AGENDA A WHERE S.seance_id = A.seance_id AND A.client_username = ? 
        AND A.client_username = C.user_username AND DATE(S.seance_debut) = ? ORDER BY seance_debut ASC";
        $requete = $this->executerRequete($sql,array($username, $day));
        return $requete->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createClient($params) {
        $nom = $params["client_nom"]; $prenom = $params["client_prenom"];
        $username = strtolower($prenom).ucfirst($nom);
        if ($this->utilisateurExiste($username)) $username = $username.Helper::randomId();
        $password = Helper::password();
        $mail = $params["client_email"]; $telephone = $params["client_telephone"];
        $adresse = $params["client_adresse"]; $dateN = (isset($params["naissance_date"])) ? date_format(date_create($params["naissance_date"]),"Y-m-d") : null;
        $paysN = $params["naissance_pays"]; $profession = $params["client_profession"];
        $situationF = $params["famille_situation"]; $urgenceN = $params["urgence_nom"];
        $urgenceT = $params["urgence_tel"]; $medecinN = $params["medecin_nom"];
        $medecinT = $params["medecin_tel"]; $medecinA = $params["medecin_adresse"];
        $sexe = intval($params["client_sexe"]); $admin = (isset($params["user_admin"])) ? 1 : 0; 
        $sql = "INSERT INTO T_CLIENT (user_username, user_password, user_admin, client_nom, client_prenom, client_email,client_adresse,client_telephone,client_sexe,client_profession,naissance_date,naissance_pays,famille_situation,urgence_nom,urgence_tel,medecin_nom,medecin_tel,medecin_adresse) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
        $requete = $this->executerRequete($sql, array($username, password_hash($password, PASSWORD_DEFAULT), $admin, $nom, $prenom, $mail, $adresse, $telephone, $sexe, $profession, $dateN, $paysN, $situationF, $urgenceN, $urgenceT, $medecinN, $medecinT, $medecinA));
        if ($requete) return array("username" => $username, "password" => $password, "mail" => $mail, "telephone"=>$telephone, "nom" => $nom, "prenom" => $prenom);
    }

    public function utilisateurExiste($name) {
        $sql = "SELECT user_username FROM T_CLIENT WHERE user_username = ?";
        $requete = $this->executerRequete($sql, array($name));
        if ($requete->rowCount() == 0) return false;
        return true;    
    }

    public function deleteClient($id) {
        $sql = "DELETE FROM T_CLIENT WHERE user_username = ?";
        $requete = $this->executerRequete($sql,array($id));
    }

    public function getClientsByName($name) {
        $sql = "SELECT `user_username` as `username`, `client_prenom` as `prenom`, `client_nom` as `nom`, `client_sexe` as `sexe`, `client_telephone` as `telephone`, `client_email` as `email`, CONCAT(client_prenom, ' ', client_nom) as fName FROM T_CLIENT WHERE CONCAT(client_prenom, ' ', client_nom) LIKE ? ORDER BY client_nom ASC";
        $clients = $this->executerRequete($sql, array("%".$name."%"));
        return $clients->fetchAll(PDO::FETCH_ASSOC);
    }
    
}
