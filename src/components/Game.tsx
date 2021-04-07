import { useState } from 'react';
import { calculateWinner, createArrayAttributes } from '../utilities/';
import Board from './Board';
import GameInfo from './GameInfo';
import Move from './Move';
import Footer from './Footer';

/**
 * Type properties for Game component state values
 */
type GameProps = {
  historyVal?: Array<{ squares: Array<null | string> }>;
  stepNumberVal?: number;
  xIsNextVal?: boolean;
};

/*
 * Handle Game logic
 * @param props
 * @returns
 */
const Game = ({
  historyVal = createArrayAttributes(9),
  stepNumberVal = 0,
  xIsNextVal = true,
}: GameProps) => {
  /**
   * Game's state declarations
   */
  const [history, setHistory] = useState<GameHistory>(historyVal);
  const [stepNumber, setStepNumber] = useState<number>(stepNumberVal);
  const [xIsNext, setXisNext] = useState<boolean>(xIsNextVal);
  const [counter, setCounter] = useState<number>(history.length);

  /**
   * Handle each board's cell action when clicked
   * @param {*} i
   */
  const handleClick = (squareIndex: number) => {
    const gameHistory = history.slice(0, stepNumber + 1);
    const current = gameHistory[gameHistory.length - 1];
    const squares = [...current.squares];

    // Prevent further cell clicks after winning
    if (calculateWinner(squares) || squares[squareIndex]) return;

    // Keep record of the squares that have been marked with either X | O
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
    setHistory(historyVal);
    setCounter(1);
    setStepNumber(stepNumberVal);
    setXisNext(xIsNextVal);
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

  // Get the current step from the history
  const current = history[stepNumber];

  // Get the game winner string val
  const { winner, winningSquares }: any = calculateWinner(current.squares);

  // Determine player turns
  const player: string = winner ? `` : xIsNext ? 'X' : 'O';

  /**
   * Back in time 'Move' buttons
   */
  const movesButtons = history.map((step, move) => (
    <Move key={move} jumpTo={jumpTo} move={move} />
  ));

  /**
   * Render UI
   */
  return (
    <>
      <h1>Tic Tac Toe</h1>
      <GameInfo
        winner={winner}
        stepNumber={stepNumber}
        moves={movesButtons}
        history={history}
        player={player}
        reset={reset}
        prevMove={prevMove}
        nextMove={nextMove}
      />

      <Board
        squares={current.squares}
        handleClick={handleClick}
        winningSquares={winningSquares}
      />

      <Footer />
    </>
  );
};

export default Game;
