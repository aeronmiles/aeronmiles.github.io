// html class
function toggleClass(self, className) 
{ 
    try
    {
        self.classList.toggle(className); 
    }
    catch(err
    ) {
        console.log(err + " " + self + " : has no class : " + className);
    }
}

function showHideClass(self, show, hide)
{
    show.forEach(x => {
        if (!self.classList.contains(x)) toggleClass(self, x);
    });

    hide.forEach(x => {
        if (self.classList.contains(x)) toggleClass(self, x);
    });
}

function toggleClasses(self, classes) {
    classes.forEach(x => { toggleClass(self, x); });
}

// animation

// queries
var IsMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
