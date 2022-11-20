//--\\ Made by Monnapse#7578

// Elements


// Variables
var CurrentImg = 0
var Amount = 150
var CanSwitch = true
var Last = 0

// Animations
function CreateAnimation2(element, style, positionType, positionStart, positionEnding, multiplier = 1, event) {
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

// Get element model
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

var ResetNav = function (NavElement) {
    for (element = 0; element < NavElement.length; element++) {
        NavElement[element].style['background-color'] = 'rgba(255, 255, 255, 0.35)'
    }
}

waitForElm('.model').then(() => {
    // Elements
    var ImagesList = document.getElementsByClassName("ImageList")[0];
    var Images = document.getElementsByClassName("Img");
    var LeftBtn = document.getElementById("left");
    var RightBtn = document.getElementById("right");
    var BottomNav = document.getElementsByClassName("verticalnav");

    // Functions
    var ChangePage = function (direction, num) {
        // Pause videos
        document.querySelectorAll('video').forEach(vid => vid.pause());

        //
        CanSwitch = false

        // Animate
        if (direction == "left") {
            CreateAnimation2(Images[CurrentImg], 'left', '%', 50, 150, 1, function () {
                CanSwitch = true
            })

            // Change Image
            CurrentImg = num;

            CreateAnimation2(Images[CurrentImg], 'left', '%', -50, 50, 1, function () {
                CanSwitch = true
            })
        } else if (direction == "right") {
            CreateAnimation2(Images[CurrentImg], 'left', '%', 50, -150, 1, function () {
                CanSwitch = true
            })

            // Change Image
            CurrentImg = num;

            CreateAnimation2(Images[CurrentImg], 'left', '%', 150, 50, 1, function () {
                CanSwitch = true
            })
        }
    }


    var ChangeNav = function (i) {
        if (CanSwitch) {
            // Variables
            var elemt = BottomNav[i]
            var Current = i //BottomNav.(elemt);

            // Reset
            ResetNav(BottomNav) // Reset all navs background color
            elemt.style['background-color'] = 'rgba(255, 255, 255, 1)' // Change selected nav

            if (Current > Last) {
                ChangePage("right", Current)
            } else if (Current < Last) {
                ChangePage("left", Current)
            }

            Last = Current
        }
    }

    // Move stuff in right position
    for (img = 0; img < Images.length; img++) {
        Images[img].style.left = "150%";
    }
    Images[0].style.left = "50%";

    // Navagation
    ResetNav(BottomNav) // Reset all navs background color
    BottomNav[0].style['background-color'] = 'rgba(255, 255, 255, 1)' // Change selected nav

    // Navagation on side buttons
    LeftBtn.onclick = function () {
        if (CanSwitch && CurrentImg != 0) {
            ChangePage("left", CurrentImg - 1)

            // Change Nav
            ResetNav(BottomNav) // Reset all navs background color
            BottomNav[CurrentImg].style['background-color'] = 'rgba(255, 255, 255, 1)' // Change selected nav
        }
    }
    RightBtn.onclick = function () {
        if (CanSwitch && CurrentImg != Images.length - 1) {
            ChangePage("right", CurrentImg + 1)

            // Change Nav
            ResetNav(BottomNav) // Reset all navs background color
            BottomNav[CurrentImg].style['background-color'] = 'rgba(255, 255, 255, 1)' // Change selected nav
        }
    }

    // Navagation on bottom navagation
    for (elem = 0; elem < BottomNav.length; elem++) {
        BottomNav[elem].addEventListener('click', ChangeNav.bind(this, elem), false);
    }
});

// Get background
var Background = document.getElementsByClassName("background")[0];
var model = document.getElementsByClassName("model")[0];

var ClearModel = function() {
    // Change scroll to auto
    var body = document.getElementsByTagName("body")[0];
    body.style['overflow-y'] = 'auto';

    // Make background and model
    Background.style.display = "none";
    Background.style.visibility = "hidden";

    model.style.display = "none";
    model.style.visibility = "hidden";

    // Change url
    var path = window.location.pathname.split('/');
    window.history.pushState('page3', path[1], "/"+path[1]);
}

Background.onclick = ClearModel

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var imgs = document.getElementsByClassName("Img");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
for (Image = 0; Image < imgs.length; Image++) {
    if (imgs[Image].id == "myImg") {
        imgs[Image].onclick = function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
    }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span1 = document.getElementsByClassName("close1")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function () {
    ClearModel()
}

//When user clicks on background
modal.onclick = function () {
    modal.style.display = "none";
}