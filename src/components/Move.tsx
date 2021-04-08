/**
 * Type properties for Moves Component
 */
type MoveProps = {
  move: number;
  dispatch: React.Dispatch<Action>;
};

/**
 * Move button Component
 * @param param0
 * @returns
 */
const Moves = ({ move, dispatch }: MoveProps) => {
  return (
    <>
      <li style={{ display: move <= 0 ? 'none' : 'block' }} key={move}>
        <button onClick={() => dispatch({ type: 'jumpTo', payload: move })}>
          {move}
        </button>
      </li>
    </>
  );
};

export default Moves;
