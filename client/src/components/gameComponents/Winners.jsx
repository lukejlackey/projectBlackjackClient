import React from 'react'

const Winners = (props) => {

  const { winnerList, playerList } = props;

  return (
    <div className='container'>
      {
        winnerList ?
          <div>
            <h3>Winners:</h3>
            <ul>
              {
                winnerList.map((winnerIndex, i) =>
                  <li>{playerList[winnerIndex].name}</li>
                )
              }
            </ul>
          </div> :
          <h3>No Winners!</h3>
      }
    </div>
  )
}

export default Winners