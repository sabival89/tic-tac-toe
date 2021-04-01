import React from "react";
import {SquareProps} from './TypeProps'

/**
 * Render board cell buttons
 * @param {*} props (Action properties from parent(<Game />) component)
 */
const Square: React.FC<SquareProps> = (props) => {

  const extendHandleClick = (event:any) => {
    props.handleClick(event)
  }

  return (
    <button className="square" onClick={extendHandleClick.bind(this)}>
      {props.value || <span className="btn-placeholder">?</span>}
    </button>
  );
}

export default Square;