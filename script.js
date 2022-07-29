var user_tags = ['id', 'p_id', 'name', 'email', 'avatar', 'skill_lvl', 'wins', 'losses', 'blackjacks', 'busts', 'wl_ratio']


function initLoad(){
    token = localStorage.getItem('logged_user')
    if( token === null || token === 'false'){
        localStorage.setItem('logged_user', 'false')
    }
    showHome()
}


function showHome(){
    if(localStorage.getItem('logged_user') == 'false'){
        const rspn = document.querySelector( '#response' )
        rspn.innerHTML = `
        <div class="container bg-dark rounded" id="greeting">
            <h2 class="display-2 text-center">Welcome to the Battlegrounds!</h2>
            <div class="container fs-2 text-center">
                <p>
                    -  -  - BEGIN TRANSMISSION -  -  -
                </p>
                <p>
                We are glad you're here, merc!
                Here in the Battlegrounds, you can duke it out with up to 8 enemies in the deadliest game of them all: Blackjack.
                The goal of Blackjack is to have the highest score at the table without going over 21.
                </p>
                <p>
                At the beginning of the game, every player is dealt two cards: 1 face-up and 1 face-down.
                Each player will then decide whether to receive another card (hit) or not (stand).
                Once all players are either standing or have a score above 21 (bust), the game is over and the winner is chosen.
                </p>
                <p>
                After you create your mercenary, we will set up a droid that fights for you after you leave.
                That way you can keep racking up the wins while you are away!
                </p>
                <p>
                Good luck, merc!
                </p>
                <p>
                    -  -  - END TRANSMISSION -  -  -
                </p>
            </div>
        </div>
        <div class="container d-flex" id="log_reg_btns">
            <div class="container py-5 d-flex justify-content-center">
                <button class="btn rounded bg-dark text-warning fs-1" onclick="register('#log_reg_btns')">Create Account</button>
            </div>
            <div class="container py-5 d-flex justify-content-center">
                <button class="btn rounded bg-dark text-warning fs-1" onclick="login('#log_reg_btns')">Login</button>
            </div>
        </div>
        `
    }else{
        showDash()
    }
}

function showDash(){
    const rspn = document.querySelector( '#response' )
    rspn.innerHTML = `
    <div class="container bg-dark rounded" id="greeting">
        <h2 class="display-2 text-center">Welcome Back, ${localStorage.getItem('name')}!</h2>
    </div>
    <form class="container d-flex justify-content-center py-5 gap-4" onsubmit="playGame(event)">
        <div class="d-flex flex-column align-items-center gap-3">
            <label for="num_of_players" class="rounded bg-dark fs-1 text-center px-5">Enemies:</label>
            <input type="number" class="btn rounded bg-dark text-warning fs-2" value="1" min="1" max="8" name="num_of_players" id="num_of_players">
        </div>
        <input type="submit" class="btn rounded bg-dark text-warning fs-1" value="PLAY GAME">
    </form>
    <div class="container bg-dark rounded" id="stats">
        <h2 class="display-2 text-center text-decoration-underline">Statistics</h2>
        <div class="d-flex justify-content-around">
            <div class="container">
                <h3 class="display-5 text-center text-decoration-underline">Wins:</h3>
                <p class="display-5 text-center" id="wins">${localStorage.getItem('wins')}</p>
                <h3 class="display-5 text-center text-decoration-underline">Blackjacks:</h3>
                <p class="display-5 text-center" id="blackjacks">${localStorage.getItem('blackjacks')}</p>
            </div>
            <div class="container">
                <h3 class="display-5 text-center text-decoration-underline">W/L Ratio:</h3>
                <p class="display-5 text-center" id="wl_ratio">TBD</p>
                <h3 class="display-5 text-center text-decoration-underline">Last Game:</h3>
                <p class="display-5 text-center" id="last_game">TBD</p>
            </div>
            <div class="container">
                <h3 class="display-5 text-center text-decoration-underline">Losses:</h3>
                <p class="display-5 text-center" id="Losses">${localStorage.getItem('losses')}</p>
                <h3 class="display-5 text-center text-decoration-underline">Busts:</h3>
                <p class="display-5 text-center" id="busts">${localStorage.getItem('busts')}</p>
            </div>
        </div>
    </div>
    `
}

