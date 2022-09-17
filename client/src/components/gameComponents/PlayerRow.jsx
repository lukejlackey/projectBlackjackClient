import React from 'react'
import PlayerIcon from './playerComponents/PlayerIcon';

const PlayerRow = (props) => {

    const {playerList, dealt, gameOver, moveFunc} =  props;

    return (
        <div className='generalFlex gap-1 h-25 border-25'>
            {
                playerList.map((p, i) => 
                    <PlayerIcon i={i} player={p} dealt={dealt} gameOver={gameOver} moveFunc={moveFunc} isPlayer={p.user_id == localStorage.getItem('p_id')}/>
                )
            }
        </div>
    )
}

export default PlayerRow