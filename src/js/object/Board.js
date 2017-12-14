import BoardRenderer from './renderer/BoardRenderer';

const STONE = {
    NONE: 0,
    BLACK: 1,
    WHITE: 2
};

class Board {
    constructor(game, col, row) {
        this.game = game;
        this.numCol = col;
        this.numRow = row;
        this.board = new Array(row);
        for (let i = 0; i < row; i++) {
            this.board[i] = new Array(col);
            this.board[i].fill(0);
        }

        this.turn = STONE.BLACK;

        this.boardRenderer = new BoardRenderer(this.game, col, row);
        this.boardRenderer.addBoard();
        this.boardRenderer.setBoardPressHandler(this.onBoardPress, this);
        this.boardRenderer.setStonePressHandler(this.onStonePress, this);
    }

    clear() {
        for (let y = 0; y < this.numRow; y++) {
            this.board[y].fill(0);
        }
        this.boardRenderer.clear();
    }

    placeStone(x, y, stone) {
        this.board[y][x] = stone;
        this.boardRenderer.addStone(x, y, stone);
    }

    removeStone(x, y) {
        this.board[y][x] = STONE.NONE;
        this.boardRenderer.removeStone(x, y);
    }

    checkWin(x, y, stone) {
        let _x = x,
            _y = y,
            count = 0;

        // Horizontal line ← →
        while (_x >= 0 && this.board[y][_x--] == stone) {
            count++;
        }
        _x = x + 1;
        while (_x < this.numCol && this.board[y][_x++] == stone) {
            count++;
        }

        if (count >= 5) return true;


        // Hertical line ↑ ↓
        _x = x;
        _y = y;
        count = 0;
        while (_y >= 0 && this.board[_y--][x] == stone) {
            count++;
        }
        _y = y + 1;
        while (_y < this.numRow && this.board[_y++][x] == stone) {
            count++;
        }
        if (count >= 5) return true;

        // Diagonal ↖ ↘
        _x = x;
        _y = y;
        count = 0;
        while (_x >= 0 && _y >= 0 && this.board[_y--][_x--] == stone) {
            count++;
        }
        _x = x + 1;
        _y = y + 1;
        while (_x < this.numCol && _y < this.numRow && this.board[_y++][_x++] == stone) {
            count++;
        }
        if (count >= 5) return true;

        // Diagonal ↗ ↙
        _x = x;
        _y = y;
        count = 0;
        while (_x < this.numCol && _y >= 0 && this.board[_y--][_x++] == stone) {
            count++;
        }
        _x = x - 1;
        _y = y + 1;
        while (_x >= 0 && _y < this.numRow && this.board[_y++][_x--] == stone) {
            count++;
        }
        if (count >= 5) return true;

        return false;
    }

    onBoardPress(col, row) {
        console.log(`Board Press : ${col}, ${row} ${this.turn}`);
        if (col == 0 && row == 0) {
            this.clear();
            return;
        }
        this.placeStone(col, row, this.turn);
        this.turn = this.turn == STONE.BLACK ? STONE.WHITE : STONE.BLACK;
    }

    onStonePress(col, row) {
        console.log(`Stone Press : ${col}, ${row}`);
        this.removeStone(col, row);
    }

}

export { STONE, Board };