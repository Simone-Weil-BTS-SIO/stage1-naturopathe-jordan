<?php

require_once SITE_ROOT.'Framework/Controleur.php';
require_once SITE_ROOT.'Modele/Seance.php';
require_once SITE_ROOT.'Modele/Client.php';

class ControleurSeance extends Controleur {

    private $seance;
    private $client;

    public function __construct() {
        $this->seance = new Seance();
        $this->client = new Client();
    }

    public function index() {
        $seances = array();
        if ($this->requete->existeParametre("target")) {
            $date = strtotime($this->requete->getParametre("target"));
            $mysqldate = date( 'Y-m-d H:i:s', $date );
            $seances = $this->seance->getSeancesOfDay($mysqldate);
        } else {
            $seances = $this->seance->getSeancesASC();
        }
        $this->genererVue(array("seances"=>$seances));
    }

    public function see() {
        if (!$this->requete->existeParametre("id")) return $this->rediriger("seance");
        $id = $this->requete->getParametre("id");
        $seance = $this->seance->getSeance($id);
        $notes = $this->seance->getNotes($id);
        $this->genererVue(array("id"=>$id,"type"=>$seance["seance_type"],"notes"=>$notes));
    }

    public function edit() {
        if (!$this->requete->existeParametre("id")) return $this->rediriger("seance");
        $id = $this->requete->getParametre("id");
        $seance = $this->seance->getSeance($id);
        $notes = $this->seance->getNotes($id);
        $this->genererVue(array("id"=>$id,"type"=>$seance["seance_type"],"notes"=>$notes));
    }

    public function delete() {
        if (!$this->requete->existeParametre("id")) return $this->rediriger("seance");
        $id = $this->requete->getParametre("id");
        $this->seance->deleteSeance($id);
        echo json_encode(array("message"=>"Seance supprimée"));
    }

    public function new() {
        if (!$this->requete->existeParametre("user")) return $this->rediriger("user");
        $user = $this->requete->getParametre("user");
        $types = $this->seance->getSeancesTypes();
        $infos = $this->client->getInfos($user);
        $this->genererVue(array("user"=>$infos,"types"=>$types));
    }
}

