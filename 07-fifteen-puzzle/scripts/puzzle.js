var PuzzleGame = {
    img_url: "./images/mario.jpg",
    level: 4,
    width: 640,
    height: 640,

};
const Direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,

};

const Move = {
    dr: [-1, 1, 0, 0],
    dc: [0, 0, -1, 1]
}

function move(dir) {
    this.row += Move.dr[dir];
    this.col += Move.dc[dir];
    this.style.marginTop = this.row * PuzzleGame.block_height + "px";
    this.style.marginLeft = this.col * PuzzleGame.block_width + "px";
}

function move_to_empty() {
    var puzzle = document.getElementById("puzzle");
    for (const key in Direction) {
        if (Direction.hasOwnProperty(key)) {
            const dir = Direction[key];
            var nr = this.row + Move.dr[dir];
            var nc = this.col + Move.dc[dir];
            if (nr < 0 || nr >= PuzzleGame.level || nc < 0 || nc >= PuzzleGame.level) continue;
            if (puzzle.blocks[nr][nc] == -1) {
                puzzle.blocks[nr][nc] = this.row * PuzzleGame.level + this.col;
                puzzle.blocks[this.row][this.col] = -1;
                puzzle.block_items[nr][nc] = this;
                puzzle.block_items[this.row][this.col] = null;
                puzzle.empty_row = this.row;
                puzzle.empty_col = this.col;
                this.move(dir);
                break;
            }
        }
    }
}

function init() {
    var puzzle = document.getElementById("puzzle");
    (function() {
        var last;
        while (last = puzzle.lastChild) puzzle.removeChild(last);
    })()
    puzzle.style.width = PuzzleGame.width + "px";
    puzzle.style.height = PuzzleGame.height + "px";
    PuzzleGame.block_width = PuzzleGame.width / PuzzleGame.level;
    PuzzleGame.block_height = PuzzleGame.height / PuzzleGame.level;
    puzzle.blocks = [];
    puzzle.block_items = [];
    puzzle.empty_row = PuzzleGame.level - 1;
    puzzle.empty_col = PuzzleGame.level - 1;
    for (var row = 0; row < PuzzleGame.level; ++row) {
        var row_data = [];
        var row_items = [];
        for (var col = 0; col < PuzzleGame.level; ++col) {
            if (row == PuzzleGame.level - 1 && col == PuzzleGame.level - 1) {
                row_data.push(-1);
                row_items.push(null);
                break;
            }
            
            var block = document.createElement("div");
            block.className = "block";
            block.style.width = PuzzleGame.block_width + "px";
            block.style.height = PuzzleGame.block_height + "px";

            block.style.backgroundImage = "url(" + PuzzleGame.img_url + ")";
            block.style.backgroundPositionX = -PuzzleGame.block_width * col + "px";
            block.style.backgroundPositionY = -PuzzleGame.block_height * row + "px";
            block.row = row;
            block.col = col;
            block.style.marginTop = block.row * PuzzleGame.block_height + "px";
            block.style.marginLeft = block.col * PuzzleGame.block_width + "px";

            block.move = move;
            block.move_to_empty = move_to_empty;
            block.onclick = (e) => {
                e.target.move_to_empty();
            }

            row_data.push(col + row * PuzzleGame.level);
            row_items.push(block);
            puzzle.appendChild(block);
        }
        puzzle.block_items.push(row_items);
        puzzle.blocks.push(row_data);
    }
    shuffle();
}

function shuffle() {
    var puzzle = document.getElementById("puzzle");
    var shuffle_times = Math.floor(Math.random() * 100) * PuzzleGame.level + 200 * PuzzleGame.level;
    for (var i = 0; i <= shuffle_times; ++i) {
        var nr, nc;
        do {
            var dir = Math.floor(Math.random() * 4);
            nr = puzzle.empty_row + Move.dr[dir];
            nc = puzzle.empty_col + Move.dc[dir];
        } while (nr < 0 || nr >= PuzzleGame.level || nc < 0 || nc >= PuzzleGame.level);
        puzzle.block_items[nr][nc].move_to_empty();
    }
}

window.onload = init;