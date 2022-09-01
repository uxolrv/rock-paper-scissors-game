import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'


const GlobalStyles = createGlobalStyle `
${reset}
  * {
  box-sizing : border-box;
  }
  body {
    font-family: 'Do Hyeon', sans-serif;
    color: rgba(0,0,0,0.9)
  }
`

const HomePage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-size: 4rem;

  > h1 {
    margin-bottom: 18px;
  }
`

const StartBtn = styled.button`
  background-color: #376EFD;
  border: none;
  border-radius: 30px;
  font-family: 'Righteous', cursive;
  font-size: 2rem;
  padding: 13px 27px;
  color: white;
  transition: 0.2s;
  margin-top: 20px;

  &:hover {
    background-color: #FDC638;
  }
`

const HomeBtn = styled(StartBtn) `
  font-size: 1rem;
  padding: 10px 20px;
  margin-top: 90px;
`

const GamePage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-size: 3.5rem;
`
const GameMessage = styled.div`
  display: flex;
  align-items: center;
  margin-top: 150px;

> input {
  text-align: center;
  width: 200px;
  height: 65px;
  margin: 0px 30px;
  border: none;
  border-bottom: 6px solid #376EFD;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 3.8rem;
  outline: none;
  color: rgba(0,0,0,0.9);
}
`

const GamePlayer = styled.div`
  display: flex;
  width: 60%;
  margin-top: 120px;
`

const You = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 33%;

  .name{
    font-size: 3rem;
    margin-bottom: 40px;
  }

  .choice{
    font-size: 8rem;
  }
`

const Computer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 33%;

  .name{
    font-size: 3rem;
    margin-bottom: 40px;
  }

  .choice{
    font-size: 8rem;
  }
`

const Buttons = styled.div`
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Btn = styled.button`
  border: none;
  background: none;
  font-size: 3rem;

  &:hover{
    font-size: 3.5rem;
  }
`

const GameResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #376EFD;
  font-size: 2.3rem;
  width: 33%;

  .score{
    margin-top: 10px;
    color: rgba(0,0,0,0.8)
  }
`


// Home 화면
function Home() {
  return (
    <HomePage>
      <h1>안내면 술래</h1>
      <h1>✌️✊🖐</h1>
      <Link to="/rsp"><StartBtn>start</StartBtn></Link>
    </HomePage>
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
        <GamePage>
            <GameMessage>
                <div>안내면</div>
                <input
                type="text"
                defaultValue="술래">
                </input>
                <span>❗️</span>
            </GameMessage>
            <GamePlayer>
              <You>
                <div className='name'>YOU</div>
                <div className='choice'>{handleBtnClick ? yourChoice : null}</div>
                <Buttons>
                  <Btn disabled={blockedBtn} onClick={(e) => handleBtnClick("✌️")}>✌️</Btn>
                  <Btn disabled={blockedBtn} onClick={(e) => handleBtnClick("✊")}>✊</Btn>
                  <Btn disabled={blockedBtn} onClick={(e) => handleBtnClick("🖐")}>🖐</Btn>
                </Buttons>
              </You>
              <GameResult>
                <div>{message}</div>
                <div className='score'>{yourScore} : {computerScore}</div>
              </GameResult>
              <Computer>
                <div className='name'>COMPUTER</div>
                <div className='choice'>{computerChoice}</div>
              </Computer>
            </GamePlayer>
            <Link to="/"><HomeBtn>HOME</HomeBtn></Link> 
        </GamePage>
      );
}


function App() {
  return (
  <BrowserRouter>
    <GlobalStyles />
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
