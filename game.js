import {Board} from 'board';

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
      this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      this._board.print();
      console.log("You lose!");
    }
    else if (!this._board.hasSafeTiles()) {
      this._board.print();
      console.log("You win!");
    }
    else {
      console.log("Current Board: ");
      this._board.print();
    }
  }
}

let game = new Game(3,3,3);
