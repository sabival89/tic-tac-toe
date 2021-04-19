/**
 * Type for Game History variables
 */
type GameHistory = Array<{ squares: Array<string> }>;

/**
 * Type for game state properties
 */
type GameState = {
  history: GameHistory;
  xIsNext: boolean;
  stepNumber: number;
  counter: number;
};

/**
 * Type for game state actions
 */
type GameStateAction =
  | { type: 'addMove'; payload: number }
  | { type: 'jumpTo'; payload: number }
  | { type: 'nextMove' }
  | { type: 'prevMove' }
  | { type: 'reset' };

/**
 * Type for 'Winner' properties
 */
type WinnerState = {
  hasWinner: boolean;
  winner: string;
  winningSquares: Array<number>;
};