function showAccount(){
    const rspn = document.querySelector( '#response' )
    rspn.innerHTML = `
    <div class="container bg-dark rounded" id="greeting">
        <h2 class="display-2 text-center">Welcome Back, User!</h2>
    </div>
    <div class="container d-flex justify-content-around py-5">
        <button class="btn rounded bg-dark text-warning fs-1" onclick="playGame(event)">PLAY GAME</button>
    </div>
    <div class="container rounded bg-dark ">

    </div>
    `
}



function login(){
    if(localStorage.getItem('logged_user') == 'false'){
        const rspn = document.querySelector( '#response' )
        rspn.innerHTML = `
        <div class="container mb-4">
            <div class="container bg-dark rounded" id="reg_title">
                <h2 class="display-2 text-center">Login</h2>
            </div>
            <form onsubmit="loginProcess(event)">
                <div class="d-flex flex-column align-items-center">
                    <p class="flash_msgs" id="error_login_creds"></p>
                    <label class="form-label bg-dark rounded fs-1 px-2 my-4 w-50 text-center" for="email">Email:</label>
                    <input class="form-control rounded w-75 fs-2 bg-dark" type="text" name="email" id="email" value="|" onfocus="this.value=''">
                    <p class="flash_msgs" id="error_login_email"></p>
                </div>
                <div class="d-flex flex-column align-items-center">
                    <label class="form-label bg-dark rounded fs-1 px-2 my-4 w-50 text-center" for="password">Password:</label>
                    <input class="form-control w-75 rounded fs-2 bg-dark" type="text" name="password" id="password" value="|" onfocus="this.type='password';this.value=''">
                    <p class="flash_msgs" id="error_login_pw"></p>
                </div>
                    <div class="d-flex flex-column align-items-center py-4">
                    <input type="submit" class="btn bg-dark rounded text-warning fs-1" value="SUBMIT">
                </div>
            </form>
        </div>
        `
    }else{
        showDash()
    }
}

async function loginProcess(event){
    event.preventDefault()
    const flash_msgs = document.querySelectorAll('.flash_msgs')
    for(const msg of flash_msgs){
        msg.innerHTML = ''
    }
    
    const URL = `http://127.0.0.1:5000/login`;
    const data = {
        email : document.querySelector('#email').value,
        password : document.querySelector('#password').value,
    }
    const settings = {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify( data )
    }
    const response = await fetch( URL, settings );
    const user_data = await response.json();
    console.log(user_data)
    if(user_data['logged_user']){
        localStorage.setItem('logged_user', 'true')
        for(const tag of user_tags){
            localStorage.setItem(tag, user_data['logged_user'][tag])
        }
        showDash(event)
    }else{
        for(const grp of user_data['flash_msgs']){
            for(const fm in grp){
                document.querySelector('#' + fm).innerHTML = grp[fm]
            }  
        }
    }        
}

function logout(){
    localStorage.clear()
    localStorage.setItem('logged_user', 'false')
    showHome()
}

