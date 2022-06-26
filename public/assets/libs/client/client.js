/*l
et logoData = "";
toDataURL("./Contenu/logo.svg", function(dataUrl) {
    logoData = dataUrl;
});


function logo() {
    return new docx.ImageRun({
    data: logoData,
    transformation: { height:70, width:70 },
    });
}
function tableauInfoPerso() {
    return new docx.Table({ 
        width: { size: 100, type: docx.WidthType.PERCENTAGE },
        rows: [
            new docx.TableRow({ children: [ cellTableau("Nom :",35), cellTableau("Prénom :",65), ], }),
            new docx.TableRow({ children: [ cellTableau("Adresse :",100), ], }),
            new docx.TableRow({ children: [ cellTableau("Tél :",100), ], }),
            new docx.TableRow({ children: [ cellTableau("E-Mail :",100), ], }),
            new docx.TableRow({ children: [ cellTableau("Date de naissance :",100), ], }),
            new docx.TableRow({ children: [ cellTableau("Pays de naissance :",100), ], }),
            new docx.TableRow({ children: [ cellTableau("Profession :",100), ], }),
            new docx.TableRow({ children: [ cellTableau("Situation familiale :",100), ], }),
        ],
    });
}

function getData(_form) {
    let _data = new FormData(document.forms.namedItem(_form));
    let entries = _data.entries();
    let entry = entries.next();
    let data = {};
    while (!entry.done) {
        let key = entry.value[0];
        let value = entry.value[1];
        data[key] = value;
        entry = entries.next();
    }
    return data;
}

function cmToSpacingValue(cm) {
    return (cm*5681)/10;
}
function cellTableau(val,width) {
    return new docx.TableCell({
        width: { size:width, type: docx.WidthType.PERCENTAGE },
        children: [new docx.Paragraph({
            children: [
                new docx.TextRun({
                    text: val,
                    color: "#045454",
                    font: "Tahoma",
                    size: 14*2,
                }),
            ],
        })],
    });
}
*/

/*
function firstConsult() {
    let data = getData("generatorData");
    const doc = new docx.Document({
        sections: [
          {
            headers: {
                default: new docx.Header({
                    children: [
                        new docx.Paragraph({
                            children: [logo()],
                            alignment: docx.AlignmentType.CENTER,
                            spacing: {
                                after: 400,
                            }
                        }),
                    ],
                }),
            },
            children: [
                new docx.Paragraph({children: [
                    new docx.TextRun({ text: "1", color: "#349290", font: "Tahoma", size: 18*2, bold: true, }),
                    new docx.TextRun({ text: "er", color: "#349290", font: "Tahoma", size: 18*2, bold: true, superScript: true,}),
                    new docx.TextRun({ text: " consultation", color: "#349290", font: "Tahoma", size: 18*2, bold: true, }),
                ], alignment: docx.AlignmentType.CENTER,}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(0.56)}}),
                new docx.Paragraph({ children: [ new docx.TextRun({ text: "Informations générales", color: "#349290", font: "Tahoma", size: 20*2, }),],}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(0.56)}}),
                tableauInfoPerso(),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(0.28)}}),
                new docx.Paragraph({children: [new docx.TextRun({ text: "Contact en cas d’urgence (nom/ n°GSM): ", color: "#C61044", font: "Tahoma", size: 12*2, italic: true, }),],}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(1)}}),
                new docx.Paragraph({children: [new docx.TextRun({ text: "Médecin traitant: ", color: "#045454", font: "Tahoma", size: 12*2, }),],}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(0.56)}}),
                new docx.Paragraph({children: [new docx.TextRun({ text: "Autres thérapeutes consultés régulièrement: ", color: "#045454", font: "Tahoma", size: 12*2, })],}),
                new docx.Paragraph({children: [new docx.PageBreak()]}),

                new docx.Paragraph({ children: [ new docx.TextRun({ text: "Antécédents médicaux & familiaux", color: "#349290", font: "Tahoma", size: 20*2 }),],}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(0.56)}}),
                new docx.Paragraph({children: [new docx.TextRun({ text: "Informations sur votre naissance (voie basse / césarienne / allaitement / problème particulier ?)", color: "#349290", font: "Tahoma", size: 12*2, underline:true }),],}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(2)}}),
                new docx.Paragraph({children: [new docx.TextRun({ text: "Antécédents chirurgicaux/ accidents / maladies à signaler", color: "#349290", font: "Tahoma", size: 12*2, underline:true }),],}),
                new docx.Paragraph({children: [new docx.PageBreak()]}),

                new docx.Paragraph({ children: [ new docx.TextRun({ text: "Antécédents familiaux", color: "#349290", font: "Tahoma", size: 20*2 }),],}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(0.28)}}),
                new docx.Paragraph({children: [new docx.TextRun({ text: "Description famille (nombre de frères et sœurs / place dans la fratrie):", font: "Tahoma", size: 12*2 }),],}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(0.28)}}),
                new docx.Paragraph({children: [new docx.TextRun({ text: "Maladies familiales à signaler: cancer, diabète, maladies cardio vasculaire...?", font: "Tahoma", size: 12*2 }),],}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(0.28)}}),

                new docx.Paragraph({children: [new docx.TextRun({ text: "Grands-Parents:", font: "Tahoma", size: 12*2, underline:true }),],}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(0.28)}}),
                new docx.Paragraph({children: [ new docx.TextRun({ text: "Grand-père paternel: ", font: "Tahoma", size: 12*2,}),],bullet: {level: 0}}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(1)}}),
                new docx.Paragraph({children: [ new docx.TextRun({ text: "Grand-père maternel: ", font: "Tahoma", size: 12*2,}),],bullet: {level: 0}}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(1)}}),
                new docx.Paragraph({children: [ new docx.TextRun({ text: "Grand-mère paternelle: ", font: "Tahoma", size: 12*2,}),],bullet: {level: 0}}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(1)}}),
                new docx.Paragraph({children: [ new docx.TextRun({ text: "Grand-mère maternelle: ", font: "Tahoma", size: 12*2,}),],bullet: {level: 0}}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(1)}}),
                
                new docx.Paragraph({children: [new docx.TextRun({ text: "Parents:", font: "Tahoma", size: 12*2, underline:true }),],}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(0.28)}}),
                new docx.Paragraph({children: [ new docx.TextRun({ text: "Père: ", font: "Tahoma", size: 12*2,}),],bullet: {level: 0}}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(1)}}),
                new docx.Paragraph({children: [ new docx.TextRun({ text: "Mère: ", font: "Tahoma", size: 12*2,}),],bullet: {level: 0}}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(1)}}),
                
                new docx.Paragraph({children: [new docx.TextRun({ text: "Fratrie:", font: "Tahoma", size: 12*2, underline:true }),],}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(0.28)}}),
                new docx.Paragraph({children: [ new docx.TextRun({ text: "Frère(s): ", font: "Tahoma", size: 12*2,}),],bullet: {level: 0}}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(1)}}),
                new docx.Paragraph({children: [ new docx.TextRun({ text: "Sœur(s): ", font: "Tahoma", size: 12*2,}),],bullet: {level: 0}}),
                new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(1)}}),
            ]
          }
        ]
    });
    saveDoc(doc,`1er rdv ${data["client_nom"]} ${data["client_prenom"]}.docx`);
}*/

