import React from 'react'
import MoveButtons from './MoveButtons'

const PlayerIcon = (props) => {

    const {i, player, dealt, gameOver, moveFunc, isPlayer} =  props;

    return (
        <div key={`player${i}`} className={`screen ${isPlayer? 'userCard' : 'playerCard' }`}>
        <h3 className='subTitle'>{player.name}</h3>
        <div className='generalFlex'>
            <p>Skill lvl: {player.skill_lvl}</p>
            <p>W/L Ratio: {player.wl_ratio}</p>
        </div>
            {
                isPlayer?
                <MoveButtons dealt={dealt} gameOver={gameOver} moveFunc={moveFunc}/>:''
            }
        </div>
    )
}

export default PlayerIcon