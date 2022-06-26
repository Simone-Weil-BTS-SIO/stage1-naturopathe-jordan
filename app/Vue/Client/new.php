<?php $this->titre = "Client"; ?>
<div class="container-fluid p-2" name="content">
    <span class="h1">Nouveau client</span>
</div>
<div>
    <form id="edit" method="GET" target="#" autocomplete="off">
        <input type="hidden" name="user_username" value="">
        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend"><span class="input-group-text" id="">Nom</span></div>
            <input required name="client_nom" type="text" class="form-control" placeholder="Nom"
                value="">
            <input required name="client_prenom" type="text" class="form-control" placeholder="Prenom"
                value="">
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">E-Mail</span>
            </div>
            <input name="client_email" type="email" class="form-control" placeholder="E-Mail"
                value="">
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Téléphone</span>
            </div>
            <input name="client_telephone" type="text" class="form-control" placeholder="Téléphone"
                value="">
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Adresse</span>
            </div>
            <input name="client_adresse" type="text" class="form-control" placeholder="Adresse"
                value="">
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Date de naissance</span>
            </div>
            <input name="naissance_date" type="date" class="form-control" placeholder="Date de naissance"
                value="">
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Pays de naissance</span>
            </div>
            <input name="naissance_pays" type="text" class="form-control" placeholder="Pays de naissance"
                value="">
        </div>
        <hr class="w-75 mx-auto">
        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Profession</span>
            </div>
            <input name="client_profession" type="text" class="form-control" placeholder="Profession"
                value="">
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Situation Familiale</span>
            </div>
            <select name="famille_situation" class="form-select" aria-label="Default select example">
                <?php for ($i=0; $i < count($situations); $i++): ?>
                <option value="<?=$situations[$i]['label']?>"><?=$situations[$i]['label']?></option>
                <?php endfor; ?>
            </select>
        </div>
        <hr class="w-75 mx-auto">
        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Contact d'urgence</span>
            </div>
            <input name="urgence_nom" type="text" class="form-control" placeholder="Contact d'urgence"
                value="">
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Numéro d'urgence</span>
            </div>
            <input name="urgence_tel" type="text" class="form-control" placeholder="Numéro d'urgence"
                value="">
        </div>
        <hr class="w-75 mx-auto">
        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Médecin</span>
            </div>
            <input name="medecin_nom" type="text" class="form-control" placeholder="Médecin"
                value="">
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Numéro médecin</span>
            </div>
            <input name="medecin_tel" type="text" class="form-control" placeholder="Numéro médecin"
                value="">
        </div>

        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Adresse médecin</span>
            </div>
            <input name="medecin_adresse" type="text" class="form-control" placeholder="Adresse médecin"
                value="">
        </div>
        <div class="pb-1 mx-auto w-75 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="">Sexe</span>
            </div>
            <select name="client_sexe" class="form-select" aria-label="Default select example">
                <option value="0">Homme</option>
                <option value="1">Femme</option>
            </select>
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
        url: "/api/createClient",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function(data) {
            if (isJson(data)) {
                let answer = JSON.parse(data);
                if (!answer["id"]) {
                    alert("Une erreur est survenue")
                    alert(answer["message"]);
                } else { 
                    alert(answer["message"]);
                    goto("client/see/",new Map([["user",answer["id"]]]));
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