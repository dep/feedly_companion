$("body").live("keypress", function(event) {
    code = event.keyCode;

    if (nothing_focused() && event.shiftKey == true) {
        /* shift-c */
        if (code == 67) {
            if (sharebox()) {
                var title = generate_url();
                $(".selectedEntry .sharebox").attr("value", "'" + title.name + "' - From: " + title.url).select();
            }
        }
        /* shift-s */
        if (code == 83) {
            $(".selectedEntry img[alt='Custom Sharing Tool']").click()
        }
        /* shift-u */
        if (code == 85) {
            if (sharebox()) {
                var title = generate_url();
                $(".selectedEntry .sharebox").attr("value", title.url).select();
            }
        }
        /* shift-e */
        if (code == 69) {
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
    if (document.activeElement.tagName != "INPUT") {
        return true;
    }
}

function sharebox() {
    var sharebox = $(".selectedEntry").find(".sharebox");
    if (sharebox.length > 0) {
        sharebox.remove();
    } else {
        $(".selectedEntry .title").after("<input type='text' class='sharebox' readonly>");
        return true;
    }
}