loadImage("logo","/assets/image/logo.png");
newTheme("titre",{color: "#349290", font: "Tahoma", size: 20*2})
newTheme("categorie",{color: "#349290", font: "Tahoma", size: 14*2, underline:true})
newTheme("texte",{color: "#045454", font: "Tahoma", size: 12*2})

const formName = "generatorData"

//Informations consultant.e - 1er rdv.docx
function firstConsult() {
    let data = getData("generatorData");
    let doc = new DocBuilder("FirstConsult")
        .section()
            .header().paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).img(images["logo"],{transformation: {width:70, height:70}}).e().e()
            .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("Consultation de suivi ",themes["titre"]).e().space(0.56)
            .paragraph({spacing: {after: cmToSpacingValue(0.28)}}).text("Date:",themes["texte"]).e()
            .paragraph().text("Date précédentes consultations:",themes["texte"]).e().space(0.56)
            .paragraph().text("Informations générales",themes["categorie"]).e().space(0.56)
            .apply(tableau_client, this, data)
            .space(0.28)
            .paragraph().text("Contact en cas d’urgence (nom/ n°GSM): "+data["urgence_nom"]+" | "+data["urgence_tel"], cTheme("texte",{color: "#C61044", italics: true})).e().space(1)
            .paragraph().text("Médecin traitant:"+data["medecin_nom"]+" | "+data["medecin_tel"]+" | "+data["medecin_adresse"], cTheme("texte",{italics: true})).e().space(0.56)
            .paragraph().text("Thérapeutes:", cTheme("texte",{italics: true})).e()
            .pageBreak()
            .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("Antécédents médicaux & familiaux",themes["titre"]).e()
            .paragraph().text("Informations sur votre naissance (voie basse / césarienne / allaitement / problème particulier ?)",themes["categorie"]).e().space(2)
            .paragraph().text("Antécédents chirurgicaux/ accidents / maladies à signaler",themes["categorie"]).e()
            .pageBreak()
            .paragraph().text("Antécédents familiaux",themes["categorie"]).e().space(0.28)
            .paragraph().text("Description famille (nombre de frères et sœurs / place dans la fratrie):",themes["texte"]).bullet(0).e().space(2)
            .paragraph().text("Maladies familiales à signaler: cancer, diabète, maladies cardio vasculaire...?",themes["texte"]).bullet(0).e().space(0.28)
            .paragraph().text("\t",themes["texte"]).text("Grands-parents",themes["categorie"]).e().space(0.28)
            .paragraph().text("Grand-père paternel:",themes["texte"]).bullet(1).e().space(1)
            .paragraph().text("Grand-père maternel:",themes["texte"]).bullet(1).e().space(1)
            .paragraph().text("Grand-mère paternelle:",themes["texte"]).bullet(1).e().space(1)
            .paragraph().text("Grand-mère maternelle:",themes["texte"]).bullet(1).e().space(1)
            .paragraph().text("\t",themes["texte"]).text("Parents",themes["categorie"]).e().space(0.28)
            .paragraph().text("Père:",themes["texte"]).bullet(1).e().space(1)
            .paragraph().text("Mère:",themes["texte"]).bullet(1).e().space(1)
            .paragraph().text("\t",themes["texte"]).text("Fratrie",themes["categorie"]).e().space(0.28)
            .paragraph().text("Frère(s):",themes["texte"]).bullet(1).e().space(1)
            .paragraph().text("Sœur(s):",themes["texte"]).bullet(1).e()
        .e()
    .e();
    saveDocument(doc, `1er rdv ${data["client_nom"]} ${data["client_prenom"]}.docx`);
}

