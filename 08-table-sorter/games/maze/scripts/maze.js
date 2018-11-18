function init() {
    var maze = $(".maze")[0];
    var startBlock = $(".start-wrapper")[0];
    var endBlock = $(".end-wrapper")[0];
    var info = $(".info")[0];

    maze.onmouseout = function (event) {
        if (!event) event = window.event;
        var to = event.relatedTarget ? event.relatedTarget : event.toElement;
        if (!this.contains(to)) {
            maze.cheated = true;
            clearBlock();
        }
    }

    var clearBlock = function () {
        $(".wall").removeClass("touched");
    }

    startBlock.onmouseover = function () {
        clearBlock();
        $(info).removeClass("info-display");
        maze.ingame = true;
        maze.cheated = false;
    }

    endBlock.onmouseover = function () {
        if (maze.ingame) {
            if (!maze.cheated) {
                info.innerHTML = "You Win";
            } else {
                info.innerHTML = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
            }
            $(info).addClass("info-display");
        }
        maze.ingame = false;
    }


    $(".wall").mouseover(function () {
        if (maze.ingame) {
            maze.ingame = false;
            $(this).addClass("touched");
            $(info).addClass("info-display");
            info.innerHTML = "You Lose";
        }
    });
}

window.onload = init;