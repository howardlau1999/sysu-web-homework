const Direction = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
};

const Move = {
  dr: [-1, 1, 0, 0],
  dc: [0, 0, -1, 1]
};

function move(dir) {
  var puzzle = this.puzzle;
  var PuzzleGame = puzzle.PuzzleGame;
  var border = PuzzleGame.border;
  this.row += Move.dr[dir];
  this.col += Move.dc[dir];
  this.style.marginTop = this.row * (PuzzleGame.block_height + border) + "px";
  this.style.marginLeft = this.col * (PuzzleGame.block_width + border) + "px";
}

function move_to_empty(dir) {
  var puzzle = this.puzzle;
  var PuzzleGame = puzzle.PuzzleGame;
  if (!puzzle.started) return;
  for (const key in Direction) {
    if (Direction.hasOwnProperty(key)) {
      const dir = Direction[key];
      var nr = this.row + Move.dr[dir];
      var nc = this.col + Move.dc[dir];
      if (nr < 0 || nr >= PuzzleGame.level || nc < 0 || nc >= PuzzleGame.level)
        continue;
      if (!puzzle.blocks[nr][nc]) {
        puzzle.blocks[nr][nc] = this;
        puzzle.blocks[this.row][this.col] = null;
        puzzle.empty_row = this.row;
        puzzle.empty_col = this.col;
        this.move(dir);
        return true;
      }
    }
  }
  return false;
}

function shuffle() {
  var puzzle = this;
  var PuzzleGame = this.PuzzleGame;
  var shuffle_times =
    Math.floor(Math.random() * 100) * PuzzleGame.level + 200 * PuzzleGame.level;
  for (var i = 0; i <= shuffle_times; ++i) {
    var nr, nc;
    do {
      var dir = Math.floor(Math.random() * 4);
      nr = puzzle.empty_row + Move.dr[dir];
      nc = puzzle.empty_col + Move.dc[dir];
    } while (
      nr < 0 ||
      nr >= PuzzleGame.level ||
      nc < 0 ||
      nc >= PuzzleGame.level
    );
    puzzle.blocks[nr][nc].move_to_empty();
  }
}

function check_finished() {
  var puzzle = this;
  var PuzzleGame = this.PuzzleGame;
  if (puzzle.blocks[PuzzleGame.level - 1][PuzzleGame.level - 1] || !puzzle.started) return false;
  for (var row = 0; row < PuzzleGame.level; ++row) {
    for (var col = 0; col < PuzzleGame.level; ++col) {
      if (row == PuzzleGame.level - 1 && col == PuzzleGame.level - 1) break;
      if (puzzle.blocks[row][col].block_id != row * PuzzleGame.level + col)
        return false;
    }
  }
  return true;
}

function init(PuzzleGame) {
  var puzzle = document.getElementById("puzzle");
  puzzle.className = "hide";
  PuzzleGame.level = document.getElementById("puzzle-level").value;
  (function() {
    var last;
    while ((last = puzzle.lastChild)) puzzle.removeChild(last);
  })();
  PuzzleGame.block_width = PuzzleGame.width / PuzzleGame.level;
  PuzzleGame.block_height = PuzzleGame.height / PuzzleGame.level;
  PuzzleGame.border = 1;
  
  puzzle.style.width = PuzzleGame.width + "px";
  puzzle.style.height = PuzzleGame.height + "px";
  
  puzzle.blocks = [];
  puzzle.empty_row = PuzzleGame.level - 1;
  puzzle.empty_col = PuzzleGame.level - 1;
  for (var row = 0; row < PuzzleGame.level; ++row) {
    var row_items = [];
    for (var col = 0; col < PuzzleGame.level; ++col) {
      if (row == PuzzleGame.level - 1 && col == PuzzleGame.level - 1) {
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
      block.block_id = row * PuzzleGame.level + col;

      var border = PuzzleGame.border;
      block.style.marginTop = block.row * (PuzzleGame.block_height + border) + "px";
      block.style.marginLeft = block.col * (PuzzleGame.block_width + border) + "px";

      block.move = move;
      block.move_to_empty = move_to_empty;
      block.puzzle = puzzle;

      block.onclick = (e) => {
        if (e.target.move_to_empty()) ++puzzle.steps;
        if (puzzle.check_finished())
          setTimeout(() => {
            alert("You Win! Total steps: " + puzzle.steps);
          }, 200);
      };

      
      row_items.push(block);
      puzzle.appendChild(block);
    }
    puzzle.blocks.push(row_items);
  }
  
  puzzle.shuffle = shuffle;
  puzzle.check_finished = check_finished;
  puzzle.steps = 0;
  puzzle.PuzzleGame = PuzzleGame;
  setTimeout(() => {
    puzzle.className = "show";
    setTimeout(() => {
        puzzle.started = true;
        puzzle.shuffle();
    }, 400)
  }, 500);
}

window.onload = () => {
  var default_init = () => {
    init({
      img_url: "./images/panda.jpg",
      width: 352,
      height: 352
    });
  };
  document.getElementById("restart").addEventListener("click", default_init);
  document.getElementById("puzzle-level").addEventListener("change", default_init);
  default_init();
};
