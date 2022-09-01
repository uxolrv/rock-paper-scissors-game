import React, { useState, useEffect, useRef } from 'react';
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
  const [computerChoice, setComputerChoice] = useState("✌️");
  const [yourChoice, setYourChoice] = useState("");
  const [yourScore, setYourScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [message, setMessage] = useState("");
  const [blockedBtn, setBlockedBtn] = useState(false); // 버튼 비활성화

  const interval = useRef();

  const scores = {
    "✊": 1,
    "🖐": 0,
    "✌️": -1
  };


  /*
  지는 경우
  <컴>    <나>
  바위  :  가위   =>  1 - -1 = 2
   보  :  바위   =>   0 - 1 = -1
  가위  :   보   =>  -1 - 0 = -1

  이기는 경우
  <컴>    <나>
  가위  :  바위   =>  -1 - 1 = -2
  바위  :  보    =>   1 - 0 = 1
   보  :  가위   =>  0 - -1 = 1
  */


  const changeComputerChoice = () => {
    if (computerChoice === "✌️") {
      setComputerChoice("✊")
    } else if (computerChoice === "✊") {
      setComputerChoice("🖐")
    } else if (computerChoice === "🖐") {
      setComputerChoice("✌️")
    }
  };


  useEffect(()=>{
    interval.current = setInterval(changeComputerChoice, 80)
    return () => {
      clearInterval(interval.current)
    };
  },[computerChoice])


  const handleBtnClick = (choice) => {
    clearInterval(interval.current);
    setBlockedBtn(true);
    setYourChoice(choice);
    let difference = scores[choice] - scores[computerChoice]

    if(difference === 0) {
      setMessage("비겼어요!")

    } else if (difference === -2 || difference === 1) {
      setMessage("졌어요!")
      setComputerScore(computerScore + 1)

    } else {
      setMessage("이겼어요!")
      setYourScore(yourScore + 1)
    }

    // 1초 후 다시 게임 가능
    setTimeout(() => {
      interval.current = setInterval(changeComputerChoice, 80);
        setBlockedBtn(false)
    }, 1000)
  }

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
              <div className='you'>
                <div>YOU</div>
                <div>{handleBtnClick ? yourChoice : null}</div>
                <button disabled={blockedBtn} onClick={(e) => handleBtnClick("✌️")}>✌️</button>
                <button disabled={blockedBtn} onClick={(e) => handleBtnClick("✊")}>✊</button>
                <button disabled={blockedBtn} onClick={(e) => handleBtnClick("🖐")}>🖐</button>
              </div>
              <div className='com'>
                <div>COMPUTER</div>
                <div>{computerChoice}</div>
              </div>
              <div className='result'>
                <div>{message}</div>
              </div>
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
