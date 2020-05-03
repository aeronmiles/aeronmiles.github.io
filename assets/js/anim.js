
$(document).ready(() =>
{
    // references
    const $doc = $(document);
    const $win = $(window);
    const $header = $(".header-container");
    const $burger = $(".burger");
    const $romans = $(".roman-numerals");
    
    // load handlers
    if (window.location.pathname == "/" && $win.scrollTop() == 0) {
        $header.removeClass("header-slim");
    }
    // index.html header
    {
        if (window.location.pathname == "/" && $romans.css("opacity") > 0) {
            $romans.velocity({opacity:[1, 0]}, { duration: 2000 });
            $romans.attr("style", "");
        }
    }
    
});
