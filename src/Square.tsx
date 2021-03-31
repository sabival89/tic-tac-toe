import React from "react";
import {SquareProps} from './TypeProps'

/**
 * Render board cell buttons
 * @param {*} props (Action properties from parent(<Game />) component)
 */
const Square: React.FC<SquareProps> = (props) => {

  const extendHandleClick = (event:any) => {
    console.log(event)
    props.handleClick(event)
  }

  return (

    // <button onClick={clickMe}>Click Me!</button>
    
    <button className="square" onClick={extendHandleClick.bind(this)}>
      {props.value}
    </button>
  );
}

export default Square;