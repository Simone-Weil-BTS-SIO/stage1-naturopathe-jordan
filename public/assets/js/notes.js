const typesNaturo = ["Antécédents familiaux", "Antécédents médicaux", "Médication/compléments alimentaires", "Système ORL", "Système gynécologique", "Système urinaire", "Système nerveux", "Système endocrinien", "Système cardio-vasculaire", "Peau", "Système locomoteur", "Système digestif", "Énergie", "Sommeil", "Activité physique", "Psycho - émotionnel", "Analyses / Prise de sang"];
const typesFleurs = ["Agrimony", "Aspen", "Beech", "Centaury", "Cerato", "Cherry Plum", "Chestnut Bud", "Chicory", "Clematis", "Crab Apple", "Elm", "Gentian", "Gorse", "Heather", "Holly", "Honeysuckle", "Hornbeam", "Impatiens", "Larch", "Mimulus", "Mustard", "Oak", "Olive", "Pine", "Red Chestnut", "Rock Rose", "Rock Water", "Scleranthus", "Star of Bethlehem", "Sweet Chestnut", "Vervain", "Vine", "Walnut", "Water Violet", "Wild Oat", "Wild Rose", "Willow", "RESCUE", "RESCUE Cream"];
const typesSystems = ["Système Nerveux", "Système Digestif", "Système Lymphatic", "Système Endocrinien", "Système Locomoteur", "Système Respiratoire", "Système Urogenitial", "Colonne Vertébrale"]

class NoteNaturopathie {
    source;
    notes;
    constructor(source, notes) {
        this.source = source;
        this.notes = notes;
    }

    setup() {
        let self = this;
        typesNaturo.forEach((element) => {
            let span = this.source.append(`<span class="h5">${element}:</span>`);
            let div = $(`<div class="note" id="${element}"></div>`);
            this.addButton(div);
            div.appendTo(span);
            let note = self.notes.filter((v, i) => { return v.label == element});
            if (note.length == 1) self.appendNotes(div, note[0].notes); 
        });
    }

    appendNotes(target, notes) {
        if (!notes || notes.length == 0) return;
        notes.forEach((element) => {
            let ul = $("<ul >");
            let li = $("<li>");
            let div = $(`<div class="note" id="${element.content}"></div>`);

            let input;
            if (element.multiline) {
                input = $("<textarea style='resize:both;'>");
                input.width("15rem").height("3.5rem");
                input.text(element.content);
            } else {
                input = $("<input>");
                input.attr("type", "text");
                input.attr("value", element.content);
            }

            this.addColorPicker(div,element.color);
            input.appendTo(div);
            this.addChangeToText(div);
            this.addDelete(ul, div);
            this.addButton(div);

            li.append(div);
            ul.append(li);

            let sub = target.append(ul);
            this.appendNotes(div, element.notes);
        });
    }

    parseToJson() {
        let notes = [];
        $("#display")
            .children("div")
            .each((i, e) => {
                let name = e.id;
                let subs = $(e).children("ul");
                let element = { label: name, notes: this.parseNotes(subs) };
                notes.push(element);
            });
        return notes;
    }

    parseNotes(notes) {
        let returned = [];
        if (!notes || notes.length == 0) return returned;
        notes.each((i, e) => {
            let div = $(e).children().first().children().first();
            let color = div.children("input[type=color]").first().val();
            let multiline = div.children("textarea").length > 0;
            let text = multiline
                ? div.children("textarea").first().val()
                : div.children("input[type=text]").first().val();
            let subs = $(div).children("ul");
            returned.push({
                multiline: multiline,
                color: color,
                content: text,
                notes: this.parseNotes(subs),
            });
        });
        return returned;
    }

    addButton(what) {
        let addButton = $("<button>").html(
            '<i class="fas fa-solid fa-plus"></i>'
        );
        let self = this;
        addButton.on("click", function (e) {
            e.preventDefault();
            self.addElement(what);
        });
        addButton.appendTo(what);
    }

