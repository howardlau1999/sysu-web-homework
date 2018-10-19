function hasClass(elem, classname) {
    return elem.className.indexOf(classname) != -1;
}

function addClass(elem, classname) {
    if (elem.className == "") {
        elem.className = classname;
    } else if (!hasClass(elem, classname)) {
        elem.className = elem.className + " " + classname;
    }
}

function removeClass(elem, classname) {
    if (hasClass(elem, classname)) {
        var reg = new RegExp('(\\s*)' + classname + '(\\s*)');
        elem.className = elem.className.replace(reg, ' ');
    }
}

function init() {
    var start = false;
    var inside; 

    var walls = document.getElementsByClassName('wall');
    var maze = document.getElementsByClassName("maze")[0];
    var startBlock = document.getElementsByClassName("start-wrapper")[0];
    var endBlock = document.getElementsByClassName("end-wrapper")[0];
    var info = document.getElementsByClassName("info")[0];

    maze.onmouseout = function (event) {
        if (!event) event = window.event;
        var to = event.relatedTarget ? event.relatedTarget : event.toElement;
        if (!this.contains(to)) {
            inside = false;
            clearBlock();
        }
    }

    var clearBlock = function () {
        for (var i = 0; i < walls.length; ++i)
            removeClass(walls[i], "touched");
    }

    startBlock.onmouseover = function () {
        clearBlock();
        removeClass(info, "info-display"); 
        start = true;
        inside = true;
    }

    endBlock.onmouseover = function () {
        if (start) {
            if (inside) {
                info.innerHTML = "You Win";
            } else {
                info.innerHTML = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
            }
            addClass(info, "info-display");
        }
        start = false;
    }

    for (let i = 0; i < walls.length; ++i) {
        walls[i].onmouseover = function () {
            if (start) {
                start = false;
                addClass(this, "touched");
                addClass(info, "info-display");
                info.innerHTML = "You Lose";
            }
        }
    }
}

window.onload = init;