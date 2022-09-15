import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dash = () => {

    const [numPlayers, setNumPlayers] = useState(1)
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('activeGame');
        if(localStorage.getItem('p_id')) navigate('/dash');
    },[navigate])

    const handleChange = (e) => {
        if(1 > e.target.value || e.target.value > 8) e.target.value = 1;
        setNumPlayers(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://127.0.0.1:5000/play/${localStorage.getItem('p_id')}`,
            {num_of_players : numPlayers}
        )
            .then(res => {
                console.log(res);
                localStorage.setItem('activeGame', 'true')
                navigate(`/play/${localStorage.getItem('p_id')}`);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div className="container" id="greeting">
                <h2 className="subTitle">Welcome Back, {localStorage.getItem('name')}!</h2>
            </div>
            <form className="generalFlex flexCol w-80 gap-1" onSubmit={handleSubmit}>
                <label htmlFor="num_of_players" className="screen w-80">Select Number of Enemies:</label>
                <input type="number" className="screen text-center w-25" defaultValue="1" min="1" max="7" name="num_of_players" id="num_of_players" onInput={handleChange}/>
                <button type="submit" className="screen redBtn">Play Game</button>
            </form>
            <div className="container" id="stats">
                <h2 className="subTitle">Statistics</h2>
                <div className="generalFlex">
                    <div className="w-25">
                        <h3 className="subTitle2">Wins:</h3>
                        <p className="greenText text-center" id="wins">{localStorage.getItem('wins')}</p>
                        <h3 className="subTitle2">Blackjacks:</h3>
                        <p className="greenText text-center" id="blackjacks">{localStorage.getItem('blackjacks')}</p>
                    </div>
                    <div className="w-25">
                        <h3 className="subTitle2">W/L Ratio:</h3>
                        <p className="greenText text-center" id="wl_ratio">TBD</p>
                        <h3 className="subTitle2">Last Game:</h3>
                        <p className="greenText text-center" id="last_game">TBD</p>
                    </div>
                    <div className="w-25">
                        <h3 className="subTitle2">Losses:</h3>
                        <p className="greenText text-center" id="Losses">{localStorage.getItem('losses')}</p>
                        <h3 className="subTitle2">Busts:</h3>
                        <p className="greenText text-center" id="busts">{localStorage.getItem('busts')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dash