    addColorPicker(what, color="#ffffff") {
        let colorPicker = $("<input>")
            .attr("type", "color")
            .attr("value", color);
        colorPicker.appendTo(what);
    }

    addChangeToText(what) {
        let self = this;
        let addButton = $("<button>").html(
            '<i class="fas fa-solid fa-i-cursor"></i>'
        );
        addButton.on("click", function (e) {
            e.preventDefault();
            self.changeToText(what);
        });
        addButton.appendTo(what);
    }

    addDelete(ul, li) {
        let addButton = $("<button>").html(
            '<i class="fas fa-solid fa-trash-alt"></i>'
        );
        addButton.on("click", function (e) {
            e.preventDefault();
            ul.remove();
        });
        addButton.appendTo(li);
    }

    changeToText(what) {
        if (what.children("input[type=text]").length == 1) {
            let area = $("<textarea style='resize:both;'>");
            area.width("15rem").height("3.5rem");
            let replaced = what.children("input[type=text]").first();
            let text = replaced.val();
            area.text(text);
            replaced.replaceWith(area);
        } else {
            let area = $("<input>");
            area.attr("type", "text");
            let replaced = what.children("textarea").first();
            let text = replaced.val();
            area.attr("value", text);
            replaced.replaceWith(area);
        }
    }
    addElement(what) {
        let children = $(what).children("ul").length;
        let ul = $("<ul>");
        let li = $("<li>").attr("id", `${what.attr("id")}:${children}`);

        let div = $("<div>");

        let input = $("<input>");
        input.attr("type", "text");

        this.addColorPicker(div);
        input.appendTo(div);
        this.addChangeToText(div);
        this.addDelete(ul, div);
        this.addButton(div);

        div.appendTo(li);

        li.appendTo(ul);
        ul.appendTo(what);
        $("div#contenu").scrollLeft(window.outerWidth);
    }

    display() {
        let self = this;

        typesNaturo.forEach(element => {
            let span = this.source.append(`<span class="h4">${element}:</span>`);
            let div = $(`<div class="note" id="${element}"></div>`).appendTo(span);
            let note = self.notes.find((v,i)=>v["label"] == element)
            if (!note) return;
            if (note.notes.length == 1) self.displayChildren(div, note.notes);
        });
        this.source.appendTo(this.source);
    }

    displayChildren(main, notes) {
        let self = this;
        notes.forEach(note => {
            let ul = $("<ul>");
            ul.css({"list-style-type": "none","padding": "7px","margin":"7px", "width":"auto","border-style": "solid","border-width":"2px","border-color":note.color});
            let li = $("<li>").appendTo(ul);
            let div = $(`<div class="note"></div>`).appendTo(li);
            let content = $("<span>").appendTo(div);
            content.addClass("h5");
            content.text(note.content);
            ul.appendTo(main);
            self.displayChildren(div,note.notes);
        });
    }

}

class NoteFleurBach {
    source;
    notes;
    select;
    selector;
    addBtn;

    constructor(source, notes, select) {
        this.source = source;
        this.notes = notes;
    }

    build() {
        this.select = $("<div id='choice'>");
        this.selector = $("<select id='fleur'>").appendTo(this.select);
        typesFleurs.forEach((element) => {
            let option = $("<option>").text(element).val(element);
            option.appendTo(this.selector);
        });
        this.addBtn = $("<button id='add'>+</button>").appendTo(this.select);
        $("div#contenu").prepend(this.select);
    }

    sortSelector(selector) {
        let elements = new Map();
        selector.children("option").each((i,c)=>{
            elements.set(c.value,c.innerText);
        });
        let sorted = new Map([...elements.entries()].sort());
        selector.empty();
        sorted.forEach((val,key)=>{
            $(`<option value="${key}">${val}</option>`).appendTo(selector);
        });
    }

