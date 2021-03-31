import React from "react";
import {SquareProps} from './TypeProps'
import Square from "./Square";

// function isDefined(arg:any): arg is SquareProps{
//     return arg.squares !== undefined;
// }

const Board: React.FC<SquareProps> = (props) => {
  const renderSquare = (i: number) => {
    return <Square value={props.squares[i]} handleClick={() => props.handleClick(i)} squares={[]}/>;
  };

  const template = Array.from(Array(9).keys()).map((elem) => (
    <div className="grid-item" key={elem}>
      {renderSquare(elem)}
    </div>
  ));

  return <div className="grid-container">{template}</div>;
}

export default Board;
