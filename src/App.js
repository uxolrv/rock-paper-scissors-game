import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Home 화면
function Home() {
  return (
    <div>
      <h1>안내면 술래</h1>
      <h1>✌️✊🖐</h1>
      <Link to="/rsp"><button>start</button></Link>
    </div>
  );
}

// Game 화면
function Game() {
    return (
        <div>
            <div className='game_message'>
                <div>안내면</div>
                <input
                type="text"
                defaultValue="술래">
                </input>
                <span>❗️</span>
            </div>
            <div className='game_player'>
                <span>YOU </span>
                <span>COMPUTER</span>
            </div>

        </div>
      );
}




function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/rsp" element={<Game />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
