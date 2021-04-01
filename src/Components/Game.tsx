import React, { useState } from "react";
import Board from "./Board";
import { GameProps, isNotNull } from "../Types/TypeProps";
import GameInfo from './GameInfo';
/**
 * Handle Game logic
 * @param props 
 * @returns 
 */
const Game = (props:GameProps) => {
  /**
   * Game's state declarations
   */
  const [history, setHistory] = useState(props.historyVal);
  const [stepNumber, setStepNumber] = useState(props.stepNumberVal);
  const [xIsNext, setXisNext] = useState(props.xIsNextVal);
  const [counter, setCounter] = useState(history.length);

  /**
   * Handle each board's cell action when clicked
   * @param {*} i
   */
  const handleClick = (i: number) => {
    const gameHistory = history.slice(0, stepNumber + 1);
    const current = gameHistory[gameHistory.length - 1];
    const squares = current.squares.slice();
    

    // Prevent further cell clicks after winning
    if (calculateWinner(squares) || squares[i]) return;

    // Determine next player
    squares[i] = xIsNext ? "X" : "O";

    // Update states
    setHistory(gameHistory.concat([{ squares: squares }]));
    setCounter(history.length);
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

    /**
   * Calculate game winner
   * @param {*} squares
   */
  const calculateWinner = (squares: Array<string>) => {
    const lines: Array<Array<number>> = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {winner: squares[a], position: [a,b,c]} ;
      }
    }
    return false;
  }

  // Get total game play history
  const gameHistory = history;

  // Get the current step from the history
  const current = gameHistory[stepNumber];

  // Type guard to ensure return val is not false
  const isNotNullVal = isNotNull(calculateWinner(current.squares));

  // Get the game winner string val
  const {winner, position}: any = isNotNullVal && calculateWinner(current.squares);

  // Generate moves buttons
  const moves = gameHistory.map((step, move) => {
    const desc = move ?  move : ``;
    return (
      <li style={{display: move <= 0 ? 'none' : 'block'}} key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  // Determine player turns
  const status: string = winner ? `` : (xIsNext ? "X" : "O");

  // Determine Winner
  const gameWinner: string = !winner ? `` : `${winner}`;

  // Get current date - To be used in Footer
  const date = new Date();

  /**
   * Determine game over state
   * @returns BoOlean
   */
  const isGameOver = () => {
    return gameHistory.length-1 === 9 && gameWinner === '';
  }

  /**
   * Render UI
   */
  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <div className="game-info">
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

      <div className="game-board">
        <Board squares={current.squares} handleClick={(i) => handleClick(i)} position={position}/>
      </div>

      <div className="footer">
        <span>&copy; {date.getFullYear()}. Game Demo Inc</span>
      </div>
    </div>
  );
};

/**
 * Default state properties and values
 */
Game.defaultProps = {
  historyVal: [{ squares: Array(9).fill(null) }],
  stepNumberVal: 0,
  counterVal: 0,
  xIsNextVal: true
};

export default Game;
