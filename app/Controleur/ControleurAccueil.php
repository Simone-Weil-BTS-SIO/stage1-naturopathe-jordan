<?php

require_once SITE_ROOT.'Framework/Controleur.php';
require_once SITE_ROOT.'Modele/Seance.php';

class ControleurAccueil extends Controleur {

    private $seance;

    public function __construct() {
        $this->seance = new Seance();
    }

    public function index() {
        $seances = $this->seance->getNextSeances();
        $this->genererVue(array("seances"=>$seances));
    }

}

