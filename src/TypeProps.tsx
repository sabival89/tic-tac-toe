
export type SquareProps = {
    value?: string;
    squares: Array<string>;
    extendHandleClick?: () => void;
    handleClick: (i: number) => void;
}

// [{ squares: Array(9).fill(null) }],

export type GameProps = {
    historyVal: Array<{squares: Array<string>}>;
    stepNumberVal: number;
    counterVal: number;
    xIsNextVal: boolean;
}