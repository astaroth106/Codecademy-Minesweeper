const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

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

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  let neighborOffsets = [];

  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
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

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if(playerBoard[rowIndex][columnIndex] === ' '){
    if (bombBoard[rowIndex][columnIndex] === 'B'){
      //return "You lose!";
      playerBoard[rowIndex][columnIndex] = 'B';
      return playerBoard;
    }
    let numberOfBombs = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
    //A bomb may be replaced but we are checking in flipTile()
    playerBoard[rowIndex][columnIndex] = numberOfBombs;
  }
  else{
    console.log("This tile has already been flipped!");
  }
  return playerBoard;
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
