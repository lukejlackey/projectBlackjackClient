import React from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dash from './components/Dash'
import Game from './components/Game'

function App() {
  return (
    <div className='mainBg'>
      <nav className='navBar'>
        <Link to='/' className='navLink'>Home</Link>
        <Link to='/about' className='navLink'>About</Link>
        <Link to='/leaderboards' className='navLink'>Leaderboards</Link>
        <Link to='/account' className='navLink'>Account</Link>
      </nav>
      <h1 className='mainTitle'>Blackjack Battlegrounds</h1>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dash' element={<Dash/>}/>
        <Route path='/play/:userId' element={<Game/>}/>
        {/* <Route path='/about' element={<About/>}/>
        <Route path='/leaderboards' element={<Leaderboards/>}/>
        <Route path='/account' element={<Account/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
