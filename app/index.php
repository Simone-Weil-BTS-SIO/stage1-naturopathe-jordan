<?php
date_default_timezone_set('Europe/Paris');
setlocale(LC_TIME, 'fr_FR.utf8', 'fra');
define('SITE_ROOT', __DIR__."/");

require SITE_ROOT.'Framework/Routeur.php';
require_once SITE_ROOT.'Framework/Helper.php';

if (!isset($_SESSION["login"]) && isset($_COOKIE["remember"])) {
    $cookie = explode("|", $_COOKIE["remember"]);
    $user = $cookie[0];
    $pass = $cookie[1];
    $user = $this->utilisateur->getInfos($user);
    if ($user["utilisateur_password"] == $pass) {
        $_SESSION["login"] = $user;
    }
}

$routeur = new Routeur();
$routeur->routerRequete();