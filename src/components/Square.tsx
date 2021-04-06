/**
 * Typed properties for cell buttons
 */
type SquareProps = {
  squareIndex: number;
  value?: string | null;
  isWinnerCell?: boolean;
  squares: Array<null | string>;
  winningSquares?: Array<number>;
  handleClick(i: number): void;
};
/**
 * Render board cell buttons
 * @param {*} props (Action properties from parent(<Game />) component)
 */
const Square = ({
  isWinnerCell,
  value,
  handleClick,
  squareIndex,
}: SquareProps) => {
  return (
    <button
      className={isWinnerCell ? 'square' : ''}
      onClick={() => handleClick(squareIndex)}
    >
      {value || <span className="btn-placeholder">?</span>}
    </button>
  );
};

export default Square;
