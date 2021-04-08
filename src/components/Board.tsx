import Square from './Square';

/**
 * Type properties for Board Component
 */
type BoardProps = {
  squares: Array<null | string>;
  winningSquares?: Array<number>;
  dispatch: React.Dispatch<{ type: 'handleClick'; payload: number }>;
};

/**
 * Handle board's cells display logic
 * @param props
 * @returns
 */
const Board = ({ winningSquares, squares, dispatch }: BoardProps) => {
  // Number of cells to display on the game board
  const numberOfCells = 9;

  // Render new Square component
  return (
    <div className="game--board">
      <div className="game--board--grid">
        {Array.from(Array(numberOfCells).keys()).map((squareIndex) => (
          <div className="game--board--grid__item" key={squareIndex}>
            <Square
              value={squares[squareIndex]}
              squareIndex={squareIndex}
              dispatch={dispatch}
              isWinnerCell={winningSquares?.includes(squareIndex)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
