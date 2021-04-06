import { useState } from 'react';
import Board from './Board';
import GameInfo from './GameInfo';
import Footer from './Footer';
import { calculateWinner, createArrayAttributes } from '../utilities/';

/**
 * Type properties for Game component state values
 */
type GameProps = {
  historyVal: Array<{ squares: Array<null | string> }>;
  stepNumberVal: number;
  counterVal: number;
  xIsNextVal: boolean;
};

/**
 *
 */
type GameHistory = Array<{ squares: Array<null | string> }>;

/*
 * Handle Game logic
 * @param props
 * @returns
 */
const Game = (
  props: GameProps = {
    historyVal: createArrayAttributes(9),
    stepNumberVal: 0,
    counterVal: 0,
    xIsNextVal: true,
  }
) => {
  /**
   * Game's state declarations
   */
  const [history, setHistory] = useState<GameHistory>(props.historyVal);
  const [stepNumber, setStepNumber] = useState<number>(props.stepNumberVal);
  const [xIsNext, setXisNext] = useState<boolean>(props.xIsNextVal);
  const [counter, setCounter] = useState<number>(history.length);

  /**
   * Handle each board's cell action when clicked
   * @param {*} i
   */
  const handleClick = (squareIndex: number) => {
    const gameHistory = history.slice(0, stepNumber + 1);
    const current = gameHistory[gameHistory.length - 1];
    const squares = [...current.squares];

    console.log(gameHistory, current, squares);

    // Prevent further cell clicks after winning
    if (calculateWinner(squares) || squares[squareIndex]) return;

    // Determine next player
    squares[squareIndex] = xIsNext ? 'X' : 'O';

    // Update states
    setHistory(gameHistory.concat([{ squares: squares }]));
    setCounter(gameHistory.length);
    setStepNumber(gameHistory.length);
    setXisNext((prevXisNext) => !prevXisNext);
  };

  /**
   * Reset game
   */
  const reset = () => {
    setHistory(props.historyVal);
    setCounter(1);
    setStepNumber(props.stepNumberVal);
    setXisNext(props.xIsNextVal);
  };

  /**
   * Go to previous Move
   */
  const prevMove = () => {
    if (stepNumber === 0) return;
    setStepNumber((prevStep) => prevStep - 1);
    setXisNext((next) => !next);
  };

  /**
   * Go to next move
   */
  const nextMove = () => {
    if (stepNumber >= counter || counter === 1) return;
    setStepNumber((prevStep) => prevStep + 1);
    setXisNext((next) => !next);
  };

  /**
   * Update time travel steps with step number
   * @param {*} step
   */
  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  // Get total game play history
  const gameHistory = history;

  // Get the current step from the history
  const current = gameHistory[stepNumber];

  // Type guard to ensure return val is not false
  const isNotNullVal = calculateWinner(current.squares);

  // Get the game winner string val
  const { winner, winningSquares }: any =
    isNotNullVal && calculateWinner(current.squares);

  // Determine player turns
  const status: string = winner ? `` : xIsNext ? 'X' : 'O';

  // Determine Winner
  const gameWinner: string = !winner ? `` : `${winner}`;

  // Get current date - To be used in Footer
  const date = new Date();

  /**
   * Determine game over state
   * @returns BoOlean
   */
  const isGameOver = () => {
    return gameHistory.length - 1 === 9 && gameWinner === '';
  };

  // Generate moves buttons
  const moves = gameHistory.map((step, move) => {
    const desc = move ? move : ``;
    return (
      <li style={{ display: move <= 0 ? 'none' : 'block' }} key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  /**
   * Render UI
   */
  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="game--info">
        <GameInfo
          gameWinner={gameWinner}
          stepNumber={stepNumber}
          moves={moves}
          isGameOver={isGameOver}
          status={status}
          reset={reset}
          prevMove={prevMove}
          nextMove={nextMove}
        />
      </div>

      <div className="game--board">
        <Board
          squares={current.squares}
          handleClick={handleClick}
          winningSquares={winningSquares}
        />
      </div>

      <Footer currentYear={date.getFullYear()} />
    </>
  );
};

/**
 * Default state properties and values
 */
Game.defaultProps = {
  historyVal: createArrayAttributes(9),
  stepNumberVal: 0,
  counterVal: 0,
  xIsNextVal: true,
};

export default Game;
