<?php

require_once SITE_ROOT.'Framework/Controleur.php';
require_once SITE_ROOT.'Modele/Client.php';

class ControleurClient extends Controleur {

    private $client;

    public function __construct() {
        $this->client = new Client();
    }

    public function index() {
        $clients = array();
        if ($this->requete->existeParametre("search")) {
            $search = $this->requete->getParametre("search");
            $clients = $this->client->getClientsByName($search);
        } else {
            $clients = $this->client->getClients();
        }
        $this->genererVue(array("clients"=>$clients));
    }

    public function see() {
        if (!$this->requete->existeParametre("user")) return $this->rediriger("client");
        $username = $this->requete->getParametre("user");
        $infos = $this->client->getInfos($username);
        $seances = $this->client->getSeances($username);
        $this->genererVue(array("client"=>$infos, "seances"=>$seances));
    }

    public function edit() {
        if (!$this->requete->existeParametre("user")) return $this->rediriger("client");
        $username = $this->requete->getParametre("user");
        $infos = $this->client->getInfos($username);
        $situations = $this->client->getSituationFamille();
        $this->genererVue(array("client"=>$infos,"situations"=>$situations));
    }

    public function new() {
        $situations = $this->client->getSituationFamille();
        $this->genererVue(array("situations"=>$situations));
    }

    public function delete() {
        if (!$this->requete->existeParametre("id")) return $this->rediriger("client");
        $id = $this->requete->getParametre("id");
        $this->client->deleteClient($id);
        echo json_encode(array("message"=>"Client supprimée"));
    }

}