//Anamnese Consultation de suivi.docx
function followUp() {
    let data = getData("generatorData");
    let doc = new DocBuilder("FollowUp")
        .section()
            .header().paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).img(images["logo"],{transformation: {width:70, height:70}}).e().e()
            .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("Consultation de suivi ",themes["titre"]).e().space(0.56)
            .paragraph({spacing: {after: cmToSpacingValue(0.28)}}).text("Date:",themes["texte"]).e()
            .paragraph().text("Date précédentes consultations:",themes["texte"]).e().space(0.56)
            .paragraph().text("Informations générales",themes["categorie"]).e().space(0.56)
            .apply(tableau_client, this, data)
            .space(0.28)
            .paragraph().text("Contact en cas d’urgence (nom/ n°GSM):", cTheme("texte",{color: "#C61044", italics: true})).e().space(1)
            .paragraph().text("Médecin traitant:", cTheme("texte",{italics: true})).e().space(0.56)
            .paragraph().text("Thérapeutes:", cTheme("texte",{italics: true})).e()
            .pageBreak()
            .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("Retour sur les pistes proposées",themes["titre"]).e()
            .pageBreak().pageBreak()
            .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("Objectifs de la séance",themes["titre"]).e().space(3)
            .paragraph().text("Médication:",themes["categorie"]).e().space(1)
            .paragraph().text("Médicament(s):", themes["texte"]).bullet(0).e().space(2)
            .paragraph().text("Vaccin(s):", themes["texte"]).bullet(0).e().space(2)
            .paragraph().text("Complément(s) alimentaire(s):", themes["texte"]).bullet(0).e().space(2)
            .pageBreak()
            .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("PHV",themes["titre"]).e()
        .e()
    .e();
    saveDocument(doc, `Suivi ${data["client_nom"]} ${data["client_prenom"]}.docx`);
}

function anamnese() {
    let data = getData("generatorData");
    let doc = new DocBuilder("FirstConsult")
    .section()
        .header().paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).img(images["logo"],{transformation: {width:70, height:70}}).e().e()
        .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("Consultation de suivi",themes["titre"]).e().space(0.56)
        .paragraph({spacing: {after: cmToSpacingValue(0.28)}}).text("Date:",themes["texte"]).e()
        .paragraph().text("Date précédentes consultations:",themes["texte"]).e().space(0.56)
        .paragraph().text("Informations générales",themes["categorie"]).e().space(0.56)
        .apply(tableau_client, this, data)
        .space(0.28)
        .paragraph().text("Contact en cas d’urgence (nom/ n°GSM):", cTheme("texte",{color: "#C61044", italics: true})).e().space(1)
        .paragraph().text("Médecin traitant:", cTheme("texte",{italics: true})).e().space(0.56)
        .paragraph().text("Thérapeutes:", cTheme("texte",{italics: true})).e()
        .pageBreak()
        .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("Description des troubles",themes["titre"]).e().space(0.56)
        .paragraph().text("Qu'est-ce qui ne va pas ? Depuis qd avez-vous ces troubles ? Début ? Rythme/durée des manifestations ? Intensité/retentissement sur le quotidien ? Fact qui aggravent/protègent ? Manifestations associées ?",themes["texte"]).bullet(0).e().space(10)
        .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("Objectifs de la séance",themes["titre"]).e().space(0.56)
        .paragraph().text("Résumé en une phrase / Quels sont les objectifs / Avec quoi aimeriez- vous repartir ?",themes["texte"]).bullet(0).e()
        .pageBreak()
        .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("Situation familiale & professionnelle",themes["titre"]).e().space(4)
        .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("Antécédents médicaux & familiaux",themes["titre"]).e().space(0.56)
        .paragraph().text("Naissance",themes["categorie"]).e().space(2)
        .paragraph().text("Antécédents chirurgicaux/ accidents / maladies",themes["categorie"]).e()
        .pageBreak()
        .paragraph().text("Antécédents familiaux",themes["categorie"]).e().space(0.28)
        .paragraph().text("Description famille (nombre de frères et sœurs / place dans la fratrie):",themes["texte"]).bullet(0).e().space(2)
        .paragraph().text("Maladies familiales à signaler: cancer, diabète, maladies cardio vasculaire...?",themes["texte"]).bullet(0).e().space(0.28)
        .paragraph().text("\t",themes["texte"]).text("Grands-parents",themes["categorie"]).e().space(0.28)
        .paragraph().text("Grand-père paternel:",themes["texte"]).bullet(1).e().space(1)
        .paragraph().text("Grand-père maternel:",themes["texte"]).bullet(1).e().space(1)
        .paragraph().text("Grand-mère paternelle:",themes["texte"]).bullet(1).e().space(1)
        .paragraph().text("Grand-mère maternelle:",themes["texte"]).bullet(1).e().space(1)
        .paragraph().text("\t",themes["texte"]).text("Parents",themes["categorie"]).e().space(0.28)
        .paragraph().text("Père:",themes["texte"]).bullet(1).e().space(1)
        .paragraph().text("Mère:",themes["texte"]).bullet(1).e().space(1)
        .paragraph().text("\t",themes["texte"]).text("Fratrie",themes["categorie"]).e().space(0.28)
        .paragraph().text("Frère(s):",themes["texte"]).bullet(1).e().space(1)
        .paragraph().text("Sœur(s):",themes["texte"]).bullet(1).e()
        .pageBreak()
        .paragraph().text("Situation Médicale",themes["titre"]).e().space(0.28)
        .paragraph().text("Médication",themes["categorie"]).e().space(0.28)
        .paragraph().text("Médicament(s):",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Vaccin(s):",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Complément(s) alimentaire(s):",themes["texte"]).bullet(0).e().space(1);
    if (data["sexe"] == 0) doc = doc.apply(anamneseH,data).e().e();
    else doc = doc.apply(anamneseF,data).e().e();
    saveDocument(doc, `Anamnese ${data["client_nom"]} ${data["client_prenom"]}.docx`);
}

