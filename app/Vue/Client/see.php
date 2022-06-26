<?php $this->titre = "Client"; $lastDate = null; $this->scripts=["assets/libs/client/docBuilder.js","assets/libs/client/client.js", "https://unpkg.com/docx@7.1.0/build/index.js", "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.js"
]; ?>
<div style="display: none;">
    <form name="generatorData">
        <?php foreach ($client as $key => $value): ?>
            <input type="hidden" name="<?=$key?>" value="<?=$value?>">
        <?php endforeach; ?>
    </form>
</div>
<div class="container-fluid p-2" name="content">
    <div class="card m-2" style="width: auto;">
        <div class="card-body">
            <span class="h3 card-title"><?=$client["client_nom"]." ".$client["client_prenom"]?></span>
            <span  style="float:right;">
                <button onclick='goto("client/edit/",new Map([["user","<?=$client["user_username"]?>"]]));' class="h3 align-self-end">Modifier</button>
                <button onclick='goto("seance/new/",new Map([["user","<?=$client["user_username"]?>"]]));' class="h3 align-self-end"><i class="fa fa-solid fa-plus"></i>Séance</button>
            </span>
            <br><br>
            <?php if ($client["client_email"]): ?>
                <a href="mailto:<?=$client["client_email"]?>" class="card-link"><?=$client["client_email"]?></a>
            <?php else: ?> <span class="card-link">Pas d'email</span> <?php endif; ?>
            <span class="card-link"><?=($client["client_telephone"]) ? $client["client_telephone"] : "Pas de numéro" ?></a>
            <span class="dropdown" style="float:right">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Télécharger
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" onclick="firstConsult()">Première consultation</a></li>
                    <li><a class="dropdown-item" onclick="followUp()">Suivis</a></li>
                    <li><a class="dropdown-item" onclick="anamnese()">Anamnese</a></li>
                </ul>
            </span>
        </div>
    </div>


</div>



<?php if (count($seances) == 0):?>
    <div class="alert alert-warning text-center" role="alert">
        Ce client n'a aucun rendez-vous.
    </div>
<?php else:?>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Heure</th>
                <th scope="col">Type</th>
                <th scope="col">Durée</th>
                <th scope="col">Prix</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($seances as $key => $seance):?>
        <tr>
            <?php 
                $formatDate = ucwords(strftime("%A %d %b à %HH%M", strtotime($seance["debut"])));
                $splitDate = explode(" à ",$formatDate);
            ?>
            <td style="width:1px; white-space:nowrap;"><?= ($lastDate != $splitDate[0]) ? $splitDate[0] : ""?></td>
            <td style="width:1px; white-space:nowrap;"><?= $splitDate[1]; ?></td>
            <td><?=$seance["type"]?></td>
            <td><?=Helper::minToHourAndMin($seance["duree"],'%02dH%02d')?></td>
            <td><?=$seance["prix"]."€"?></td>
            <td style="width:1px; white-space:nowrap;">
                <button onclick='goto("seance/see/",new Map([["id","<?=$seance["id"]?>"]]));'><i class="fa fa-solid fa-eye"></i></button>
                <button onclick='goto("seance/edit/",new Map([["id","<?=$seance["id"]?>"]]));'><i class="fa fa-solid fa-pen-to-square"></i></button>
                <button onclick='callApiReload("seance/delete/",new Map([["id","<?=$seance["id"]?>"]]))'><i class="fa fa-solid fa-trash"></i></button>
            </td>
            <?php $lastDate = $splitDate[0]; ?>
        </tr>
        <?php endforeach;?>
        </tbody>
    </table>
<?php endif;?>