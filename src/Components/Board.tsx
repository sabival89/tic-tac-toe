import React from "react";
import {SquareProps} from '../Types/TypeProps'
import Square from "./Square";

/**
 * Handle board's cells display logic
 * @param props 
 * @returns 
 */
const Board: React.FC<SquareProps> = (props) => {

  // Number of cells to display on the game board
  const numberOfCells = 9;

  /**
   * Create cell template and properties
   * @param i 
   * @returns 
   */
  const renderSquare = (i: number) => {
    return <Square value={props.squares[i]} handleClick={() => props.handleClick(i)} squares={[]}/>;
  };

  // Fill game board with the number of generated cells
  const template = Array.from(Array(numberOfCells).keys()).map((elem) => (
    <div className="game-grid-item" key={elem}>
      {renderSquare(elem)}
    </div>
  ));

  return <div className="game-grid-container">{template}</div>;
}

export default Board;
