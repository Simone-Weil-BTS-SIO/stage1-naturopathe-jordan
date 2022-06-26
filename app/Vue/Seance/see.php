<?php $this->titre = "Notes"; $this->scripts=["assets/js/notes.js"]; ?>
<script>
    const seanceId = <?=$id?>;
</script>
<pre id="display" class="p-2"></pre>
<div id="notes" style="display: none"><?php echo $notes; ?></div>
<button id="save">Imprimer</button>
<script>
    let type = "<?=$type?>";
    let output = $("pre#display");
    let json = JSON.parse($("div#notes").text());
    let map;
    if (type.toLowerCase().includes("naturopathie")) map = new NoteNaturopathie(output, json);
    else if (type.toLowerCase().includes("fleurs")) map = new NoteFleurBach(output, json);
    else if (type.toLowerCase().includes("réflexologie plantaire")) map = new NoteReflexo(output, json);
    else map = new NoteNormal(output, json);
    map.display();
    $("button#save").click(function() {
        $("nav#navbar").hide();
        $(this).hide();
        print();
        $("nav#navbar").show();
        $(this).show();
    });
</script>