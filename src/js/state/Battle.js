import { STONE, Board } from '../object/Board';

class Battle extends Phaser.State {

    // Route the game to another state. Prepare a set of variables or objects.
    init() { }

    // Load game assets
    preload() {
        console.log('Battle State preload');
        console.log(`width : ${this.game.width}, height: ${this.game.height}`);
        this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE; //NO_SCALE EXACT_FIT SHOW_ALL RESIZE USER_SCALE
    }

    // Load any assets from the Loader
    create() {
        this.stage.backgroundColor = 0x000000;

        this.board = new Board(this.game, 10, 10);

        const clearKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        clearKey.onDown.add(this.clearBoard, this);
    }

    clearBoard() {
        this.board.clear();
    }
}

export default Battle;