<?php
    require_once SITE_ROOT.'Framework/Configuration.php';
    echo Configuration::getConfigType(); 
?>

<!doctype html>
<html lang="fr">
    <head>
        <meta charset="UTF-8" />
        <base href="<?= $racineWeb ?>" >
        <title><?= $titre ?></title>

        <link rel="stylesheet" href="assets/css/style.css" />
        <link rel="icon" href="assets/image/logo.svg" type="image/svg+xml">
        
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" type="text/javascript"></script>
        
        <script src="assets/js/navbar.js" type="text/javascript"></script>
        <script src="assets/js/helper.js" type="text/javascript"></script>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>

        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" crossorigin="anonymous">
        <?php foreach ($styles as $style):?>
            <?= '<link href="'.$style.'" rel="stylesheet">' ?>
        <?php endforeach?>
        <?php foreach ($scripts as $script):?> 
            <?= '<script src="'.$script.'" type="text/javascript"></script>'; ?>
        <?php endforeach; ?>
    </head>
    <body onload="lightUp()" class="d-flex flex-column min-vh-100">
        <nav id="navbar" class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a href="" class="navbar-brand">
                    <img class="d-inline-block align-middle mr-2 img-fluid" style="width:2rem;" src="/assets/image/logo.svg" ></img>
                </a>
                <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav">
                        <a href="client/" class="nav-item nav-link">Clients</a>
                        <a href="seance/" class="nav-item nav-link">Seances</a>
                    </div>
                    <div class="navbar-nav ms-auto">
                    </div>
                </div>
            </div>
        </nav>
        <div id="contenu">
            <?= $contenu ?>
        </div> <!-- #contenu -->
    </body>
</html>