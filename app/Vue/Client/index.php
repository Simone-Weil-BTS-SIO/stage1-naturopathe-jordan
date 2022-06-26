<?php $this->titre = "Clients";?>
<div class="container-fluid p-2" name="content">
    <span class="h1">Clients</span><span style="float:right;"><button onclick='goto("client/new/");' class="h1">Nouveau Client</button></span>
</div>
<?php if (count($clients) == 0):?>
    <div class="alert alert-warning text-center" role="alert">
        Vous n'avez aucun client.
    </div>
<?php else:?>
    <span>
        <form>
            <label for="search">Recherche: </label><input type="text" name="search" placeholder="Nom"/><input type="submit" value="Chercher">
        </form>
    </span>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Nom</th>
                <th scope="col">Sexe</th>
                <th scope="col">Téléphone</th>
                <th scope="col">EMail</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($clients as $key => $client):?>
        <tr>
            <td style="width:1px; white-space:nowrap; cursor: pointer; transform: rotate(0);">
                <a onclick='goto("client/see/",new Map([["user","<?=$client["username"]?>"]]));' class="link-dark stretched-link">
                    <?=$client["nom"]." ".$client["prenom"]?>
                </a>
            </td>
            <td style="width:1px; white-space:nowrap;"><?= ($client["sexe"] == 0) ? "H" : "F"; ?></td>
            <td><?=$client["telephone"]?></td>
            <td><?=$client["email"]?></td>
            <td style="width:1px; white-space:nowrap;">
                <button onclick='goto("client/see/",new Map([["user","<?=$client["username"]?>"]]));'><i class="fa fa-solid fa-eye"></i></button>
                <button onclick='goto("client/edit/",new Map([["user","<?=$client["username"]?>"]]));'><i class="fa fa-solid fa-pen-to-square"></i></button>
                <button onclick='callApiReload("client/delete/",new Map([["id","<?=$client["username"]?>"]]))'><i class="fa fa-solid fa-trash"></i></button>
            </td>
        </tr>
        <?php endforeach;?>
        </tbody>
    </table>
<?php endif;?>