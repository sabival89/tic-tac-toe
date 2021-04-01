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