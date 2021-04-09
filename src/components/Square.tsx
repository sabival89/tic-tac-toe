/**
 * Typed properties for cell buttons
 */
type SquareProps = {
  squareIndex: number;
  value?: string | null;
  isWinnerCell?: boolean;
  dispatch: React.Dispatch<Action>;
};
/**
 * Render board cell buttons
 * @param {*} props (Action properties from parent(<Game />) component)
 */
const Square = ({
  isWinnerCell,
  value,
  dispatch,
  squareIndex,
}: SquareProps) => {
  return (
    <button
      className={isWinnerCell ? 'square' : ''}
      onClick={() => dispatch({ type: 'handleClick', payload: squareIndex })}
    >
      {value || <span className="btn-placeholder">?</span>}
    </button>
  );
};

export default Square;
