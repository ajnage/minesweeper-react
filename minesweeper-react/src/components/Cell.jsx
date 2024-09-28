//gameData
//isRevealed
//hasMine
//hasFlag
//Empty
//Neighbor

// Cell component takes in
// 1) value = properties of cell,
// 2) onClick = left click,
// 3) cMenu = right click
const Cell = ({ value, onClick, cMenu }) => {
  const getValue = () => {
    if (!value.isRevealed) {
      return value.isFlagged ? "🚩" : null; // if not revealed, then flagged or nothing
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.neighbor === 0) {
      // if no neighboring mines, then blank (and revealed)
      return null;
    }
    return value.neighbor; // else return number of beighboring mines
  };

  // chain class names together for display
  let className =
    "cell" +
    (value.isRevealed ? "" : " hidden") +
    (value.isMine ? " is-mine" : "") +
    (value.isFlagged ? " is-flag" : "") +
    (() => {
      switch (value.neighbor) {
        case 1:
          return " blue";
        case 2:
          return " green";
        case 3:
          return " red";
        case 4:
          return " blue";
        default:
          return " purple";
      }
    })();

  return (
    <div onClick={onClick} className={className} onContextMenu={cMenu}>
      {getValue()}
    </div>
  );
};

export default Cell;
