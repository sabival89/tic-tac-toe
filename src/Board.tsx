import React from "react";
import {SquareProps} from './TypeProps'
import Square from "./Square";


const Board: React.FC<SquareProps> = (props) => {
  const renderSquare = (i: number) => {
    return <Square value={props.squares[i]} handleClick={() => props.handleClick(i)} squares={[]}/>;
  };

  const template = Array.from(Array(9).keys()).map((elem) => (
    <div className="game-grid-item" key={elem}>
      {renderSquare(elem)}
    </div>
  ));

  return <div className="game-grid-container">{template}</div>;
}

export default Board;
