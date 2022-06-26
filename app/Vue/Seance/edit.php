<?php $this->titre = "Notes"; $this->scripts=["assets/js/notes.js"]; ?>
<style>
label,
input[type=color],
textarea{
  display:inline-block;
  vertical-align:middle;
}
</style>
<script>const seanceId = <?=$id?>;</script>
<pre id="display" class="p-2"></pre>
<div id="notes" style="display: none"><?php echo $notes; ?></div>
<button id="save">Enregistrer</button>
<script>
    let type = "<?=$type?>";
    let output = $("pre#display");
    let json = JSON.parse($("div#notes").text());
    let map;
    if (type.toLowerCase().includes("naturopathie")) map = new NoteNaturopathie(output, json);
    else if (type.toLowerCase().includes("fleurs")) map = new NoteFleurBach(output, json);
    else if (type.toLowerCase().includes("réflexologie plantaire")) map = new NoteReflexo(output, json);
    else map = new NoteNormal(output, json);
    map.setup();
    $("button#save").click(function () {
        let json = map.parseToJson();
        json = JSON.stringify(json);
        $.ajax({
            url: "api/setNote/"+seanceId,
            type: "POST",
            data: { notes: json },
            success: function (data) { alert(JSON.parse(data)["message"]); }
        });
    });
</script>