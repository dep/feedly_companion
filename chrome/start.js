$("body").live("keyup", function(event) {
    code = event.keyCode;

    if (nothing_focused()) {
        if (code == 67 && event.shiftKey == true) {
            var sharebox = $(".selectedEntry").find(".sharebox");
            if (sharebox.length > 0) {
                sharebox.remove();
            } else {
                var title = generate_url();
                $(".selectedEntry .title").after("<input type='text' class='sharebox' readonly>");
                $(".selectedEntry .sharebox").attr("value", "'" + title.name + "' - From: " + title.url);
                $(".selectedEntry .sharebox").select();
            }
        } else if (code == "91" || code == "27") {
            $(".selectedEntry .sharebox").slideUp(function() {
                $(this).remove();
            });
        }
        if (code == 69 && event.shiftKey == true) {
            var title = generate_url();
            url = "https://mail.google.com/mail/?view=cm&fs=1&su=" + encodeURIComponent(title.name) + "&body=Check out this article: " + encodeURIComponent(title.name) + " From: " + title.url;
            chrome.extension.sendMessage({url: url}, function(response) { });
        }
    }
});

function generate_url() {
    var title = new Object();
    title.obj = $(".selectedEntry .title");
    title.name = title.obj.html().replace(/&nbsp;/g, " ");
    title.url = title.obj.attr("href");
    return title;
}

// Check for focused elements
function nothing_focused() {
    var active_el = $(document.activeElement);
    if (document.activeElement.tagName == "BODY") {
        return true;
    }
}
