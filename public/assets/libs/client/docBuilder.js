const images = [];
const themes = [];

function loadImage(name,link) {
    toDataURL(link, function(dataUrl) {
        images[name] = dataUrl;
    });
}

function newTheme(name, theme) {
    themes[name] = theme;
}

function cTheme(name, more) {
    let theme = JSON.parse(JSON.stringify(themes[name]));
    for (const [key, value] of Object.entries(more)) {
        theme[key] = value;
    }
    return theme;
}

//Utilise docx.js pour générer un document Word
//Ainsi que FileSaver pour sauvegarder le document
class DocBuilder {
    constructor(titre,params={}) {
        this.title = titre;
        this.params = params;
        this.sections = [];
    }

    section(params) {
        return new DocSection(this,params);
    }
    apply(func, ...params) { return func(this,params); }

    e() {
        let data = {sections: this.sections};
        for (const [key, value] of Object.entries(this.params)) {
            data[key] = value;
        }
        return new docx.Document(data);
    }
}
class DocSection {

    constructor(builder,params={}) {
        this.builder = builder;        
        this.params = params;
        this.headerData = {};
        this.children = [];
    }

    header(params={}) { return new SectionHeader(this,params); }
    paragraph(params={}) { return new DocParagraph(this,params); }
    table(params={}) { return new DocTable(this,params); }
    apply(func, ...params) { return func(this,params); }
    other(other) { this.children.push(other); return this; }
    space(cm) { this.children.push(new docx.Paragraph({children: [], spacing: {after:  cmToSpacingValue(cm)}})); return this; }
    pageBreak() { this.children.push(new docx.Paragraph({children: [new docx.PageBreak()]})); return this;}
    addParagraphs(paragraphs=[]) { this.children.push(paragraphs); return this; }

    e() {
        let data = {headers:this.headerData, children:this.children};
        for (const [key, value] of Object.entries(this.params)) {
            data[key] = value;
        }
        this.builder.sections.push(data);
        return this.builder;
    }
}
class SectionHeader {

    constructor(section, params={}) {
        this.section = section,
        this.params = params;
        this.children = [];
    }

    paragraph(params={}) { return new DocParagraph(this,params); }
    table(params={}) { return new DocTable(this,params); }
    other(other) { this.children.push(other); return this; }
    apply(func, ...params) { return func(this,params); }

    e() {
        let data = {children:this.children};
        for (const [key, value] of Object.entries(this.params)) {
            data[key] = value;
        }
        this.section.headerData = {default:new docx.Header(data)};
        return this.section;
    }
}
class DocParagraph {
    
    constructor(parent,params={}) {
        this.parent = parent;
        this.params = params;
        this.children = [];
    }
    
    apply(func, ...params) { return func(this,params); }
    bullet(level) {
        this.params["bullet"] = {level: level};
        return this;
    }

    text(content, style={}) {
        let data = {text:content};
        for (const [key, value] of Object.entries(style)) {
            data[key] = value;
        }
        this.children.push(new docx.TextRun(data));
        return this;
    }

    img(_data, style={}) {
        let data = {data:_data};
        for (const [key, value] of Object.entries(style)) {
            data[key] = value;
        }
        this.children.push(new docx.ImageRun(data));
        return this;
    }

    paragraph(params={}) {  
        this.e();
        return this.parent.paragraph(params); 
    }

    e() {
        let data = {children:this.children};
        for (const [key, value] of Object.entries(this.params)) {
            data[key] = value;
        }
        this.parent.children.push(new docx.Paragraph(data));
        return this.parent;
    }
}
class DocTable {

    constructor(parent,params={}) {
        this.parent = parent;
        this.params = params;
        this.rows = [];
    }

    apply(func, ...params) { return func(this,params); }
    row(params={}) { return new TableRow(this,params); }

    e() {
        let data = {rows:this.rows};
        for (const [key, value] of Object.entries(this.params)) {
            data[key] = value;
        }
        this.parent.children.push(new docx.Table(data));
        return this.parent;
    }
}

class TableRow {

    constructor(table,params={}) {
        this.table = table;
        this.params = params;
        this.cells = [];
    }

    apply(func, ...params) { return func(this,params); }
    cell(widthPercent,params={}) {return new TableCell(this,widthPercent=widthPercent,params=params); }

    row(params={}) { return this.table.row(params); }

    e() {
        let data = {children:this.cells};
        for (const [key, value] of Object.entries(this.params)) {
            data[key] = value;
        }
        this.table.rows.push(new docx.TableRow(data));
        return this.table;
    }
}

class TableCell {

    constructor(row,widthPercent,params={}) {
        this.parent = row;
        this.widthPercent = widthPercent;
        this.params = params;
        this.children = [];
    }

    apply(func, ...params) { return func(this,params); }
    paragraph(params={}) { return new DocParagraph(this,params); }

    width(percentage) {
        this.widthPercent = percentage;
        return this;
    }
    colSize(nb) {
        this.params["columnSpan"] = nb;
        return this;
    }
    rowSize(nb) {
        this.params["rowSpan"] = nb;
        return this;
    }
    cell(widthPercent,params={}) {
        this.e();
        return this.parent.cell(widthPercent=widthPercent,params=params);
    }

    row(params={}) {
        this.e();
        this.parent.e();
        return this.parent.table.row(params);
    }

    e() { 
        let data = { children:this.children};

        if (this.widthPercent != undefined) data["width"] = { size: this.widthPercent, type:docx.WidthType.DXA };
        for (const [key, value] of Object.entries(this.params)) {
            data[key] = value;
        }
        this.parent.cells.push(new docx.TableCell(data));
        return this.parent;
    }

}


function saveDocument(doc, filename) {
    docx.Packer.toBlob(doc).then((blob) => {
        saveAs(blob, filename);
    });
}
function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
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