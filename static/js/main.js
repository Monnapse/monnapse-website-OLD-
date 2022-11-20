//--\\ Made by MonkeyDev#7578

var sidenav = document.getElementsByClassName("sidenav");
var topnav = document.getElementsByClassName("nav-text"); 
var btn = document.getElementsByClassName("btn"); 

var currentPage = 'home'; // Starting page
var page = 0
var canChange = true;

// Disable loading screen
var WhitelistedPages = ["models","digitalart","projects"]

function changeElementStyle(element,styleType,style) {
    if(element != null) {
        element.style[styleType] = style
    }
}

function CreateAnimation(element, style, positionType, positionStart, positionEnding, multiplier = 1,event) {
    let pos = positionStart;

    function frame1() {
        if (positionStart > positionEnding && pos <= positionEnding || positionStart < positionEnding && pos >= positionEnding) {
            if (event != null) {
                event()
            }
        } else {
            if (positionStart > positionEnding) {
                pos--;
            } else {
                pos++;
            }

            element.style[style] = (pos * multiplier) + positionType;
            window.requestAnimationFrame(frame1);
        }
    }

    window.requestAnimationFrame(frame1);
}

function main(num) {
    if (num != page && num >= 0 && num <= 3 && canChange) {
        canChange = false;

        // Change color
        for (var i = 0; i < sidenav.length; i++) {
            document.getElementById('side-' + i.toString()).style['background-color'] = 'rgba(255, 255, 255, 0.35)';
        }

        sidenav[num].style.backgroundColor = 'rgba(255, 255, 255, 1)';

        // Animate pages
        if (num > page) {
            CreateAnimation(document.getElementById("transition-slide-" + page.toString()), 'top', '%', 0, 100, -1)
            CreateAnimation(document.getElementById("container-" + page.toString()), 'bottom', '%', 0, 50, -1)

            CreateAnimation(document.getElementById("transition-slide-" + num.toString()), 'top', '%', 100, 0, 1,function(){
                canChange = true
            })
            CreateAnimation(document.getElementById("container-" + num.toString()), 'top', '%', 100, 45, 1,)
        } else {
            CreateAnimation(document.getElementById("transition-slide-" + page.toString()), 'top', '%', 0, 100)
            CreateAnimation(document.getElementById("container-" + page.toString()), 'bottom', '%', 0, 50)

            CreateAnimation(document.getElementById("transition-slide-" + num.toString()), 'top', '%', 100, 0, -1,function(){
                canChange = true
            })
            CreateAnimation(document.getElementById("container-" + num.toString()), 'bottom', '%', 100, -45, -1)
        }

        page = num;
    }
};

function createLoader() {
    var loader = document.createElement("div");
    var body = document.getElementsByTagName('body')[0];
    var top = document.getElementsByClassName("top-nav");

    loader.style.position = 'absolute';
    loader.style.backgroundColor = 'rgb(255,255,255)';
    loader.style.height = '100%';
    loader.style.width = '100%';
    loader.style.backgroundSize = 'cover';
    loader.style.zIndex = '10000';
    loader.style['background-image'] = "url('static/media/loadingScreen.png')";
    loader.id = "loading-screen";
    loader.className = "BackgroundImage"

    body.insertBefore(loader,top[0]);

    return loader;
}

function PageNav(element) {
    var loader = document.getElementById("loading-screen");

    currentPage = element.getAttribute("data");
    
    //window.history.pushState({},currentPage, nextURL);
    CreateAnimation(loader, 'left', '%', 100, 0, 1,() => {
        const nextURL = '/'+element.getAttribute("data");
        window.location.replace(nextURL);
    })
}

changeElementStyle(document.getElementById('side-0'),'background-color','rgba(255, 255, 255, 1)')
for (var i = 0; i < sidenav.length; i++) {
    sidenav[i].addEventListener('click', main.bind(this, i), false);
}

for (var i = 0; i < topnav.length; i++) {
    topnav[i].addEventListener('click', PageNav.bind(this, topnav[i]), false);
}

for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', PageNav.bind(this, btn[i]), false);
}

/*
addEventListener('load', (event) => {
    changeElementStyle(document.getElementById(currentPage),'color','rgba(255, 255, 255, 1)')
});
*/

window.addEventListener("DOMContentLoaded", function () {
    var UrlPath = window.location.pathname.split('/');
    var IsWhitelistedPage = false

    // Check if page is in WhitelistedPages
    for(path = 0; path < WhitelistedPages.length; path++) {
        if(UrlPath[1] == WhitelistedPages[path] && UrlPath.length > 2) {
            IsWhitelistedPage = true
        }
    }

    // Do loading screen stuff
    var loader = createLoader();
    if(IsWhitelistedPage == false) {
        CreateAnimation(loader, 'right', '%', 0, 100)
    } else {
        loader.style.right = '100%';
    }
})

document.addEventListener("wheel", event => {
    const delta = Math.sign(event.deltaY);
    main(page + delta)
});

document.addEventListener('keydown', function (event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

    switch (key) {
        case "ArrowUp":
            main(page - 1)
            break;
        case "ArrowDown":
            main(page + 1)
            break;
    }
});