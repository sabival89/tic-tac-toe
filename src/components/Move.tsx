/**
 * Moves Component Props
 */
type MoveProps = {
  move: number;
  jumpTo: (val: number) => void;
};

/**
 * Move button Component
 * @param param0
 * @returns
 */
const Moves = ({ move, jumpTo }: MoveProps) => {
  return (
    <>
      <li style={{ display: move <= 0 ? 'none' : 'block' }} key={move}>
        <button onClick={() => jumpTo(move)}>{move}</button>
      </li>
    </>
  );
};

export default Moves;