function register(){
    if(localStorage.getItem('logged_user') == 'false'){
        const rspn = document.querySelector( '#response' )
        rspn.innerHTML = `
        <div class="container mb-4">
            <div class="container bg-dark rounded" id="reg_title">
                <h2 class="display-2 text-center">Register Your Mercenary</h2>
            </div>
            <form onsubmit="registerProcess(event)">
                <div class="d-flex flex-column align-items-center">
                    <label class="form-label bg-dark rounded fs-1 px-2 my-4 w-50 text-center" for="name">Username:</label>
                    <input class="form-control w-75 rounded fs-2 bg-dark" type="text" name="name" id="name" value="|" onfocus="this.value=''">
                    <p class="flash_msgs" id="error_reg_name"></p>
                </div>
                <div class="d-flex flex-column align-items-center">
                    <label class="form-label bg-dark rounded fs-1 px-2 my-4 w-50 text-center" for="email">Email:</label>
                    <input class="form-control rounded w-75 fs-2 bg-dark" type="text" name="email" id="email" value="|" onfocus="this.value=''">
                    <p class="flash_msgs" id="error_reg_email"></p>
                </div>
                <div class="d-flex flex-column align-items-center">
                    <label class="form-label bg-dark rounded fs-1 px-2 my-4 w-50 text-center" for="password">Password:</label>
                    <input class="form-control w-75 rounded fs-2 bg-dark" type="text" name="password" id="password" value="|" onfocus="this.type='password';this.value=''">
                    <p class="flash_msgs" id="error_reg_pw"></p>
                </div>
                <div class="d-flex flex-column align-items-center">
                    <label class="form-label bg-dark rounded fs-1 px-2 my-4 w-50 text-center" for="confirm_pw">Confirm Password:</label>
                    <input class="form-control w-75 rounded fs-2 bg-dark" type="text" name="confirm_pw" id="confirm_pw" value="|" onfocus="this.type='password';this.value=''">
                    <p class="flash_msgs" id="error_reg_conf_pw"></p>
                </div>
                    <div class="d-flex flex-column align-items-center py-4">
                    <input type="submit" class="btn rounded bg-dark text-warning fs-1" value="SUBMIT">
                </div>
            </form>
        </div>
        `
    }else{
        showDash()
    }
}

async function registerProcess(event){
    event.preventDefault()
    const flash_msgs = document.querySelectorAll('.flash_msgs')
    for(const msg of flash_msgs){
        msg.innerHTML = ''
    }
    
    const URL = `http://127.0.0.1:5000/register`;
    const data = {
        name : document.querySelector('#name').value,
        email : document.querySelector('#email').value,
        password : document.querySelector('#password').value,
        confirm_pw : document.querySelector('#confirm_pw').value
    }
    const settings = {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify( data )
    }
    const response = await fetch( URL, settings );
    const user_data = await response.json();
    if(user_data['logged_user']){
        localStorage.setItem('logged_user', 'true')
        for(const tag of user_tags){
            localStorage.setItem(tag, user_data['logged_user'][tag])
        }
        showDash(event)
    }else{
        for(const grp of user_data['flash_msgs']){
            console.log(grp)
            for(const fm in grp){
                document.querySelector('#' + fm).innerHTML = grp[fm]
            }  
        }
    }
}

function showAccount(){
    if(localStorage.getItem('logged_user') == 'false'){
        login()
    }else{
        const rspn = document.querySelector( '#response' )
        rspn.innerHTML = `
        <div class="container bg-dark rounded" id="greeting">
            <h2 class="display-2 text-center">Welcome Back, User!</h2>
        </div>
        <div class="container d-flex justify-content-around py-5">
            <button class="btn rounded bg-dark text-warning fs-1" onclick="playGame(event)">PLAY GAME</button>
        </div>
        <div class="container bg-dark rounded" id="stats">
            <h2 class="display-2 text-center text-decoration-underline">Statistics</h2>
            <div class="d-flex justify-content-around">
                <div class="container">
                    <h3 class="display-5 text-center text-decoration-underline">Wins:</h3>
                    <p class="display-5 text-center" id="wins">0</p>
                    <h3 class="display-5 text-center text-decoration-underline">Blackjacks:</h3>
                    <p class="display-5 text-center" id="blackjacks">0</p>
                </div>
                <div class="container">
                    <h3 class="display-5 text-center text-decoration-underline">W/L Ratio:</h3>
                    <p class="display-5 text-center" id="wl_ratio">0</p>
                    <h3 class="display-5 text-center text-decoration-underline">Last Game:</h3>
                    <p class="display-5 text-center" id="last_game">0</p>
                </div>
                <div class="container">
                    <h3 class="display-5 text-center text-decoration-underline">Losses:</h3>
                    <p class="display-5 text-center" id="Losses">0</p>
                    <h3 class="display-5 text-center text-decoration-underline">Busts:</h3>
                    <p class="display-5 text-center" id="busts">0</p>
                </div>
            </div>
        </div>
        <div class="container d-flex justify-content-around py-5">
            <button class="btn rounded bg-dark text-warning fs-1" onclick="logout()">Logout</button>
        </div>
        `
    }
}

