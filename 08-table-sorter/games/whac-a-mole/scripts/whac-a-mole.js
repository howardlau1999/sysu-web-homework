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
    var game = document.getElementsByClassName("game")[0];
    var btn = document.getElementsByClassName("game-control")[0];
    var frag = document.createDocumentFragment();

    for (var i = 0; i < 8; ++i) {
        var new_column = document.createElement("div");
        new_column.className = "game-column";
        for (var j = 0; j < 8; ++j) {
            var hole = document.createElement("div");
            hole.className = "hole";

            new_column.appendChild(hole);
        }
        frag.append(new_column)
    }

    var holes = document.getElementsByClassName('hole');

    btn.onclick = startGame();

    game.appendChild(frag);
    var scoreText = document.getElementById('score');
    for (var i = 0; i < holes.length; ++i) {
        holes[i].addEventListener('click', function () {
            if (!game.started) return;
            game.mole_id = Math.floor(Math.random() * holes.length);
            if (!hasClass(this, "mole")) {
                if (game.score > 0)
                    --game.score;
            } else {
                ++game.score;
                removeClass(this, "mole");
                addClass(holes[game.mole_id], "mole");
            }
            scoreText.value = game.score;
        });
    }

    game.started = false;
    game.timer = undefined;
    game.time = 0;
    game.score = 0;
    game.mole_id = undefined;

}

function startGame() {
    var timeText = document.getElementById('time');
    var scoreText = document.getElementById('score');
    var result = document.getElementById('result');
    var holes = document.getElementsByClassName('hole');
    var game = document.getElementsByClassName("game")[0];

    var gameTiming = function () {
        timeText.value = --game.time;

        if (game.time > 0) {
            game.timer = setTimeout(gameTiming, 1000);
        } else {
            game.started = false;
            result.value = "Game Over";
            alert("Gameover!\nScore: " + game.score);
        }
    }

    return function () {
        if (game.timer)
            clearTimeout(game.timer);

        if (game.started == false) {

            for (var i = 0; i < holes.length; ++i)
                removeClass(holes[i], "mole");

            result.value = "Playing";
            game.time = 31;
            scoreText.value = game.score = 0;
            game.mole_id = Math.floor(Math.random() * holes.length);
            addClass(holes[game.mole_id], "mole");

            game.started = true;
            gameTiming();

        } else {
            result.value = "Stop";
            game.started = false;
        }
    };
}

window.onload = init;