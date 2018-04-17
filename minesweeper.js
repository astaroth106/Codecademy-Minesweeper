class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
      this._numberOfBombs = numberOfBombs;
      this._numberOfTiles = (numberOfRows * numberOfColumns);
      this._playerBoard = generatePlayerBoard(numberOfRows, numberOfColumns)
      this._bombBoard = generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs)
  }

  const getPlayerBoard = () => {
    return this._playerBoard;
  };

  function flipTile(rowIndex, columnIndex){
    if(this._playerBoard[rowIndex][columnIndex] === ' '){
      if (this._bombBoard[rowIndex][columnIndex] === 'B'){
        //return "You lose!";
        this._playerBoard[rowIndex][columnIndex] = 'B';
        //return this._playerBoard;
      }
      let numberOfBombs = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      //A bomb may be replaced but we are checking in flipTile()
      this._playerBoard[rowIndex][columnIndex] = numberOfBombs;
    }
    else{
      console.log("This tile has already been flipped!");
    }
    this._numberOfTiles -= 1
    //return this._playerBoard;
  }

  function getNumberOfNeighborBombs(rowIndex, columnIndex){
    let neighborOffsets = [];

    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    for (let i=-1; i<=1; i++){
      for (let j=-1; j<=1; j++){
        if (i === 0 && j === 0){
            continue;
        }
        neighborOffsets.push([rowIndex+i, columnIndex+j]);
      }
    }

    neighborOffsets.forEach((offset) => {
      if(offset[0] >= 0 && offset[1] >= 0 && offset[0] < numberOfRows && offset[1] < numberOfColumns){
        if(bombBoard[offset[0]][offset[1]] == 'B'){
          numberOfBombs++;
        }
      }
    } );

  return numberOfBombs;

  }

  function hasSafeTiles(){
    if(this._numberOfTiles > this._numberOfBombs){
      return true;
    }
    return false;
  }

  function print(board){
    console.log(board.map(row => row.join(' | ')).join('\n'));
  };

}

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  //initialize board with empty spaces
  for(let i=0; i<numberOfRows; i++){
    let row = [];
    for(let j=0; j<numberOfColumns; j++){
      row.push(' ');
    }
    board.push(row);
  }

  return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = generatePlayerBoard(numberOfRows, numberOfColumns);

  //generate bombs in random spots
  for(let i=0; i<numberOfBombs; i++){
      let bombRow = Math.floor( Math.random() * numberOfRows );
      let bombColumn = Math.floor( Math.random() * numberOfColumns );
      //if there is a bomb in the space try again
      if(board[bombRow][bombColumn] == 'B'){
        i--;
        continue;
      }
      board[bombRow][bombColumn] = 'B';
  }
  return board;
}


//print resulting boards
console.log('Player Board: ');
let playerBoard = generatePlayerBoard(3, 4);
printBoard(playerBoard);
console.log('Bomb Board: ');
let bombBoard = generateBombBoard(3, 4, 5);
printBoard(bombBoard);
console.log('Updated Player Board: ');
playerBoard = flipTile(playerBoard, bombBoard, 0, 0);
printBoard(playerBoard);
