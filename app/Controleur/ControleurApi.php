<?php

require_once SITE_ROOT.'Framework/Controleur.php';
require_once SITE_ROOT.'Modele/Seance.php';
require_once SITE_ROOT.'Modele/Client.php';
require_once SITE_ROOT.'Framework/Helper.php';

class ControleurApi extends Controleur {

    private $client;
    private $seance;

    public function __construct() {
        $this->seance = new Seance();
        $this->client = new Client();
    }

    public function index() {
        $this->rediriger("accueil");
    }

    public function seanceAmount() {
        echo json_encode(array("amount"=>$this->seance->getAmount()));
    }

    public function seanceDisplayLimit() {
        echo json_encode(array("limit"=>Seance::$limit));
    }

    public function editClient() {
        $params = $this->requete->getParametres();
        $userData = array_filter($params,function($key){
            return (Helper::hasPrefix($key,"client_") || Helper::hasPrefix($key,"user_") || Helper::hasPrefix($key,"naissance_") || Helper::hasPrefix($key,"urgence_") || Helper::hasPrefix($key,"medecin_") || Helper::hasPrefix($key,"famille_")|| Helper::hasPrefix($key,"naissance_")|| Helper::hasPrefix($key,"user_"));
        },ARRAY_FILTER_USE_KEY);
        $success = $this->client->editClient($userData);
        if ($success) echo json_encode(array("message"=>"Modification réussie !"));
        else echo json_encode(array("message"=>"Une erreur est survenue !"));
    }

    public function setNote() {
        if (!$this->requete->existeParametre("id")) echo json_encode(array("message"=>"Veuillez préciser la séance !"));
        else {
            $id = $this->requete->getParametre("id");
            $notes = $this->requete->getParametre("notes");
            $this->seance->setNotes($id,$notes);
            echo json_encode(array("message"=>"Les notes ont été mise à jours !"));
        }
    }

    public function createSeance() {
        if (!$this->requete->existeParametre("user")) echo json_encode(array("message"=>"Veuillez préciser un utilisateur !"));
        else {
            $user = $this->requete->getParametre("user");
            $type = $this->requete->getParametre("type");
            $date = $this->requete->getParametre("date");
            $duree = $this->requete->getParametre("duree");
            $prix = $this->requete->getParametre("prix");
            $this->seance->newSeance($user,$type,$date,$duree,$prix);
            echo json_encode(array("message"=>"Séance crée !"));
        }
    }

    public function createClient() {
        $params = $this->requete->getParametres();
        $userData = array_filter($params,function($key){
            return (Helper::hasPrefix($key,"client_") || Helper::hasPrefix($key,"user_") || Helper::hasPrefix($key,"naissance_") || Helper::hasPrefix($key,"urgence_") || Helper::hasPrefix($key,"medecin_") || Helper::hasPrefix($key,"famille_")|| Helper::hasPrefix($key,"naissance_")|| Helper::hasPrefix($key,"user_"));
        },ARRAY_FILTER_USE_KEY);
        $success = $this->client->createClient($userData);
        if (isset($success)) {
            echo json_encode(array("message"=>"Utilisateur créé","id"=>$success["username"]));
        } else {
            echo json_encode(array("message"=>"Une erreur est survenue !"));
        }
    }

}

