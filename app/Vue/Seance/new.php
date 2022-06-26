<?php $this->titre = "Nouvelle Séance"; $typeJS = [];?>
<?php
foreach ($types as $key => $type) {
    array_push($typeJS, '{"label":"'.$type["label"].'", "duree":'.$type["duree"].', "prix":'.$type["prix"].', "prix_etu_se":'.$type["prix_etu_se"]."}");
}
$typeJS = "[".implode(",", $typeJS)."]";
?>
<style>
    input[type="checkbox"]:disabled{
        background: gray;
    }
</style>
<script> const types = <?=$typeJS?>;</script>
<div class="container-fluid p-2" name="content">
    <h1>Nouvelle séance pour <?=$user["client_nom"]." ".$user["client_prenom"]?></h1>
    <form id="form" action="#" method="post">
        <div class="input-group w-75 mx-auto pb-2">
            <span class="input-group-text">Type: </span>
            <select required class="form-select" id="type">
                <option value="" selected >Sélectionner un type</option>
            </select>
        </div>

        <div class="input-group w-75 mx-auto pb-2">
            <span class="input-group-text" id="inputGroup-sizing-sm">Date: </span>
            <input required type="datetime-local" class="form-control" id="date" name="date">
        </div>
        <div class="input-group w-75 mx-auto pb-2">
            <span class="input-group-text" id="inputGroup-sizing-sm">Durée (en minute): </span>
            <input id="duree" type="number" class="form-control " aria-label="Text input with checkbox">
        </div>
        
        <div class="input-group w-75 mx-auto pb-2">
            <span class="input-group-text" id="inputGroup-sizing-sm">Prix: </span>
            <input id="prix" type="number" class="form-control " aria-label="Text input with checkbox">
            <span class="input-group-text">Réduit ?</span>
            <div class="input-group-text">
                <input id="prix_reduit" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
            </div>
        </div>
        
        <div class="text-center">
            <button type="submit" class="btn btn-primary">Créer</button>
        </div>
</div>

<script>
    let format = (number) => ('0' + number).slice(-2);
    let typeSelector = $("#type");
    let prix_reduit = $("#prix_reduit");
    let date = $("#date");
    let now = new Date();
    let dateF = now.getFullYear()+"-"+format(now.getMonth()+1)+"-"+format(now.getDate())+"T"+format(now.getHours())+":"+format(now.getMinutes());//2022-06-19T19:07
    date.val(dateF).prop("min",dateF);
    types.forEach(function(e) {
        typeSelector.append('<option value="'+e.label+'">'+e.label+'</option>');
    });
    typeSelector.on("change", function() {
        let index = typeSelector.prop("selectedIndex");
        if (index == 0) {
            $("#duree").val(0);
            $("#prix").val(0);
            prix_reduit.prop("checked", false); prix_reduit.prop("disabled", true);
        } else {
            let type = types.find(function(e) {return e.label == typeSelector.val();});
            $("#duree").val(type.duree);
            if (!type.prix_etu_se || type.prix_etu_se == 0) {
                prix_reduit.prop("checked", false); prix_reduit.prop("disabled", true);
            } else prix_reduit.prop("disabled", false);
            if (prix_reduit.is(":checked")) $("#prix").val(type.prix_etu_se);
            else $("#prix").val(type.prix);
        }
    });
    prix_reduit.on("change", function() {
        if (prix_reduit.is(":checked")) {
            $("#prix").val(types.find(function(e) {return e.label == typeSelector.val()}).prix_etu_se);
        } else {
            $("#prix").val(types.find(function(e) {return e.label == typeSelector.val()}).prix);
        }
    });

    $("form#form").submit((e)=>{
        e.preventDefault();
        let type = types.find(function(e) {return e.label == typeSelector.val();});
        let date = $("#date").val();
        let duree = $("#duree").val();
        let prix = $("#prix").val();
        let data = {
            "type": type.label, 
            "date": date,
            "duree": duree,
            "prix": prix, "user": "<?=$user["user_username"]?>"
        };
        $.ajax({
            url: "api/createSeance/",
            data: data,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                goto("client/see/",new Map([["user", "<?=$user["user_username"]?>"]]))
            }
        });
    });

    typeSelector.trigger("change");
</script>