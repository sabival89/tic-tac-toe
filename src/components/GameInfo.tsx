import React from 'react';
/**
 * Type properties for Gameinfo Component
 */
type GameInfoProps = {
  winner: string | null;
  stepNumber: number;
  player: string;
  dispatch: React.Dispatch<GameStateAction>;
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
  dispatch,
  moves,
}) => {
  /**
   * Determine gameover state
   * @returns BoOlean
   */
  const isGameOver = () => history.length - 1 === 9 && winner === '';

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
        <button onClick={() => dispatch({ type: 'reset' })}>
          <span className="game--info-buttons__reset">&#128472;</span>
        </button>
        <button name="prevMove" onClick={() => dispatch({ type: 'prevMove' })}>
          <span className="game--info-buttons__prev">&#171;</span>
        </button>
        <div
          className="game--info-buttons__moves"
          style={{ display: stepNumber > 0 ? 'block' : 'none' }}
        >
          <ul>{moves}</ul>
        </div>
        <button name="nextMove" onClick={() => dispatch({ type: 'nextMove' })}>
          <span className="game--info-buttons__next">&#187;</span>
        </button>
      </div>
    </div>
  );
};

export default GameInfo;
