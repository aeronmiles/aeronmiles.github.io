
$(document).ready(() =>
{
    // references
    const $doc = $(document);
    const $win = $(window);
    const $header = $(".header-container");
    const $burger = $(".burger");
    const $romans = $(".roman-numerals");
    
    // index.html header
    {
        if (window.location.pathname == "/" && $romans.css("opacity") > 0) {
            $romans.velocity({opacity:[1, 0]}, { duration: 2000 })
        }
    }
    
});
