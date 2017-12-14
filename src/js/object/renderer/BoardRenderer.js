import { STONE, Board } from '../Board';

const BLOCK_SIZE = 40;
const STONE_SIZE = 30;
const BOARD_X = 40;
const BOARD_Y = 40;

const STONE_COLOR = ["#000000", "#000000", "#ffffff"];

class BoardRenderer {
    constructor(game, col, row) {
        this.game = game;
        this.numCol = col;
        this.numRow = row;
        this.spriteStone = new Array(row);
        for (let i = 0; i < row; i++) {
            this.spriteStone[i] = new Array(col);
        }

        this.bmdBoard = this.createBoardBitmap(this.numRow, this.numCol);
        this.bmdStone = [];
        this.bmdStone[STONE.BLACK] = this.createStoneBitmap(STONE.BLACK);
        this.bmdStone[STONE.WHITE] = this.createStoneBitmap(STONE.WHITE);
    }

    clear() {
        for (let y = 0; y < this.numRow; y++) {
            for (let x = 0; x < this.numCol; x++) {
                if (this.spriteStone[y][x] instanceof Phaser.Sprite) {
                    this.spriteStone[y][x].destroy();
                }
            }
        }
    }

    setBoardPressHandler(callback, context) {
        this.boardPressCallback = callback.bind(context);
    }

    setStonePressHandler(callback, context) {
        this.stonePressCallback = callback.bind(context);
    }

    getStoneX(col) {
        return BOARD_X + BLOCK_SIZE / 2 + BLOCK_SIZE * col;
    }

    getStoneY(row) {
        return BOARD_Y + BLOCK_SIZE / 2 + BLOCK_SIZE * row;
    }

    addBoard() {
        const s = this.game.add.sprite(BOARD_X, BOARD_Y, this.bmdBoard);
        s.inputEnabled = true;
        s.events.onInputDown.add(this.onBoardPress, this);
        this.spriteBoard = s;
    }

    addStone(col, row, stone) {
        const s = this.game.add.sprite(this.getStoneX(col), this.getStoneY(row), this.bmdStone[stone]);
        s.anchor.x = 0.5;
        s.anchor.y = 0.5;
        s.inputEnabled = true;
        s.input.userHandCursor = true;
        s.events.onInputDown.add(this.onStonePress, this, 0, col, row);

        this.spriteStone[row][col] = s;
    }

    onBoardPress(obj, pointer) {
        const p = this.getBoardPositionFromPixel(pointer.x, pointer.y);
        this.boardPressCallback(p.x, p.y);
    }

    onStonePress(obj, pointer, col, row) {
        this.stonePressCallback(col, row);
    }

    removeStone(col, row) {
        this.spriteStone[row][col].destroy();
    }

    createBoardBitmap(row, col) {
        const width = col * BLOCK_SIZE;
        const height = row * BLOCK_SIZE;

        const b = this.game.add.bitmapData(width, height);
        b.fill(0xdb, 0xa0, 0x00);

        let startX = BLOCK_SIZE / 2;
        let startY = BLOCK_SIZE / 2;
        let endX = startX + (col - 1) * BLOCK_SIZE;
        let endY = startY + (row - 1) * BLOCK_SIZE;

        let y = startY;
        // Horizontal line
        for (let i = 0; i < row; i++) {
            b.line(startX, y, endX, y, 0x000000);
            y += BLOCK_SIZE;
        }

        let x = startX;
        // Vertical line
        for (let i = 0; i < col; i++) {
            b.line(x, startY, x, endY, 0x000000);
            x += BLOCK_SIZE;
        }

        return b;
    }

    createStoneBitmap(stone) {
        const b = this.game.add.bitmapData(STONE_SIZE, STONE_SIZE);
        b.circle(STONE_SIZE / 2, STONE_SIZE / 2, STONE_SIZE / 2, STONE_COLOR[stone]);
        return b;
    }

    getBoardPositionFromPixel(x, y) {
        const pos = {};
        x -= BOARD_X;
        y -= BOARD_X;

        pos.x = parseInt(x / BLOCK_SIZE);
        pos.y = parseInt(y / BLOCK_SIZE);

        return pos;
    }
}

export default BoardRenderer;