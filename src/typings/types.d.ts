/**
 * Type for Game History variables
 */
type GameHistory = Array<{ squares: Array<string> }>;

type GameStateAction =
  | { type: 'addMove'; payload: number }
  | { type: 'jumpTo'; payload: number }
  | { type: 'nextMove' }
  | { type: 'prevMove' }
  | { type: 'reset' };

type WinnerState = {
  hasWinner: boolean;
  winner: string;
  winningSquares: Array<number>;
};
