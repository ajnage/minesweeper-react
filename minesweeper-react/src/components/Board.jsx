import Cell from "./Cell";

// Render grid of cells
const Board = ({ data, handleCellClick, handleContextMenu }) => {
  return (
    <div className="board">
      {data.map((datarow) =>
        datarow.map((dataitem) => (
          // React requires a unique key for each item when iterating through a list
          <div key={`${dataitem.y}-${dataitem.x}`}>
            <Cell
              onClick={() => handleCellClick(dataitem.y, dataitem.x)} // handle left click
              value={dataitem}
              cMenu={(e) => handleContextMenu(e, dataitem.y, dataitem.x)} // handle right click
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Board;
