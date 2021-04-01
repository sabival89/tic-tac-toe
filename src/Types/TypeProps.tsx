/**
 * Typed properties for cell buttons 
 */
export type SquareProps = {
    value?: string;
    squares: Array<string>;
    extendHandleClick?: () => void;
    handleClick: (i: number) => void;
}

/**
 * Type properties for Game component state values
 */
export type GameProps = {
    historyVal: Array<{squares: Array<string>}>;
    stepNumberVal: number;
    counterVal: number;
    xIsNextVal: boolean;
}

/**
 * Type properties for Gameinfo Component
 */
export type GameInfoProps = {
    gameWinner: string;
    isGameOver: () => boolean;
    status: string;
    reset: () => void;
    prevMove: () => void;
    nextMove: () => void;
    stepNumber: number;
    moves: Array<JSX.Element>;
}