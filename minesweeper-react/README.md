This is a minesweeper game I built using React components.

The game has 3 main components, with roughly the following hierarchy and layout in Game.jsx;

Game.jsx

- GameInfo
- Board
  - Cell

Game.jsx has the following props initialized and passed to the components
fixed props - height, width, mines
updateable props - gameData, gameStatus, mineCount, and key

What is gameData and what does it return?
returns a nested array of objects with the following structure
[Array[0][0], Array[0][1], Array[0][2],....,Array[0][7]]
.
.
[Array[7][0].....Array[7][7]]

Each Array[y][x] holds an object with a collection of properties. In this case, the properties are - y,x,isMine,neighbor,isRevealed,isEmpty, isFlagged

gameData is created by first creating an empty array with specified height and width. then mines are planted randomly. then neighbor property is updated for each cell (ie neighbor property in the object in the array is updated).

How are mines planted randomly?
get a random number for height and width. for minesPlanted < mines (in this case, 10 total), change the data[y][x].isMine to true and increase the minesPlanted count. return this new data and update the existing data with it.

How does the neighbor property work?
Once mines are planted randomly, the neighbor property counts the mines around each cell and updates the neighbor property to the number of mines around itself. if a cell has a mine, do nothing. if a cell does not have a mine, traverseBoard(). using forEach function loop, certain properties are updated. If there are no neighboring mines, isEmpty is updated to true. If there are neighboring mines, neighbor is set to the total surrounding mines. The updatedData is returned

What is traverseBoard() and what does it return?
traverseBoard() returns an array of objects. The objects hold data of the surrounding cells. ex: for cell[0][0], it will return an array of 3 objects because 3 cells surround cell [0][0].

How is the cascade of cells done in minesweeper?
A recursive function, revealEmpty(), is used for this. The cascade, ie revealEmpty, is only called when an empty cell is left clicked.

Recursion is a technique where a function calls upon itself to break down a problem into more manageable parts. The function continues to call itself until the original problem is solved.

First, for each cell, traverseBoard() is used to return properties of neighboring cells.
Using forEach loop, if cell is notFlagged && notRevealed && (isEmpty OR does_not_have_mine), then isRevealed is set to true. if isEmpty, then call revealEmpty() again. Essentially what this does is, it stops when a cell contains a number in it. If a cell is empty, it continues calling itself. Result is, it gives us the border info around each mine.

Note that isEmpty is by default set to false and gets updated in getNeighborMines() to true when there are no neighbor mines surrounding that cell.

The above highlights the core mechanics of how the game works. Everything else can be understood from reading the code.
