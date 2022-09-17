import React from 'react'
import PlayerHand from '../playerComponents/PlayerHand';

const TableRow = (props) => {

    const {playerList, gameOver, cards} =  props;

    return (
        <div className='generalFlex gap-1'>
            {
                playerList.map((player, i) =>
                    <PlayerHand cards={cards} playerIndex={i} showCard={gameOver || player.user_id == localStorage.getItem('p_id')}/>
                )
            }
        </div>
    )
}

export default TableRow