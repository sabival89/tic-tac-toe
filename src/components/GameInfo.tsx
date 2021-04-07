import React from 'react';

/**
 * Type properties for Gameinfo Component
 */
type GameInfoProps = {
  winner: string;
  stepNumber: number;
  player: string;
  reset: () => void;
  prevMove: () => void;
  nextMove: () => void;
  history: GameHistory;
  moves: Array<JSX.Element>;
};

/**
 * Render Game Info and Game toolbar buttons
 * @param param0
 * @returns
 */
const GameInfo: React.FC<GameInfoProps> = ({
  winner,
  stepNumber,
  player,
  history,
  prevMove,
  nextMove,
  reset,
  moves,
}) => {
  /**
   * Determine gameover state
   * @returns BoOlean
   */
  const isGameOver = () => {
    return history.length - 1 === 9 && winner === undefined;
  };

  return (
    <div className="game--info">
      <span
        style={{ display: winner ? 'block' : 'none' }}
        className="game--info-winner"
      >
        {winner}
      </span>
      <span
        style={{
          display: player && !isGameOver() ? 'block' : 'none',
        }}
        className="game--info-player"
      >
        {player}
      </span>
      <span
        style={{ display: isGameOver() ? 'block' : 'none' }}
        className="game--info-gameover"
      >
        {isGameOver() && `Game Over`}
      </span>

      <div className="game--info-buttons">
        <button onClick={reset}>
          <span className="game--info-buttons__reset">&#128472;</span>
        </button>
        <button name="prevMove" onClick={prevMove}>
          <span className="game--info-buttons__prev">&#171;</span>
        </button>
        <div
          className="game--info-buttons__moves"
          style={{ display: stepNumber > 0 ? 'block' : 'none' }}
        >
          <ul>{moves}</ul>
        </div>
        <button name="nextMove" onClick={nextMove}>
          <span className="game--info-buttons__next">&#187;</span>
        </button>
      </div>
    </div>
  );
};

export default GameInfo;
