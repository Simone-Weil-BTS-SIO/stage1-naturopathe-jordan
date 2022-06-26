<?php $this->titre = "Client"; ?>
<div class="container-fluid p-2" name="content">
    <span class="h1"><?=$client["client_nom"]." ".$client["client_prenom"]?></span>
</div>
<div>
    <form id="edit" method="GET" target="#" autocomplete="off">
        <input type="hidden" name="user_username" value="<?=$client["user_username"]?>">
        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend"><span class="input-group-text" id="">Nom</span></div>
            <input disabled required name="client_nom" type="text" class="form-control" placeholder="Nom"
                value="<?=$client["client_nom"]?>">
            <input disabled required name="client_prenom" type="text" class="form-control" placeholder="Prenom"
                value="<?=$client["client_prenom"]?>">
            <div class="input-group-append">
                <button onclick='toggleInputName("client_nom"); toggleInputName("client_prenom");'
                    class="btn btn-outline-secondary" type="button"><i class="fas fa-edit"></i></button>
            </div>
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">E-Mail</span>
            </div>
            <input disabled name="client_email" type="email" class="form-control" placeholder="E-Mail"
                value="<?=$client["client_email"]?>">
            <div class="input-group-append">
                <button onclick='toggleInputName("client_email");' class="btn btn-outline-secondary" type="button"><i
                        class="fas fa-edit"></i></button>
            </div>
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Téléphone</span>
            </div>
            <input disabled name="client_telephone" type="text" class="form-control" placeholder="Téléphone"
                value="<?=$client["client_telephone"]?>">
            <div class="input-group-append">
                <button onclick='toggleInputName("client_telephone");' class="btn btn-outline-secondary"
                    type="button"><i class="fas fa-edit"></i></button>
            </div>
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Adresse</span>
            </div>
            <input disabled name="client_adresse" type="text" class="form-control" placeholder="Adresse"
                value="<?=$client["client_adresse"]?>">
            <div class="input-group-append">
                <button onclick='toggleInputName("client_adresse");' class="btn btn-outline-secondary" type="button"><i
                        class="fas fa-edit"></i></button>
            </div>
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Date de naissance</span>
            </div>
            <input disabled name="naissance_date" type="date" class="form-control" placeholder="Date de naissance"
                value="<?=$client["naissance_date"]?>">
            <div class="input-group-append">
                <button onclick='toggleInputName("naissance_date");' class="btn btn-outline-secondary" type="button"><i
                        class="fas fa-edit"></i></button>
            </div>
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Pays de naissance</span>
            </div>
            <input disabled name="naissance_pays" type="text" class="form-control" placeholder="Pays de naissance"
                value="<?=$client["naissance_pays"]?>">
            <div class="input-group-append">
                <button onclick='toggleInputName("naissance_pays");' class="btn btn-outline-secondary" type="button"><i
                        class="fas fa-edit"></i></button>
            </div>
        </div>
        <hr class="w-75 mx-auto">
        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Profession</span>
            </div>
            <input disabled name="client_profession" type="text" class="form-control" placeholder="Profession"
                value="<?=$client["client_profession"]?>">
            <div class="input-group-append">
                <button onclick='toggleInputName("client_profession");' class="btn btn-outline-secondary"
                    type="button"><i class="fas fa-edit"></i></button>
            </div>
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Situation Familiale</span>
            </div>
            <select disabled name="famille_situation" class="form-select" aria-label="Default select example">
                <?php for ($i=0; $i < count($situations); $i++): ?>
                <option <?=($situations[$i]["label"] == $client["famille_situation"]) ? "selected" : ""; ?>
                    value="<?=$situations[$i]['label']?>"><?=$situations[$i]['label']?></option>
                <?php endfor; ?>
            </select>
            <div class="input-group-append">
                <button onclick='toggleInputName("famille_situation");' class="btn btn-outline-secondary"
                    type="button"><i class="fas fa-edit"></i></button>
            </div>
        </div>
        <hr class="w-75 mx-auto">
        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Contact d'urgence</span>
            </div>
            <input disabled name="urgence_nom" type="text" class="form-control" placeholder="Contact d'urgence"
                value="<?=$client["urgence_nom"]?>">
            <div class="input-group-append">
                <button onclick='toggleInputName("urgence_nom");' class="btn btn-outline-secondary" type="button"><i
                        class="fas fa-edit"></i></button>
            </div>
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Numéro d'urgence</span>
            </div>
            <input disabled name="urgence_tel" type="text" class="form-control" placeholder="Numéro d'urgence"
                value="<?=$client["urgence_tel"]?>">
            <div class="input-group-append">
                <button onclick='toggleInputName("urgence_tel");' class="btn btn-outline-secondary" type="button"><i
                        class="fas fa-edit"></i></button>
            </div>
        </div>
        <hr class="w-75 mx-auto">
        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Médecin</span>
            </div>
            <input disabled name="medecin_nom" type="text" class="form-control" placeholder="Médecin"
                value="<?=$client["medecin_nom"]?>">
            <div class="input-group-append">
                <button onclick='toggleInputName("medecin_nom");' class="btn btn-outline-secondary" type="button"><i
                        class="fas fa-edit"></i></button>
            </div>
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Numéro médecin</span>
            </div>
            <input disabled name="medecin_tel" type="text" class="form-control" placeholder="Numéro médecin"
                value="<?=$client["medecin_tel"]?>">
            <div class="input-group-append">
                <button onclick='toggleInputName("medecin_tel");' class="btn btn-outline-secondary" type="button"><i
                        class="fas fa-edit"></i></button>
            </div>
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Adresse médecin</span>
            </div>
            <input disabled name="medecin_adresse" type="text" class="form-control" placeholder="Adresse médecin"
                value="<?=$client["medecin_adresse"]?>">
            <div class="input-group-append">
                <button onclick='toggleInputName("medecin_adresse");' class="btn btn-outline-secondary" type="button"><i
                        class="fas fa-edit"></i></button>
            </div>
        </div>
        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Sexe</span>
            </div>
            <select disabled name="client_sexe" class="form-select" aria-label="Default select example">
                <option <?=($client["client_sexe"] == 0) ? "selected" : ""?> value="0">Homme</option>
                <option <?=($client["client_sexe"] == 1) ? "selected" : ""?> value="1">Femme</option>
            </select>
            <div class="input-group-append">
                <button onclick='toggleInputName("client_sexe");' class="btn btn-outline-secondary" type="button"><i
                        class="fas fa-edit"></i></button>
            </div>
        </div>
        <div class="pb-5" style="text-align:center;"><input id="editBtn" class="btn btn-primary" type="submit"
                value="Enregistrer">
        </div>
    </form>
</div>
<span id="output"></span>
<script>
$("input#editBtn").click((e) => {
    e.preventDefault();
    let form = $('form#edit')[0];
    let formData = new FormData(form);
    $("input#editBtn").prop("disabled", true);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/editClient",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function(data) {
            if (isJson(data)) {
                let answer = JSON.parse(data);
                if (!answer["message"]) {
                    alert("Une erreur est survenue")
                    alert(data);
                } else { 
                    alert(answer["message"]);
                    goto("client/see/",new Map([["user","<?=$client["user_username"]?>"]]));
                }
            } else {
                alert("Une erreur est survenue")
                alert(data);
            }
            $("input#editBtn").prop("disabled", false);
        },
        error: function(e) {
            alert("Une erreur est survenue");
            alert(e.responseText);
            $("input#editBtn").prop("disabled", false);
        }
    });

})
</script>