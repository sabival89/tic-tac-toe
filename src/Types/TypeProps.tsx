/**
 * Typed properties for cell buttons 
 */
export type SquareProps = {
    value?: string;
    isWinnerCell?: boolean;
    squares: Array<string>;
    position?: Array<number>;
    extendHandleClick?: () => void;
    handleClick: (i: number) => void;
}

/**
 * Type properties for Game component state values
 */
export type GameProps = {
    stepNumberVal: number;
    counterVal: number;
    xIsNextVal: boolean;
    historyVal: Array<{squares: Array<string>}>;
}

/**
 * Type properties for Gameinfo Component
 */
export type GameInfoProps = {
    gameWinner: string;
    stepNumber: number;
    status: string;
    reset: () => void;
    prevMove: () => void;
    nextMove: () => void;
    isGameOver: () => boolean;
    moves: Array<JSX.Element>;
}

/**
 * A type to be used to guard check for functions
 */
export type PlainMethod = {
    func: () => void
}

/**
 * Check whether or not a function return type is True | False
 * @param arg 
 * @returns 
 */
  export const isNotNull = (arg: any): arg is PlainMethod => arg !== null;