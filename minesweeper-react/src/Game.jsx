import "./Game.css";
import { useState, useEffect } from "react";
import GameInfo from "./components/GameInfo";
import Board from "./components/Board";
import {
  filterBoard,
  traverseBoard,
  createEmptyArray,
  plantMines,
  getNeighborMines,
} from "./components/utilities";

const Game = () => {
  // set fixed state values, these could be made into options later
  const [height] = useState(8);
  const [width] = useState(8);
  const [mines] = useState(10);
  // set updateable state values
  const [gameData, setGameData] = useState([]);
  const [gameStatus, setGameStatus] = useState(["Game in Progress"]);
  const [mineCount, setMineCount] = useState(mines);
  const [key, setKey] = useState(false);

  //first, render the game board,
  //plant mines
  //store initial state of the grid in our state variable

  //renders the game board with the cells being hidden
  useEffect(() => {
    setGameData(initGameData(height, width, mines));
  }, [height, width, mines, key]);

  //populates the game data. Includes planting mines randomly and updating the neighbor mines property
  const initGameData = (height, width, mines) => {
    let data = createEmptyArray(height, width); // to initialize an empty array
    data = plantMines(data, height, width, mines); // to place mines, ie randomly change value of some cells from isMine=false to isMine=true
    data = getNeighborMines(data, height, width); // updates neighbor property for each cell
    return data;
  };

  // reveals data at end of game
  const revealBoard = () => {
    let updatedData = gameData.map((row) =>
      row.map((item) => ({ ...item, isRevealed: true }))
    );
    setGameData(updatedData);
  };

  // reveal an empty cell and cascade cells with no adjacent mines
  const revealEmpty = (y, x, data) => {
    let area = traverseBoard(y, x, data, height, width);
    area.forEach((value) => {
      if (
        !value.isFlagged &&
        !value.isRevealed &&
        (value.isEmpty || !value.isMine)
      ) {
        data[value.y][value.x].isRevealed = true;
        if (value.isEmpty) {
          revealEmpty(value.y, value.x, data);
        }
      }
    });
    return data;
  };

  // to handle left click
  const handleCellClick = (y, x) => {
    if (gameData[y][x].isRevealed || gameData[y][x].isFlagged) return;
    if (gameData[y][x].isMine) {
      setGameStatus("You Lost.");
      revealBoard();
      return;
    }
    let updatedData = [...gameData];
    updatedData[y][x].isFlagged = false;
    updatedData[y][x].isRevealed = true;
    if (updatedData[y][x].isEmpty) {
      updatedData = revealEmpty(y, x, updatedData);
    }

    // win condition check : win if all non-mine cells have been clicked and revealed?
    if (
      filterBoard(updatedData, (dataitem) => !dataitem.isRevealed).length ===
      mines
    ) {
      setMineCount(0);
      setGameStatus("You Win!");
      revealBoard();
      return;
    }

    //to render the updated board and mine count
    setGameData(updatedData);

    // win condition check: win if all mine cells have been flagged
    setMineCount(
      mines - filterBoard(updatedData, (dataitem) => dataitem.isFlagged).length
    );
  };

  //to handle right clicks. Passing e, which stands for event, to prevent the default action from happening when right clicking
  const handleContextMenu = (e, y, x) => {
    e.preventDefault();
    console.log("right click");
    if (gameData[y][x].isRevealed) return; // return if cell is already revealed
    let updatedData = [...gameData];
    let mines = mineCount;
    if (updatedData[y][x].isFlagged) {
      // if right clicking on already flagged cell, remove the flag and increase mine count
      updatedData[y][x].isFlagged = false;
      mines++;
    } else {
      // if right clicking and not flagged and not revealed, add flag and reduce mine count
      updatedData[y][x].isFlagged = true;
      mines--;
    }

    // check to see if flags have been put on every single cell that contains mines, then you win
    if (mines === 0) {
      const mineArray = filterBoard(updatedData, (dataitem) => dataitem.isMine);
      const flagArray = filterBoard(
        updatedData,
        (dataitem) => dataitem.isFlagged
      );
      if (JSON.stringify(mineArray) === JSON.stringify(flagArray)) {
        setMineCount(0);
        setGameStatus("You Win!");
        revealBoard();
        return;
      }
    }
    setGameData(updatedData);
    setMineCount(mines);
  };

  //function to reset the game
  const resetGame = () => {
    setGameStatus("Game in Progress");
    setKey(!key); // cheap way to trigger the useEffect hook, to force the game board and the header to rerender
    setMineCount(mines);
  };

  return (
    <div className="game">
      <GameInfo mineCount={mineCount} gameStatus={gameStatus} />
      <Board
        data={gameData}
        handleCellClick={handleCellClick}
        handleContextMenu={handleContextMenu}
      />
      <button className="reset-button" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default Game;
