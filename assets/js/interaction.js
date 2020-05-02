$(document).ready(() =>
{
    // references
    const $doc = $(document);
    const $win = $(window);
    const $header = $(".header-container");
    const $burger = $(".burger");
    // const $logo = $(".am-logo");
    // const $nav = $(".nav");

    // load handlers
    if (window.location.pathname == "/" && $win.scrollTop() == 0) {
        $header.removeClass("header-slim");
    }
    
    // burger - nav
    $burger.mouseenter(() => {
        $burger.hovered = true;
        if (!$burger.selected && !IsMobile) $burger.addClass("burger-hover");
    })
    .mouseleave(() => {
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
        $header.addClass("header-slim");
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
    
});
