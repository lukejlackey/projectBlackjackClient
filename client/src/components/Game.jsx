import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import PlayerRow from './gameComponents/PlayerRow';
import GameTable from './gameComponents/GameTable';
import Winners from './gameComponents/Winners';

const Game = React.memo(() => {

    const { userId } = useParams();
    const [dealt, setDealt] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [playerList, setPlayerList] = useState([]);
    const [winners, setWinners] = useState([]);
    const [topTable, setTopTable] = useState([]);
    const [bottomTable, setBottomTable] = useState([]);
    const [cards, setCards] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        userCheck();
        fetchGameData();
        setFetched(!fetched);
    }, [dealt])

    const userCheck = () => {
        if(localStorage.getItem('p_id') !== userId || !localStorage.getItem('activeGame')) navigate('/dash')
        console.log(playerList)
    }

    const fetchGameData = () => {
        axios.get(`http://127.0.0.1:5000/play/${userId}/game`)
        .then(res => {
            console.log(res.data);
            if(res.data.players) {
                setTable(res.data.players);
            }
            else if(res.data.cards) {
                addCards(res.data.cards);
            }
            localStorage.removeItem('activeGame');
        })
        .catch(err => {
            console.log(err);
            navigate(-1);
        })
    }

    const setTable = (players) => {
        setPlayerList(players);
        const middle = Math.floor(players.length / 2);
        setBottomTable(players.slice(0, middle));
        setTopTable(players.slice(middle));
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

    const deal = () => {
        localStorage.setItem('activeGame', 'true');
        setDealt(!dealt);
        console.log(cards)
    }

    const sendMove = (e, move) => {
        e.preventDefault();
        axios.post(`http://127.0.0.1:5000/play/${userId}/game`,{
            move: move
        })
            .then(res => {
                console.log(res);
                addCards(res.data);
                if(res.data.game_over) handleGameOver();
            })
            .catch(err => console.log(err));
    }

    const handleGameOver = () => {
        console.log('GAME OVER')
        setGameOver(true);
        axios.get(`http://127.0.0.1:5000/play/${userId}/game`)
            .then(res => {
                console.log(res);
                const winners = Object.keys(res.data)
                                    .filter((k) => res.data[k] && k != 'winning_score')
                
            })
    }


    return (
        <div className='game flexCol gap-1 w-80'>
            <PlayerRow playerList={topTable} dealt={dealt} gameOver={gameOver} moveFunc={sendMove} />
            <GameTable topTable={topTable} bottomTable={bottomTable} dealt={dealt} dealFunc={deal} gameOver={gameOver} cards={cards}/>
            <PlayerRow playerList={bottomTable} dealt={dealt} gameOver={gameOver} moveFunc={sendMove} />
            {
                gameOver?
                <Winners />:''
            }
        </div>
    )
});

export default Game;