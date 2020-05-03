/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
$(document).ready(() =>
{

    
// --- references
const $doc = $(document);
const $win = $(window);
const $header = $(".header-container");
const $burger = $(".burger");
const $romans = $(".roman-numerals");
const $overlay = $("#overlay");
$overlay.cache();
// const $logo = $(".am-logo");
// const $nav = $(".nav");
    
/// --- animation
{

    // on enable
    if (window.location.pathname == "/" && $win.scrollTop() == 0) {
        $header.removeClass("header-slim");
    }
    // index.html header
    {
        if (window.location.pathname == "/" && $romans.css("opacity") > 0) {
            $romans.velocity({opacity:[1, 0]}, { duration: 3000, delay: 0 });
        }
    }

    // fade in
    $overlay.addClass("t1000ms t-in-out opacity-0");

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
            $overlay.reset().removeClass("z40")
            .addClass("z20 t2000ms t-log opacity-90");
        }
        else
        {
            $burger.removeClass("burger-x");
            $burger.selected = false;
            if ($burger.hovered && !IsMobile) $burger.addClass("burger-hover");
            $header.removeClass("header-nav");
            $overlay.reset()
            .addClass("t1000ms t-in-out opacity-0");
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