async function playGame(event){
    event.preventDefault()
    const rspn = document.querySelector( '#response' )

    const URL = `http://127.0.0.1:5000/play/${localStorage.getItem('id')}`;
    const data = {
        num_of_players : document.querySelector('#num_of_players').value
    }
    const settings = {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify( data )
    }
    const response = await fetch( URL, settings );
    const game_players = await response.json();
    console.log(game_players)

    rspn.innerHTML = `
        <div class="container rounded" id="gametable">
        <form id="initDeal" onsubmit="dealCards(event)">
            <input type="submit" value="DEAL" name="deal">
        </form>
        </div>
    `
    const gt = document.querySelector( '#gametable' )
    for(const plr of game_players['players']){
        const new_plr = document.createElement('div')
        new_plr.innerHTML = `
        <div class="container d-flex flex-column align-items-center gap-4">
            <h3>Seat ${plr.seat}</h3>
            <div class="container">
                <div class="container rounded bg-dark" id="seat${plr.seat}">
                    <h4>${plr.name}</h4>
                    <p>Skill lvl: ${plr.skill_lvl}</p>
                    <p>Wins: ${plr.wins} / Losses: ${plr.losses}</p>
                    <p>Blackjacks: ${plr.blackjacks} / Busts: ${plr.busts}</p>
                </div>
                <div class="container rounded bg-dark" id="hand${plr.seat}">
                </div>
            </div>
        </div>
        `
        gt.appendChild(new_plr)
        if(plr.user_id == localStorage.getItem('id')){
            localStorage.setItem('seat', plr.seat)
            const s = document.querySelector( `#seat${plr.seat}` )
            const btns = document.createElement('div')
            btns.innerHTML = `
            <button id="hit" onclick="sendMove(event, 0)">HIT</button>
            <button id="stand" onclick="sendMove(event, 1)">STAND</button>
            `
            s.appendChild(btns)
        }
    }
}

async function dealCards(event){
    event.preventDefault()
    const deal_btn = document.querySelector('#initDeal')
    deal_btn.remove()
    const URL = `http://127.0.0.1:5000/play/${localStorage.getItem('id')}`;
    const settings = {
        method : 'GET',
        headers : {
            'Content-type' : 'application/json'
        }
    }
    const response = await fetch( URL, settings );
    const cards = await response.json();
    console.log(cards)
    for(const c in cards){
        const hand = document.querySelector(`#hand${c}`)
        if(c == localStorage.getItem('seat')){
            hand.innerHTML = `
                <p>${cards[c][0]['string_val']}</p>
                <p>${cards[c][0]['string_val']}</p>
            `
        }else{
            hand.innerHTML = `
                <p>CARD PLACEHOLDER</p>
                <p>${cards[c][0]['string_val']}</p>
            `
        }
    }
}

async function sendMove(event, move){
    event.preventDefault()
    const URL = `http://127.0.0.1:5000/play/${localStorage.getItem('id')}`;
    const data = {
        move : move
    }
    const settings = {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify( data )
    }
    const response = await fetch( URL, settings );
    const cards = await response.json();
    console.log(cards)
    for(const c in cards){
        if(c == 'game_over'){
            console.log('game-over-check')
            if(cards[c] == true){
                console.log('game-over-true')
                const gt = document.querySelector( '#gametable' )
                const game_over = document.createElement('h3')
                game_over.innerText = 'GAME OVER'
                gt.appendChild(game_over)
            }
        }else{
            const hand = document.querySelector(`#hand${c}`)
            if(cards[c] != 'false'){
                const new_card = document.createElement('p')
                new_card.innerText = `${cards[c]['string_val']}`
                hand.appendChild(new_card)
            }else{
                const out_card = document.createElement('h5')
                out_card.innerText = `OUT`
                hand.appendChild(out_card)
            }
        }
    }
}