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

  // Group of numbers that identify each winning cell
  const position = props.position;

  /**
   * Create cell template and properties
   * @param i 
   * @returns 
   */
  const renderSquare = (i: number) => {
    // Check if any of the cells is part of the winning cell and pass down the boolean value
    const winnerCell: boolean | undefined = position?.filter(item => item === i).length ? true : false;

    return <Square 
              value={props.squares[i]} 
              handleClick={() => props.handleClick(i)} 
              squares={[]} 
              isWinnerCell={winnerCell}
            />;
  };

  // Fill game board with the number of generated cells
  const template = Array.from(Array(numberOfCells).keys()).map((elem) => (
    <div className="game-grid-item" key={elem}>
      {renderSquare(elem)}
    </div>
  ));

 
  // Render new Square component
  return <div className="game-grid-container">{template}</div>;
}

export default Board;
