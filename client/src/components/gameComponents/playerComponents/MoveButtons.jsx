import React from 'react'

const MoveButtons = (props) => {

    const {dealt, gameOver, moveFunc} =  props;

    return (
        <div className='generalFlex'>
            <form className='generalFlex' onSubmit={(e) => moveFunc(e, 0)}>
                <button type='submit' className='actionBtn w-80' disabled={!dealt || gameOver}>HIT</button>
            </form>
            <form className='generalFlex' onSubmit={(e) => moveFunc(e, 1)}>
                <button type='submit' className='actionBtn w-80' disabled={!dealt || gameOver}>STAND</button>
            </form>
        </div>
    )
}

export default MoveButtons