
$(document).ready(() =>
{
    document.body.onkeydown = function(e){
        switch(e.keyCode)
        {
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
    }
}
);
