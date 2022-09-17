import React from 'react'
import TableRow from './tableComponents/TableRow';

const GameTable = (props) => {

    const {topTable, bottomTable, dealt, dealFunc, gameOver, cards} =  props;

    const getBottomCards = () => {
        const middle = topTable.length;
        const bottomCards = Object.fromEntries(
            Object.entries(cards)
                .filter(([k, cardList]) => k >= middle)
                .map(([k, cardList], i) => [i, cardList])
        )
        return bottomCards;
    }

    return (
        <div className='gameTable flexCol gap-1'>
            <TableRow playerList={topTable} gameOver={gameOver} cards={cards} />
            {
                !dealt?
                <button className='dealBtn' onClick={dealFunc}>[ D e a l ]</button>:
                ''
            }
            <TableRow playerList={bottomTable} gameOver={gameOver} cards={ getBottomCards() } />
        </div>
    )
}

export default GameTable