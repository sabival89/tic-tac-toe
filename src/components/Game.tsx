import { useEffect, useReducer, useState } from 'react';
import {
  calculateWinner,
  createArrayAttributes,
  gameLogicReducer,
} from '../utilities/';
import Board from './Board';
import GameInfo from './GameInfo';
import Move from './Move';
import Footer from './Footer';

/*
 * Handle Game logic
 * @param props
 * @returns
 */
const Game = () => {
  // Initialization of winning state properties
  const [winningPlayer, setWinningPlayer] = useState<{
    winner: string;
    winningSquares: Array<number>;
  }>({ winner: '', winningSquares: [] });

  // Initialization of game board state properties
  const [{ history, xIsNext, stepNumber }, dispatch] = useReducer<
    (state: GameState, action: GameStateAction) => GameState
  >(gameLogicReducer, {
    history: createArrayAttributes(9),
    xIsNext: true,
    stepNumber: 0,
    counter: 0,
  });

  // Get the current step from the history
  const currentStep: { squares: Array<string> } = history[stepNumber];

  // Determine player turns
  const currentPlayer: string = winningPlayer.winner ? `` : xIsNext ? 'X' : 'O';

  // Track winning player
  useEffect(() => {
    // Get the game winner string and squares
    const getWinnerProps: WinnerState = calculateWinner(currentStep.squares);

    // Register winner properties
    setWinningPlayer(() => ({ ...getWinnerProps }));
  }, [currentStep.squares]);

  /**
   * Render Component
   */
  return (
    <>
      <h1>Tic Tac Toe</h1>
      <GameInfo
        winner={winningPlayer.winner}
        stepNumber={stepNumber}
        MovesButtons={history.map((step, move) => (
          <Move key={move} move={move} dispatch={dispatch} />
        ))}
        history={history}
        currentPlayer={currentPlayer}
        dispatch={dispatch}
      />

      <Board
        squares={currentStep.squares}
        winningSquares={winningPlayer.winningSquares}
        dispatch={dispatch}
      />

      <Footer />
    </>
  );
};

export default Game;
