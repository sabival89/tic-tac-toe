import { useEffect, useReducer, useState } from 'react';
import { calculateWinner, createArrayAttributes } from '../utilities/';
import Board from './Board';
import GameInfo from './GameInfo';
import Move from './Move';
import Footer from './Footer';

/**
 * Type for game state properties
 */
type State = {
  history: GameHistory;
  xIsNext: boolean;
  stepNumber: number;
  counter: number;
};

type WinnerProps = {
  winner: string;
  winningSquares: Array<number>;
};

/**
 * Initilization of game state properties
 * @returns
 */
const initialStateProperties: State = {
  history: createArrayAttributes(9),
  xIsNext: true,
  stepNumber: 0,
  counter: 0,
};

/**
 * Inotilization of game winner properties
 */
const winnerProps: WinnerProps = { winner: '', winningSquares: [] };

/**
 * Handle game logic
 * @param state
 * @param action
 * @returns
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // Go to next move
    case 'nextMove': {
      if (state.stepNumber >= state.counter || state.counter === 1)
        return { ...state };

      return {
        ...state,
        stepNumber: state.stepNumber + 1,
        xIsNext: !state.xIsNext,
      };
    }

    // Go to previous move
    case 'prevMove':
      if (state.stepNumber === 0) return { ...state };
      return {
        ...state,
        stepNumber: state.stepNumber - 1,
        xIsNext: !state.xIsNext,
        counter: state.counter,
      };

    // Reset game
    case 'reset':
      return initialStateProperties;

    // Handle each board's cell action when clicked
    case 'handleClick': {
      const current = state.history[state.history.length - 1];
      const squares = [...current.squares];

      // Prevent further cell clicks after winning
      if (calculateWinner(squares) || squares[action.payload])
        return { ...state };

      // Keep record of the squares that have been marked with either X | O
      squares[action.payload] = state.xIsNext ? 'X' : 'O';

      // Update states
      return {
        history: [...state.history, ...[{ squares: squares }]],
        counter: state.history.length,
        stepNumber: state.history.length,
        xIsNext: !state.xIsNext,
      };
    }

    // Update time travel steps with step number
    case 'jumpTo':
      return {
        ...state,
        xIsNext: action.payload % 2 === 0,
        stepNumber: action.payload,
      };
    default:
      throw new Error();
  }
};

/*
 * Handle Game logic
 * @param props
 * @returns
 */
const Game = () => {
  const [{ history, xIsNext, stepNumber }, dispatch] = useReducer<
    (state: State, action: Action) => State
  >(reducer, initialStateProperties);

  const [winningPlayer, setWinningPlayer] = useState(winnerProps);

  // Get the current step from the history
  const current = history[stepNumber];

  // Determine player turns
  const player: string = winningPlayer.winner ? `` : xIsNext ? 'X' : 'O';

  // Track winning player
  useEffect(() => {
    // Get the game winner string and squares
    const { winner, winningSquares }: any = calculateWinner(current.squares);
    setWinningPlayer(() => {
      return {
        winner: winner,
        winningSquares: winningSquares,
      };
    });
  }, [current.squares]);

  /**
   * Back in time 'Move' buttons
   */
  const MovesButtons = history.map((step, move) => (
    <Move key={move} move={move} dispatch={dispatch} />
  ));

  /**
   * Render Component
   */
  return (
    <>
      <h1>Tic Tac Toe</h1>
      <GameInfo
        winner={winningPlayer.winner}
        stepNumber={stepNumber}
        moves={MovesButtons}
        history={history}
        player={player}
        dispatch={dispatch}
      />

      <Board
        squares={current.squares}
        winningSquares={winningPlayer.winningSquares}
        dispatch={dispatch}
      />

      <Footer />
    </>
  );
};

export default Game;
