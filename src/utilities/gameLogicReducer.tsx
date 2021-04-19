import { calculateWinner, createArrayAttributes } from '.';
/**
 * Handle game logic
 * @param state
 * @param action
 * @returns
 */
const gameLogicReducer = (
  state: GameState,
  action: GameStateAction
): GameState => {
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
      return {
        history: createArrayAttributes(9),
        xIsNext: true,
        stepNumber: 0,
        counter: 0,
      };

    // Handle each board's cell action when clicked
    case 'addMove': {
      const gameHistory = state.history.slice(0, state.stepNumber + 1);
      const current = gameHistory[gameHistory.length - 1];
      const squares = [...current.squares];

      // Prevent further cell clicks after winning
      if (calculateWinner(squares).hasWinner || squares[action.payload])
        return { ...state };

      // Keep record of the squares that have been marked with either X | O
      squares[action.payload] = state.xIsNext ? 'X' : 'O';

      // Update game state
      return {
        history: [...gameHistory, ...[{ squares: squares }]],
        counter: state.history.length,
        stepNumber: gameHistory.length,
        xIsNext: !state.xIsNext,
      };
    }

    // Update time travel steps with step number
    case 'jumpTo': {
      return {
        ...state,
        xIsNext: action.payload % 2 === 0,
        stepNumber: action.payload,
      };
    }
    default:
      throw new Error(`No more actions to handle`);
  }
};

export default gameLogicReducer;
