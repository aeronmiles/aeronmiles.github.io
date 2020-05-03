
$(document).ready(() =>
{

// --- references
const $doc = $(document);
const $win = $(window);
const $header = $(".header-container");
const $burger = $(".burger");
const $romans = $(".roman-numerals");
// const $logo = $(".am-logo");
// const $nav = $(".nav");
    
/// --- animation
{
    // load handlers
    if (window.location.pathname == "/" && $win.scrollTop() == 0) {
        $header.removeClass("header-slim");
    }
    // index.html header
    {
        if (window.location.pathname == "/" && $romans.css("opacity") > 0) {
            $romans.velocity({opacity:[1, 0]}, { duration: 2000 });
        }
    }

    // fade in
    $("#black-overlay").velocity({ opacity:[0, 1], display: "none" }, { duration: 333, ease: "ease-out-in" })

}


/// --- interaction
{
    
    // burger - nav
    $burger.hover(() => {
        $burger.hovered = true;
        if (!$burger.selected && !IsMobile) $burger.addClass("burger-hover");
    }, () => {
        $burger.hovered = false;
        if (!IsMobile) $burger.removeClass("burger-hover");
    })

    function showNav(show)
    {
        if (show)
        {
            $burger.removeClass("burger-hover");
            $burger.addClass("burger-x");
            $burger.selected = true;
            $header.addClass("header-nav");
        }
        else
        {
            $burger.removeClass("burger-x");
            $burger.selected = false;
            if ($burger.hovered && !IsMobile) $burger.addClass("burger-hover");
            $header.removeClass("header-nav");
        }
    }

    // document clicks
    $doc.click(() => {
        showNav(!$burger.selected && $burger.hovered);
    });

    // scroll
    $win.scroll((e) => {
        // index.html
        if (window.location.pathname == "/")
        {
            if ($win.scrollTop() == 0)
            {
                $header.removeClass("header-slim");
            }
            else
            {
                $header.addClass("header-slim");
            }
        }
        showNav(false);
    });
    
    // keyboard
    {
        $doc.keypress((e) => {
            switch(e.which)
            {
                // `
                case 96:
                    showNav(!$burger.selected)
                    break;
                // 1
                case 49:
                    window.location.href = site.url;
                    break;
                // 2
                case 50:
                    window.location.href = site.url + "/about/";
                    break;
                // 3
                case 51:
                    window.location.href = site.url + "/writing/";
                    break;
                // 4
                case 52:
                    window.location.href = "/about/";
                    break;
                // 5
                case 53:
                    window.location.href = "/about/";
                    break;
            }
        });
    }
}


});
