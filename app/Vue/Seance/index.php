<?php $this->titre = "Séances"; $lastDate = null; ?>
<div class="container-fluid p-2" name="content">
    <span class="h1">Tous vos rendez-vous</span>
</div>

<div><form method="GET" action="seance/">
    <label for="target">Quand: </label><input type="date" name="target" /><input type="submit" value="Filter"/>
</form></div>
<?php if (count($seances) == 0):?>
    <div class="alert alert-warning text-center" role="alert">
        <a>Vous n'avez aucun rendez-vous.</a>
    </div>
<?php else:?>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Heure</th>
                <th scope="col">Nom</th>
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
            <td style="cursor: pointer; transform: rotate(0);">
                <a onclick='goto("client/see/",new Map([["user","<?=$seance["username"]?>"]]));' class="link-dark stretched-link">
                    <?=$seance["nom"]." ".$seance["prenom"]?>
                </a>
            </td>
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