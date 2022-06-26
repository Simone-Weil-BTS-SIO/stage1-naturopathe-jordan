function toggleInputName(name) {
    $("*[name="+name+"]").prop("disabled", !$("*[name="+name+"]").attr("disabled"));
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function goto(path, options=new Map()) {
    let url = path+"?";
    let params = [];
    options.forEach((val,key) => {
        params.push(key+"="+encodeURIComponent(val));
    });
    params = params.join("&");
    url += params;
    window.location.href=url;
}

function callApiReload(path, options=new Map()) {
    let a =  $.ajax({
        url: path,
        data: Object.fromEntries(options),
        type: "GET",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            location.reload();
        }
    });
}

function callApi(path, options=new Map()) {
    let a =  $.ajax({
        url: path,
        data: Object.fromEntries(options),
        type: "GET",
        contentType: "application/json; charset=utf-8",
    });
}

function api_getLimit(callback, err) {
    return $.ajax({
        url: "/api/seances",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            callback(data);
        },
        error: function(xhr, status, error) {
            let err = jQuery.parseJSON(xhr.responseText).error;
            err(err);
        }
    });
}

function sortSelector(selector) {

}