function anamneseH(doc,data) {
    doc.paragraph().text("Système urogénital",themes["categorie"]).e().space(0.28)
        .paragraph().text("Gynéco",themes["categorie"]).e().space(0.28)
        .paragraph().text("MST / Infections urinaires / Troubles prostate",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Libido",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Reins",themes["categorie"]).e().space(0.28)
        .paragraph().text("Lithiases urinaires / Pertes urinaires",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Urines = Combien de fois ? Couleur/Odeur ?",themes["texte"]).bullet(0).e().space(1)
        .pageBreak()
        .paragraph().text("Système ORL",themes["categorie"]).e().space(0.28)
        .paragraph().text("Sinusite chronique / Rhinite allergique / Pbl audition",themes["texte"]).bullet(0).e().space(2)
        .paragraph().text("Système respiratoire",themes["categorie"]).e().space(0.28)
        .paragraph().text("Bronchite / Asthme",themes["texte"]).bullet(0).e().space(2)
        .paragraph().text("Peau",themes["categorie"]).e().space(0.28)
        .paragraph().text("Psoriasis ? Eczéma ? Urticaire ? Acné ?...",themes["texte"]).bullet(0).e().space(2)
        .paragraph().text("Système locomoteur",themes["categorie"]).e().space(0.28)
        .paragraph().text("Douleurs / Ostéoporose / Arthrose / Rhumatisme",themes["texte"]).bullet(0).e().space(2)
        .paragraph().text("Système cardiovasculaire",themes["categorie"]).e().space(0.28)
        .paragraph().text("Tension / HTA ? HypoT° /Dyslipidémie (ChOL / TG)",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Pbl cardiaques : AVC / Troubles du rythme cardiaque / Stents… ",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Varices / hémorroïdes / pbl circulatoires ?",themes["texte"]).bullet(0).e()
        .pageBreak()
        .paragraph().text("Système lymphatique",themes["categorie"]).e().space(0.28)
        .paragraph().text("Jambes lourdes",themes["texte"]).bullet(0).e().space(2)
        .paragraph().text("Système nerveux",themes["categorie"]).e().space(0.28)
        .paragraph().text("Relation au stress / Burn out / Dépression",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("NeuroT",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Sérotonine",themes["categorie"]).e().space(0.5)
        .apply(tableau_serotonine)
        .pageBreak()
        .paragraph().text("Dopamine",themes["categorie"]).e().space(0.5)
        .apply(tableau_dopamine)
        .space(0.5)
        .paragraph().text("GABA",themes["categorie"]).e().space(0.5)
        .apply(tableau_gaba)
        .space(0.5)
        .paragraph().text("Mélatonine",themes["categorie"]).e().space(0.5)
        .apply(tableau_melatonine)
        .space(0.28)
        .paragraph().text("Récap NeuroT =>",themes["categorie"]).e().space(0.5)
        .pageBreak()
        .paragraph().text("Système endocrinien",themes["categorie"]).e().space(0.28)
        .paragraph().text("Thyroïde",themes["texte"]).bullet(0).e().space(0.28)
        .paragraph().text("Hyperthyroïdie",themes["texte"]).e()
        .apply(tableau_hyperthyroidie)
        .space(0.5)
        .paragraph().text("Hypothyroïdie",themes["texte"]).e()
        .apply(tableau_hypothyroidie)
        .space(1)
        .paragraph().text("Pancréas : diabète/syndrome métabolique",themes["texte"]).e().space(0.28)
        .paragraph().text("Récap SE =>",themes["texte"]).e().space(1.25)
        .paragraph().text("Système digestif = Écosystème intestinal",themes["categorie"]).e().space(0.28)
        .paragraph().text("Ulcère / Chirurgie bariatrique / Maladies du foie pancréas / Lithiase vésicule biliaire /Ablation vésicule biliaire",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Dents (saignement des gencives, amalgames ?)",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Halitose",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Langue chargée",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("RGO",themes["texte"]).bullet(0).e().space(1.5)
        .paragraph().text("Digestion",themes["categorie"]).e().space(0.28)
        .paragraph().text("Hypochlorhydrie (sensation d’estomac trop plein juste ap le repas sans avoir mangé +++) / Difficulté à digérer les graisses / Ballonnements / douleurs G D / spasmes ? / Maux de tête digestifs / Fatigue chronique / Confusion mentale / Attrait pour le sucre",themes["texte"]).bullet(0).e().space(2)
        .paragraph().text("Gaz odorants ? / Non odorants ? / Prurit anal,vaginal ?",themes["texte"]).bullet(0).e()
        .pageBreak()
        .paragraph().text("Transit",themes["categorie"]).e().space(0.28)
        .paragraph().text("Qualité des selles (aspect, odeur, couleur…) // Régularité des selles",themes["texte"]).bullet(0).e().space(2)
        .paragraph().text("Situations allergiques",themes["categorie"]).e().space(0.28)
        .paragraph().text("Allergies (pénicilline, aspirine, pdt de contraste iodé…) ?",themes["texte"]).bullet(0).e().space(2)
        .paragraph().text("Intolérances / Allergies alimentR (caséine, gliadine…)",themes["texte"]).bullet(0).e().space(2)
        .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("Hygiène de vie & alimentation",themes["titre"]).e().space(0.56)
        .paragraph().text("Sommeil & Énergie au cours de la journée ",themes["categorie"]).e().space(5)
        .paragraph().text("Activité physique ",themes["categorie"]).e()
        .pageBreak()
        .paragraph().text("Addictions",themes["categorie"]).e().space(0.2)
        .paragraph().text("Comment se manifeste votre relation à l'alcool/tabac etc… ?",themes["texte"]).e().space(2)
        .paragraph().text("Description d’une journée type",themes["categorie"]).e().space(0.28)
        .paragraph().text("Habitudes alimentaires particulières ? Appétit ? ",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Mastication ?",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Journée type alimentation + hydratation (voir annexe)", cTheme("texte",{color: "#C61044", italics: true})).e().space(3)
        .paragraph({alignment: docx.AlignmentType.CENTER}).text("Autres troubles",themes["titre"]).e().space(0.28)
        .paragraph().text("Avez-vous qq chose à ajouter ?",themes["texte"]).e().space(4)
        .paragraph({alignment: docx.AlignmentType.CENTER}).text("Résultats biologiques",themes["titre"]).e().space(0.56)
        .pageBreak()
        .paragraph({alignment: docx.AlignmentType.CENTER}).text("PHV",themes["titre"]).e().space(0.56)
        .pageBreak()
        .paragraph({alignment: docx.AlignmentType.CENTER}).text("Bilan de santé",themes["titre"]).e().space(0.56);
    return doc;
}

function anamneseF(doc, data) {
    doc.paragraph().text("Système urogénital",themes["categorie"]).e().space(0.28)
        .paragraph().text("Gynéco",themes["categorie"]).e().space(0.28)
        .paragraph().text("Age de la ménarche (date, flux, vécu…)",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Régularité du cycle / durée du cycle / durée des menstruations / SPM / Ménopause ?",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Contraception ?",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Grossesses (nb, rq pdt G, vécu accouchement, santé des E…) / IVG / Fausses couches ?",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("MST / Infections urinaires",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Libido",themes["texte"]).bullet(0).e().space(1)
        
        .paragraph().text("Reins",themes["categorie"]).e().space(0.28)
        .paragraph().text("Lithiases urinaires / Pertes urinaires",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Urines = Combien de fois ? Couleur/Odeur ?",themes["texte"]).bullet(0).e().space(1)

        .paragraph().text("Système ORL",themes["categorie"]).e().space(0.28)
        .paragraph().text("Sinusite chronique / Rhinite allergique / Pbl audition",themes["texte"]).bullet(0).e().space(2)
        
        .paragraph().text("Système respiratoire",themes["categorie"]).e().space(0.28)
        .paragraph().text("Bronchite / Asthme",themes["texte"]).bullet(0).e().space(2)
        
        .paragraph().text("Peau",themes["categorie"]).e().space(0.28)
        .paragraph().text("Psoriasis ? Eczéma ? Urticaire ? Acné ?...",themes["texte"]).bullet(0).e().space(2)
        
        .paragraph().text("Système locomoteur",themes["categorie"]).e().space(0.28)
        .paragraph().text("Douleurs / Ostéoporose / Arthrose / Rhumatisme",themes["texte"]).bullet(0).e().space(2)
        
        .paragraph().text("Système cardiovasculaire",themes["categorie"]).e().space(0.28)
        .paragraph().text("Tension / HTA ? HypoT° /Dyslipidémie (ChOL / TG)",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Pbl cardiaques : AVC / Troubles du rythme cardiaque / Stents… ",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Varices / hémorroïdes / pbl circulatoires ?",themes["texte"]).bullet(0).e().space(2)
        
        .paragraph().text("Système lymphatique",themes["categorie"]).e().space(0.28)
        .paragraph().text("Jambes lourdes",themes["texte"]).bullet(0).e().space(2)
        
        .paragraph().text("Système nerveux",themes["categorie"]).e().space(0.28)
        .paragraph().text("Relation au stress / Burn out / Dépression",themes["texte"]).bullet(0).e().space(1.5)
        .paragraph().text("NeuroT",themes["texte"]).bullet(0).e().space(1)
        .pageBreak()
        .paragraph().text("Sérotonine",themes["categorie"]).e().space(0.2)
        .apply(tableau_serotonine).space(0.5)
        .paragraph().text("Dopamine",themes["categorie"]).e().space(0.2)
        .apply(tableau_dopamine)
        .space(0.5)
        .paragraph().text("GABA",themes["categorie"]).e().space(0.2)
        .apply(tableau_gaba)
        .pageBreak()
        .paragraph().text("Mélatonine",themes["categorie"]).e().space(0.2)
        .apply(tableau_melatonine)
        .space(0.28)
        .paragraph().text("Récap NeuroT =>",themes["categorie"]).e().space(2)
        .paragraph().text("Système endocrinien",themes["categorie"]).e().space(0.28)
        .paragraph().text("Thyroïde",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Hyperthyroïdie",themes["categorie"]).e().space(0.2)
        .apply(tableau_hyperthyroidie)
        .pageBreak()
        .paragraph().text("Hypothyroïdie",themes["categorie"]).e().space(0.2)
        .apply(tableau_hypothyroidie)
        .space(1)
        .paragraph().text("Pancréas : diabète/syndrome métabolique",themes["texte"]).e().space(0.28)
        .paragraph().text("Récap SE =>",themes["texte"]).e().space(1.25)
        .pageBreak()
        .paragraph().text("Système digestif = Écosystème intestinal",themes["categorie"]).e().space(0.28)
        .paragraph().text("Ulcère / Chirurgie bariatrique / Maladies du foie pancréas / Lithiase vésicule biliaire /Ablation vésicule biliaire",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Dents (saignement des gencives, amalgames ?)",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Halitose",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Langue chargée",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("RGO",themes["texte"]).bullet(0).e().space(1.5)
        .paragraph().text("Digestion",themes["categorie"]).e().space(0.28)
        .paragraph().text("Hypochlorhydrie (sensation d’estomac trop plein juste ap le repas sans avoir mangé +++) / Difficulté à digérer les graisses / Ballonnements / douleurs G D / spasmes ? / Maux de tête digestifs / Fatigue chronique / Confusion mentale / Attrait pour le sucre",themes["texte"]).bullet(0).e().space(2)
        .paragraph().text("Gaz odorants ? / Non odorants ? / Prurit anal,vaginal ?",themes["texte"]).bullet(0).e()
        .pageBreak()
        .paragraph().text("Transit",themes["categorie"]).e().space(0.28)
        .paragraph().text("Qualité des selles (aspect, odeur, couleur…) // Régularité des selles",themes["texte"]).bullet(0).e().space(2)
        .paragraph().text("Situations allergiques",themes["categorie"]).e().space(0.28)
        .paragraph().text("Allergies (pénicilline, aspirine, pdt de contraste iodé…) ?",themes["texte"]).bullet(0).e().space(2)
        .paragraph().text("Intolérances / Allergies alimentR (caséine, gliadine…)",themes["texte"]).bullet(0).e().space(2)
        .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("Hygiène de vie & alimentation",themes["titre"]).e().space(0.56)
        .paragraph().text("Sommeil & Énergie au cours de la journée ",themes["categorie"]).e().space(2)
        .paragraph().text("Activité physique ",themes["categorie"]).e()
        .paragraph().text("Addictions",themes["categorie"]).e().space(0.2)
        .paragraph().text("Comment se manifeste votre relation à l'alcool/tabac etc… ?",themes["texte"]).e().space(2)
        .pageBreak()
        .paragraph().text("Description d’une journée type",themes["categorie"]).e().space(0.28)
        .paragraph().text("Habitudes alimentaires particulières ? Appétit ? ",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Mastication ?",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Journée type alimentation + hydratation (voir annexe)", cTheme("texte",{color: "#C61044", italics: true})).e().space(1.5)
        .paragraph({alignment: docx.AlignmentType.CENTER}).text("Psycho - émotionnel",themes["titre"]).e().space(0.28)
        .paragraph().text("Troubles émotionnels :",themes["texte"]).e().space(2)
        .paragraph().text("Passions / Hobbies :",themes["texte"]).e().space(2)
        .paragraph().text("Baguette magique :",themes["texte"]).e().space(2)
        .paragraph({alignment: docx.AlignmentType.CENTER}).text("Résultats biologiques",themes["titre"]).e().space(0.56)
        .pageBreak()
        .paragraph({alignment: docx.AlignmentType.CENTER}).text("PHV",themes["titre"]).e().space(0.56)
        .pageBreak()
        .paragraph({alignment: docx.AlignmentType.CENTER}).text("Bilan de santé",themes["titre"]).e().space(0.56);
    return doc;
} 

function reflexoPlantairePrems() {
    let data = getData("generatorData");
    let doc = new DocBuilder("Reflexo Plantaire Premier RDV")
        .section()
        .header().paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).img(images["logo"],{transformation: {width:70, height:70}}).e().e()
        .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("Réflexologie plantaire",cTheme(themes["titre"],{bold:true})).e().space(0.28)
        .paragraph({alignment: docx.AlignmentType.CENTER,spacing: {after: 400}}).text("- 1 ère séance -",cTheme(themes["titre"],{bold:true})).e().space(0.56)
        .paragraph().text("Date:",themes["texte"]).e().space(0.28)
        .paragraph().text("Informations générales",themes["categorie"]).e().space(0.56)
        .apply(tableau_client, this, data)
        .space(0.28)
        .paragraph().text("Contact en cas d’urgence (nom/ n°GSM):", cTheme("texte",{color: "#C61044", italics: true})).e().space(1)
        .paragraph().text("Médecin traitant:", cTheme("texte",{italics: true})).e().space(0.56)
        .paragraph().text("Thérapeutes:", cTheme("texte",{italics: true})).e()
        .pageBreak()
        .paragraph().text("État de santé général",themes["categorie"]).e().space(0.28)
        .paragraph().text("Pbl de santé aigu (infections/inflammation) / chronique (SCV/SD/SE/SU/SL) à signaler ?",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Traumatisme chevilles/pied ?",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Portez-vous une prothèse/implant ? Si oui, précisez :",themes["texte"]).bullet(0).e().space(1)
        .paragraph().text("Hygiène de vie (alim°/hydratation/activité physique/stress/tabac/alcool/drogues…) ?",themes["texte"]).bullet(0).e().space(1)
        .pageBreak();
    if (data["sexe"] == 0) doc = doc.apply(reflexoPlantairePremsH,data).e().e();
    else doc = doc.apply(reflexoPlantairePremsF,data).e().e();
    saveDocument(doc, `1er Reflexo ${data["client_nom"]} ${data["client_prenom"]}.docx`);
}

function reflexoPlantairePremsH(doc, data) {
    return doc;
}

function reflexoPlantairePremsF(doc, data) {
    return doc;
}

function relefoxPlantaireSuivi(data) {

}

function relefoxPlantaireSuiviH(data) {

}

function relefoxPlantaireSuiviF(data) {

}

function getData(_form) {
    let _data = new FormData(document.forms.namedItem(_form));
    let entries = _data.entries();
    let entry = entries.next();
    let data = {};
    while (!entry.done) {
        let key = entry.value[0];
        let value = entry.value[1];
        data[key] = value;
        entry = entries.next();
    }
    data["naissance_date"] = new Date(data["naissance_date"]).toLocaleDateString()
    return data;
}

/* TABLEAU */
function tableau_client(doc, _data) {
    let data = _data[1];
    return doc.table({columnWidths: [3505,5505 ],})
        .row()
            .cell().paragraph().text("Nom: "+data["client_nom"],themes["texte"]).e()
            .cell().paragraph().text("Prénom: "+data["client_prenom"],themes["texte"]).e()
        .row().cell().colSize(2).paragraph().text("Adresse: "+data["client_adresse"],themes["texte"]).e()
        .row().cell().colSize(2).paragraph().text("Tél: "+data["client_telephone"],themes["texte"]).e()
        .row().cell().colSize(2).paragraph().text("E-Mail: "+data["client_email"],themes["texte"]).e()
        .row().cell().colSize(2).paragraph().text("Date de naissance: "+data["naissance_date"],themes["texte"]).e()
        .row().cell().colSize(2).paragraph().text("Pays de naissance: "+data["naissance_pays"],themes["texte"]).e()
        .row().cell().colSize(2).paragraph().text("Profession: "+data["client_profession"],themes["texte"]).e()
        .row().cell().colSize(2).paragraph().text("Situation familiale: "+data["famille_situation"],themes["texte"]).e().e()
        .e()
    .e()
}

function tableau_serotonine(doc) {
    return doc
        .table({columnWidths: [5505, 1752, 1752]})
            .row()
                .cell().paragraph().text("Évaluation tension pulsionnelle",themes["texte"]).e()
                .cell().paragraph({alignment: docx.AlignmentType.CENTER}).text("Oui",themes["texte"]).e().cell().paragraph({alignment: docx.AlignmentType.CENTER}).text("Non",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Irritabilité",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Impatience",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Difficulté à supporter contraintes & frustrations",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Difficulté à faire face au stress",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Sautes d'humeur",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Agressivité",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Tendance au grignotage en fin de journée",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Tendance à la dépendance",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Difficulté d'endormissement + réveils nocturnes",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Dépression saisonnière",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .e().e()
        .e();
}

function tableau_dopamine(doc) {
    return doc
        .table({columnWidths: [5505, 1752, 1752]})
            .row()
                .cell().paragraph().text("Évaluation si fatigue mentale à cause d'une déficience en Tyrosine/Dopamine",themes["texte"]).e()
                .cell().paragraph({alignment: docx.AlignmentType.CENTER}).text("Oui",themes["texte"]).e().cell().paragraph({alignment: docx.AlignmentType.CENTER}).text("Non",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Fatigue physique/morale",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Démotivation/manque d'intérêt pr le travail",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Difficulté à prendre des décisions/ faire des projets",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Impression de fcter au ralenti",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Repli sur soir/ recherche -- de contact av les amis",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Moins de plaisir à faire les choses = Bof syndrome",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Sentiment de déprime/manque de confiance/dévalorisation",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Pbl de concentration/mémorisation",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Impatience dans les jambes",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Baisse de la libido",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .e().e()
        .e();
}

function tableau_gaba(doc) {
    return doc
        .table({columnWidths: [5505, 1752, 1752]})
            .row()
                .cell().paragraph().text("",themes["texte"]).e()
                .cell().paragraph({alignment: docx.AlignmentType.CENTER}).text("Oui",themes["texte"]).e().cell().paragraph({alignment: docx.AlignmentType.CENTER}).text("Non",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Sensibilité au stress/à la lumière/au bruit",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Conso alcool",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Pré-ménopause (puisq ProgesT auGM sensibilité des récepT aux H (dc GABA)",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .e().e()
        .e()
}

function tableau_melatonine(doc) {
    return doc
        .table({columnWidths: [5505, 1752, 1752]})
            .row()
                .cell().paragraph().text("",themes["texte"]).e()
                .cell().paragraph({alignment: docx.AlignmentType.CENTER}).text("Oui",themes["texte"]).e().cell().paragraph({alignment: docx.AlignmentType.CENTER}).text("Non",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Difficulté d’endormissement",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Libido",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Rumination",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Sommeil peu profond / Réveils fréquents",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .e().e()
        .e();
}

function tableau_hyperthyroidie(doc) {
    return doc
        .table({columnWidths: [5505, 1752, 1752]})
            .row()
                .cell().paragraph().text("",themes["texte"]).e()
                .cell().paragraph({alignment: docx.AlignmentType.CENTER}).text("Oui",themes["texte"]).e().cell().paragraph({alignment: docx.AlignmentType.CENTER}).text("Non",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Exophtalmie",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Palpitation",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Tremblements",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Amaigrissement",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .e().e()
        .e();
}

function tableau_hypothyroidie(doc) {
    return doc
        .table({columnWidths: [5505, 1752, 1752]})
            .row()
                .cell().paragraph().text("",themes["texte"]).e()
                .cell().paragraph({alignment: docx.AlignmentType.CENTER}).text("Oui",themes["texte"]).e().cell().paragraph({alignment: docx.AlignmentType.CENTER}).text("Non",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Articulations raides le matin",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Fatigue dès le matin / Plus fatigué au repos que lorsqu'en activité",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Moral up and down",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Mauvaise circulation artérielle et veineuse",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Pbl hormonaux (SPM…)",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Infection ORL à répétition",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("T° matinale = basse",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Cholestérol élevé + LDL élevés",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Gastroparésie = lourdeur d’estomac ap repas",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Lenteur dans la réflexion + mvts",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Ralentissement du métabolisme (constipation / prise de poids)",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Cheveux & ongles (chute et fragilité)",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Problème de concentration et d'attention",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Mauvaise cicatrisation",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Maux de tête de plus en plus fréquent",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Ext froides",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Dernier 1/3 sourcil disparu",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Signe du Godet",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Plante des pieds orange (accumulation caroténoïdes)",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Crampes = perte d'élasticité du muscle dc tjs légèrement contracté",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Poches ss yeux",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Doigts gonflés au réveil",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Frilosité",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Peau sèche (talons, coudes, tibias)",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .row()
                .cell().paragraph().text("Voix rauque au réveil",themes["texte"]).e()
                .cell().paragraph().text("",themes["texte"]).e().cell().paragraph().text("",themes["texte"]).e()
            .e().e()
        .e();
}
/*=====================*/