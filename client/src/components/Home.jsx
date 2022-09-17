import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('activeGame');
        if(localStorage.getItem('p_id')) navigate('/dash');
    },[navigate])

    const navRegister = () => {
        navigate('/register');
    }

    const navLogin = () => {
        navigate('/login');
    }

    return (
        <div className='generalFlex flexCol'>
            <div className='container-gold' id="greeting">
                <h2 className='subTitle'>Welcome to the Battlegrounds!</h2>
                <div className='innerContainer'>
                    <em>
                        -  -  - BEGIN TRANSMISSION -  -  -
                    </em>
                    <p>
                    &emsp; We are glad you're here, merc!
                    Here in the Battlegrounds, you can duke it out with up to 7 enemies in the deadliest game of them all: Blackjack.
                    </p>
                    <p>
                    &emsp; The goal of Blackjack is to have the highest score at the table without going over 21. At the beginning of the game, every player is dealt two cards: 1 face-up and 1 face-down.
                    Each player will then decide whether to receive another card (hit) or not (stand).
                    Once all players are either standing or have a score above 21 (bust), the game is over and the winner is chosen.
                    </p>
                    <p>
                    &emsp; After you create your mercenary, we will set up a droid that fights for you after you leave.
                    That way you can keep racking up the wins while you are away! Good luck, merc!
                    </p>
                    <em>
                        -  -  - END TRANSMISSION -  -  -
                    </em>
                </div>
            </div>
            <div className='generalFlex w-80' id="log_reg_btns">
                <button className='greenBtn screen' onClick={navRegister}>Create Account</button>
                <button className='greenBtn screen' onClick={navLogin}>Login</button>
            </div>
        </div>
    )
}

export default Home