function lightUp() {
    $(".nav-item, .nav-link").each(function() {
        if (this.href == window.location.href) {
            $(this).addClass("active");
        }
    });
}