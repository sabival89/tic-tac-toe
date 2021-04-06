import React from 'react';

/**
 * Type properties for Gameinfo Component
 */
type GameInfoProps = {
  gameWinner: string;
  stepNumber: number;
  status: string;
  reset: () => void;
  prevMove: () => void;
  nextMove: () => void;
  isGameOver: () => boolean;
  moves: Array<JSX.Element>;
};

/**
 * Render Game Info and Game toolbar buttons
 * @param param0
 * @returns
 */
const GameInfo: React.FC<GameInfoProps> = (props) => {
  return (
    <>
      <span
        style={{ display: props.gameWinner ? 'block' : 'none' }}
        className="game--info-winner"
      >
        {props.gameWinner}
      </span>
      <span
        style={{
          display: props.status && !props.isGameOver() ? 'block' : 'none',
        }}
        className="game--info-player"
      >
        {props.status}
      </span>
      <span
        style={{ display: props.isGameOver() ? 'block' : 'none' }}
        className="game--info-gameover"
      >
        {props.isGameOver() && `Game Over`}
      </span>

      <div className="game--info-buttons">
        <button onClick={props.reset}>
          <span className="game--info-buttons__reset">&#128472;</span>
        </button>
        <button name="prevMove" onClick={props.prevMove}>
          <span className="game--info-buttons__prev">&#171;</span>
        </button>
        <div
          className="game--info-buttons__moves"
          style={{ display: props.stepNumber > 0 ? 'block' : 'none' }}
        >
          <ul>{props.moves}</ul>
        </div>
        <button name="nextMove" onClick={props.nextMove}>
          <span className="game--info-buttons__next">&#187;</span>
        </button>
      </div>
    </>
  );
};

export default GameInfo;
