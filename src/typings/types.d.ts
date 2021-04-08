/**
 * Type for Game History variables
 */
type GameHistory = Array<{ squares: Array<null | string> }>;

type Action =
  | { type: 'handleClick'; payload: number }
  | { type: 'jumpTo'; payload: number }
  | { type: 'nextMove' }
  | { type: 'prevMove' }
  | { type: 'reset' };
