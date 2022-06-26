<?php

/**
 * Classe de gestion des paramètres de configuration.
 * Inspirée du SimpleFramework de Frédéric Guillot
 * (https://github.com/fguillot/simpleFramework)
 *
 * @author Baptiste Pesquet
 */
class Configuration
{
    /** Tableau des paramètres de configuration */
    private static $parametres;

    /**
     * Renvoie la valeur d'un paramètre de configuration
     * 
     * @param string $nom Nom du paramètre
     * @param string $valeurParDefaut Valeur à renvoyer par défaut
     * @return string Valeur du paramètre
     */
    public static function get($nom, $valeurParDefaut = null)
    {
        $parametres = self::getParametres();
        if (isset($parametres[$nom])) {
            $valeur = $parametres[$nom];
        }
        else {
            $valeur = $valeurParDefaut;
        }
        return $valeur;
    }

    /**
     * Renvoie le tableau des paramètres en le chargeant au besoin depuis un fichier de configuration.
     * Les fichiers de configuration recherchés sont Config/dev.ini et Config/prod.ini (dans cet ordre)
     * 
     * @return array Tableau des paramètres
     * @throws Exception Si aucun fichier de configuration n'est trouvé
     */

    public static function getConfigType() {
        if (self::$parametres == null) {
            $cheminFichier = SITE_ROOT."Config/dev.ini";
            if (!file_exists($cheminFichier)) {
                $cheminFichier = SITE_ROOT."Config/prod.ini";
            }
            if (!file_exists($cheminFichier)) {
                return "";
            }
            else {
                $returned = str_replace(SITE_ROOT."Config/", "", $cheminFichier);
                return str_replace(".ini", "", $returned);
            }
        }
        return "";
    }

    private static function getParametres() {
        if (self::$parametres == null) {
            $cheminFichier = SITE_ROOT."Config/dev.ini";
            if (!file_exists($cheminFichier)) {
                $cheminFichier = SITE_ROOT."Config/prod.ini";
            }
            if (!file_exists($cheminFichier)) {
                throw new Exception("Aucun fichier de configuration trouvé");
            }
            else {
                self::$parametres = parse_ini_file($cheminFichier);
            }
        }
        return self::$parametres;
    }

}



