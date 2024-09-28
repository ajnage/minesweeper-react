// creates an empty array
export const createEmptyArray = (height, width) => {
  let data = [];
  for (let i = 0; i < height; i++) {
    data.push([]);
    for (let j = 0; j < width; j++) {
      data[i][j] = {
        y: i,
        x: j,
        isMine: false,
        neighbor: 0,
        isRevealed: false,
        isEmpty: false,
        isFlagged: false,
      };
    }
  }
  return data;
};

// plant mines in random cells in the grid
export const plantMines = (data, height, width, mines) => {
  let randomx,
    randomy,
    minesPlanted = 0;
  while (minesPlanted < mines) {
    randomx = getRandomNumber(width);
    randomy = getRandomNumber(height);
    if (!data[randomy][randomx].isMine) {
      data[randomy][randomx].isMine = true;
      minesPlanted++;
    }
  }
  return data;
};

// sum function to sum up total number of mines around each cell and update neighbor property for each cell component
export const getNeighborMines = (data, height, width) => {
  let updatedData = data;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (!data[i][j].isMine) {
        let mine = 0;
        const area = traverseBoard(
          data[i][j].y,
          data[i][j].x,
          data,
          height,
          width
        );
        area.forEach((value) => {
          if (value.isMine) {
            mine++;
          }
        });
        if (mine === 0) {
          updatedData[i][j].isEmpty = true;
        }
        updatedData[i][j].neighbor = mine;
      }
    }
  }
  return updatedData;
};

export const getRandomNumber = (dimension) => {
  return Math.floor(Math.random() * 1000 + 1) % dimension;
};

// to get properties of cells surrounding the selected cell
export const traverseBoard = (y, x, data, height, width) => {
  const el = [];
  if (x > 0) el.push(data[y][x - 1]); //to get data about cell to the left and checking to see if x>0 to ensure we are not going out of bounds
  if (y < height - 1 && x > 0) el.push(data[y + 1][x - 1]); //to get data about cell to the top left
  if (y < height - 1) el.push(data[y + 1][x]); // to get data about cell on top
  if (y < height - 1 && x < width - 1) el.push(data[y + 1][x + 1]); // to get data about cell on top right
  if (x < width - 1) el.push(data[y][x + 1]); // right
  if (y > 0 && x < width - 1) el.push(data[y - 1][x + 1]); //bottom right
  if (y > 0) el.push(data[y - 1][x]); //bottom
  if (y > 0 && x > 0) el.push(data[y - 1][x - 1]); //bottom left
  console.log(el);
  return el;
};

// function that helps compare whatever checks we want to pass to it. ex: 1) if all non-mine cells have been clicked and/or revealed,  2)
export const filterBoard = (data, checkType) => {
  let resultArray = [];
  data.forEach((datarow) => {
    datarow.forEach((dataitem) => {
      if (checkType(dataitem)) {
        resultArray.push(dataitem);
      }
    });
  });
  return resultArray;
};
