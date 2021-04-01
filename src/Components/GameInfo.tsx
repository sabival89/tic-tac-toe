import React from 'react';
import {GameInfoProps} from '../Types/TypeProps'

/**
 * Render Game Info and Game toolbar buttons
 * @param param0 
 * @returns 
 */
const GameInfo: React.FC<GameInfoProps> = (props) => {
    return (
        <>
            <span style={{display: props.gameWinner ? 'block' : "none"}} className="game-info-status-winner">{props.gameWinner}</span>
            <span style={{display: props.status && !props.isGameOver() ? 'block' : 'none'}} className="game-info-status">{props.status}</span>
            <span style={{display: props.isGameOver() ? 'block' : 'none'}} className="game-info-gameover">{props.isGameOver() &&  `Game Over`}</span>

            <div className="game-info-buttons">
                <button onClick={props.reset}>	
                    <span className="reset">&#128472;<span></span></span>
                </button>
                <button name="prevMove" onClick={props.prevMove}>
                    <span className="prev">&#171;<span></span></span>
                </button>
                <div className="moves-btn" style={{ display: props.stepNumber > 0 ? "block" : "none" }}>
                    <ul>
                    {props.moves}
                    </ul>
                </div>
                <button name="nextMove" onClick={props.nextMove}>
                    <span className="next">&#187;<span></span></span>
                </button>
            </div>
        </>
    )
}

export default GameInfo;