    setup() {
        let self = this;
        this.build();
        this.addBtn.on("click", function (e) {
            e.preventDefault();
            let value = self.selector.val();
            if (value == "") return;
            let label = self.selector.children("option:selected").text();
            self.selector.children("option[value='" + value + "']").remove();
            let deleteBtn = $("<button><i class='fa fa-solid fa-trash'></i></button>");
            deleteBtn.click((e)=>{
                $(`span#${label}`).remove();
                $(`<option value='${label}'>${label}</option>`).appendTo(self.selector);
                self.sortSelector(self.selector);
            })
            let title = $(`<span id=${label} class="h5">${label}:</span>`); 

            deleteBtn.appendTo(title);
            let div = $(`<div class="note">`);
            let text = $("<textarea style='resize:both;'></textarea>");
            text.appendTo(div);
            div.appendTo(title);
            title.appendTo(self.source);
            //let container = $("<div id='"+label+"'>");
        });
        this.notes.forEach((element) => {
            let optionExisting = this.selector
                .children("option")
                .filter(function () {
                    return $(this).text() === element.label;
                })
                .first();
            if (optionExisting) optionExisting.remove();
            let target = this.source.append(
                `<span class="h5">${element.label}:</span>`
            );
            let div = $(`<div class="note" id="${element.label}"></div>`);
            let text = $("<textarea style='resize:both;'></textarea>");
            text.text(element.reason);
            text.appendTo(div);
            div.appendTo(target);
        });
    }

    parseToJson() {
        let notes = [];
        $("#display")
            .children("div")
            .each((i, e) => {
                let name = e.id;
                let textarea = $(e).children("textarea").first();
                let element = { label: name, reason: textarea.text() };
                notes.push(element);
            });
        return notes;
    }

    display() {
        let notes = this.notes;
        let display = $("#display");
        notes.forEach((element) => {
            let div = $(`<div class="note" id="${element.label}"></div>`);
            let text = $("<textarea style='resize:both;'></textarea>");
            text.text(element.reason);
            text.appendTo(div);
            div.appendTo(display);
        });
    }
}

class NoteReflexo {

    source;
    notes;

    constructor(source, notes) {
        this.source = source;
        this.notes = notes;
    }

    setup() {
        let self = this;
        let massaged = this.notes.massaged;
        typesSystems.forEach((element) => {
            let div = $(`<div>`);
            let checkbox = $("<input>").attr("id",element).attr("type", "checkbox").appendTo(div);
            if (massaged && massaged.includes(element)) checkbox.prop( "checked", true );
            let label = $("<label>").text(element).attr("for",element).appendTo(div);
            div.appendTo(self.source);
        });
        $("<textarea style='resize:both;'>").text(this.notes.feedback).appendTo(self.source);
    }

    parseToJson() {
        let massaged = [];
        let feedback = "";
        this.source.children("div").each((i, e) => {
            let checkbox = $(e).children("input").first();
            if (checkbox.prop("checked")) massaged.push(checkbox.attr("id"));
        });
        feedback = this.source.children("textarea").first().val();
        return { massaged: massaged, feedback: feedback };
    }

    display() {
        let massaged = this.notes.massaged;
        let list = $("<ul>"); 
        massaged.forEach((element) => {
            let li = $("<li>");
            $("<span>").addClass("h3").text(element).appendTo(li);
            li.appendTo(list);
        });
        list.appendTo(this.source);
        $("<span>").addClass("h3").text(this.notes.feedback).appendTo(this.source)
    }

}

class NoteNormal {

    source;
    notes;

    constructor(source, notes) {
        this.source = source;
        this.notes = notes;
    }

    setup() {
        $("<textarea style='resize:both;'>").text(this.notes.note).appendTo(this.source);
    }

    parseToJson() {
        let note = this.source.children("textarea").first().val();
        return { note: note };
    }

    display() {
        $("<span>").text(this.notes.note).appendTo(this.source);
    }

}

function saveToAPI(data) {
    let id = $("span#seance").text();
    $.ajax({
        url: "api/savenote/"+id,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json"
    });
}