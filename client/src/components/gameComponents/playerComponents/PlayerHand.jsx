import React from 'react'
import FaceUpCard from '../cards/FaceUpCard';
import FaceDownCard from '../cards/FaceDownCard';
import CardSlot from '../cards/CardSlot';

const PlayerHand = (props) => {

    const {cards, playerIndex, showCard} =  props;

    return (
        <div className='playerSpot'>
            {
                cards[playerIndex]?
                cards[playerIndex].map((card, i) => 
                    (showCard || i !== 0)?
                    <FaceUpCard card={card}/>:
                    <FaceDownCard/>
                ):
                <div>
                    <CardSlot/>
                    <CardSlot/>
                </div>
            }
        </div>
    )
}

export default PlayerHand