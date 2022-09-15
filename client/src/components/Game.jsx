import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Game = React.memo(() => {

    const { userId } = useParams();
    const [dealt, setDealt] = useState(false);
    const [playerList, setPlayerList] = useState([]);
    const [cards, setCards] = useState({});
    const [fetched, setFetched] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        userCheck();
        fetchGameData();
        setFetched(!fetched);
    }, [dealt])

    const userCheck = () => {
        if(localStorage.getItem('p_id') !== userId) navigate('/dash')
        if(!localStorage.getItem('activeGame')) navigate('/dash')
    }

    const fetchGameData = () => {
        axios.get(`http://127.0.0.1:5000/play/${userId}/game`)
        .then(res => {
            console.log(res.data);
            if(res.data.players) setPlayerList(res.data.players);
            else if(res.data.cards) {
                addCards(res.data.cards);
            }
        })
        .catch(err => {
            console.log(err);
            navigate(-1);
        })
    }

    const addCards = (newCardObj) => {
        let newCards = newCardObj;
        let newObj = {...cards};
        newCards = Object.keys(newCards)
                        .filter((k) => k != 'game_over')
                        .map((k) => {
                            newObj[k] = cards[k]? cards[k].concat(newCards[k]) : newCards[k];
                            setCards(newObj);
                        });
    }

    const handleGameOver = () => {
        console.log('GAME OVER')
        setGameOver(true);

    }

    const deal = () => {
        setDealt(!dealt);
        console.log(cards)
    }

    const hit = (e) => {
        e.preventDefault();
        axios.post(`http://127.0.0.1:5000/play/${userId}/game`,{
            move:0
        })
            .then(res => {
                console.log(res);
                const result = res.data.game_over? handleGameOver() : addCards(res.data);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='game flexCol gap-1 w-80'>
            <div className='generalFlex gap-1 h-25 border-25'>
                {
                    playerList.filter((p, i) => i < 4).map((p, i) => 
                        <div key={i} className={`screen ${p.user_id == localStorage.getItem('p_id')? 'userCard' : 'playerCard' }`}>
                            <h3 className='subTitle'>{p.name}</h3>
                            <div className='generalFlex'>
                                <p>Skill lvl: {p.skill_lvl}</p>
                                <p>W/L Ratio: {p.wl_ratio}</p>
                            </div>
                            {
                                p.user_id == localStorage.getItem('p_id')?
                                <div className='generalFlex'>
                                    <form className='generalFlex' onSubmit={hit}>
                                        <button type='submit' className='actionBtn w-80' disabled={!dealt || gameOver}>HIT</button>
                                    </form>
                                    <form className='generalFlex'>
                                        <button type='submit' className='actionBtn w-80' disabled={!dealt || gameOver}>STAND</button>
                                    </form>
                                </div>:''
                            }
                        </div>
                    )
                }
            </div>
            <div className='gameTable flexCol gap-1'>
                {  
                    <div className='generalFlex gap-1'>
                        {
                            playerList.filter((p, i) => i < 4).map((player, i) =>
                                <div className='playerSpot'>
                                    {
                                        cards[i]?
                                        cards[i].map((card, i) => 
                                            i === 0?
                                            <div className='cardBack'>
                                                <p>B B</p>
                                            </div>:
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
                                        ):
                                        <div className='cardSpot'><p>HAND</p></div>
                                    }
                                </div>
                            )
                        }
                    </div>
                }
                {
                    !dealt?
                    <button className='redBtn screen' onClick={deal}>Deal</button>:
                    ''
                }
                {
                    playerList.length > 4?
                    <div className='generalFlex gap-1'>
                        {
                            playerList.filter((p, i) => i >= 4).map((player, i) =>
                                <div className='playerSpot'>
                                    {
                                        cards[playerList.indexOf(player)]?
                                        cards[playerList.indexOf(player)].map((card, i) => 
                                            i === 0?
                                            <div className='cardBack'>
                                                <p>B B</p>
                                            </div>:
                                            <div className='cardItem greenText'>
                                                <p>{card.suit}&emsp;{card.suit}</p>
                                                <p>{card.string_val}</p>
                                                <p>{card.suit}&emsp;{card.suit}</p>
                                            </div>
                                        ):
                                        <div className='cardSpot'></div>
                                    }
                                </div>
                            )
                        }
                    </div>:
                    ''
                }
            </div>
            {
                playerList.length > 4?
                <div className='generalFlex gap-1 h-25 border-25'>
                    {
                        playerList.filter((p, i) => i >= 4).map((p, i) => 
                            <div key={i} className={`screen ${p.user_id == localStorage.getItem('p_id')? 'userCard' : 'playerCard' }`}>
                                <h3 className='subTitle'>{p.name}</h3>
                                <div className='generalFlex'>
                                    <p>Skill lvl: {p.skill_lvl}</p>
                                    <p>W/L Ratio: {p.wl_ratio}</p>
                                </div>
                                {
                                    p.user_id == localStorage.getItem('p_id')?
                                    <div className='generalFlex'>
                                        <form className='generalFlex' onSubmit={hit}>
                                            <button type='submit' className='actionBtn w-80' disabled={!dealt}>HIT</button>
                                        </form>
                                        <form className='generalFlex'>
                                            <button type='submit' className='actionBtn w-80' disabled={!dealt}>STAND</button>
                                        </form>
                                    </div>:''
                                }
                            </div>
                        )
                    }
                </div>:
                ''
            }
        </div>
    )
});

export default Game;