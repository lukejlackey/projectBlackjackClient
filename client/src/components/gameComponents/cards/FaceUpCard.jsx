import React from 'react'

const FaceUpCard = (props) => {

    const { card } =  props;

    return (
        <div className='cardItem greenText'>
            <div className='generalFlex'>
                <p>{card.suit}&emsp;{card.suit}</p>
            </div>
            <div className='generalFlex'>
                <p>{card.string_val}</p>
            </div>
            <div className='generalFlex'>
                <p>{card.suit}&emsp;{card.suit}</p>
            </div>
        </div>
    )
}

export default FaceUpCard