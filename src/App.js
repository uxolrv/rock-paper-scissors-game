import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
${reset}
  * {
  box-sizing : border-box;
  }
  body {
    font-family: 'Do Hyeon', sans-serif;
    color: rgba(0,0,0,0.9)
  }
`;

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
`;

const StartBtn = styled.button`
  background-color: #376efd;
  border: none;
  border-radius: 30px;
  font-family: "Righteous", cursive;
  font-size: 2rem;
  padding: 13px 27px;
  color: white;
  transition: 0.2s;
  margin-top: 20px;

  &:hover {
    background-color: #fdc638;
    font-size: 2.2rem;
  }
`;

const HomeBtn = styled(StartBtn)`
  font-size: 1rem;
  padding: 10px 20px;
  position: absolute;
  bottom: 70px;
  left: 675px;
  &:hover {
    background-color: #fdc638;
    font-size: 1.1rem;
  }
`;

const GamePage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-size: 3.5rem;
`;
const GameMessage = styled.div`
  display: flex;
  align-items: center;
  margin-top: 130px;

  > input {
    text-align: center;
    width: 200px;
    height: 65px;
    margin: 0px 30px;
    border: none;
    border-bottom: 6px solid #376efd;
    font-family: "Do Hyeon", sans-serif;
    font-size: 3.8rem;
    outline: none;
    color: rgba(0, 0, 0, 0.9);
  }
`;

const GamePlayer = styled.div`
  display: flex;
  width: 60%;
  margin-top: 120px;
`;

const You = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 33%;

  .name {
    font-size: 3rem;
    margin-bottom: 40px;
  }

  .choice {
    font-size: 8rem;
  }
`;

const Computer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 33%;

  .name {
    font-size: 3rem;
    margin-bottom: 40px;
  }

  .choice {
    font-size: 8rem;
  }
`;

const Buttons = styled.div`
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Btn = styled.button`
  border: none;
  background: none;
  font-size: 3rem;

  &:hover {
    font-size: 3.5rem;
  }
`;

const GameResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #376efd;
  font-size: 2.3rem;
  width: 33%;

  .score {
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.8);
  }
`;

// Home ??????
function Home() {
  return (
    <HomePage>
      <h1>????????? ??????</h1>
      <h1>?????????????</h1>
      <Link to="/rsp">
        <StartBtn>start</StartBtn>
      </Link>
    </HomePage>
  );
}

// Game ??????
function Game() {
  const [computerChoice, setComputerChoice] = useState("??????");
  const [yourChoice, setYourChoice] = useState("");
  const [yourScore, setYourScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [message, setMessage] = useState("");
  const [blockedBtn, setBlockedBtn] = useState(false); // ?????? ????????????

  const interval = useRef();

  const scores = {
    "???": 1,
    "????": 0,
    "??????": -1,
  };

  /*
  ?????? ??????
  <???>    <???>
  ??????  :  ??????   =>  1 - -1 = 2
   ???  :  ??????   =>   0 - 1 = -1
  ??????  :   ???   =>  -1 - 0 = -1

  ????????? ??????
  <???>    <???>
  ??????  :  ??????   =>  -1 - 1 = -2
  ??????  :  ???    =>   1 - 0 = 1
   ???  :  ??????   =>  0 - -1 = 1
  */

  const changeComputerChoice = () => {
    if (computerChoice === "??????") {
      setComputerChoice("???");
    } else if (computerChoice === "???") {
      setComputerChoice("????");
    } else if (computerChoice === "????") {
      setComputerChoice("??????");
    }
  };

  useEffect(() => {
    interval.current = setInterval(changeComputerChoice, 80);
    return () => {
      clearInterval(interval.current);
    };
  }, [computerChoice]);

  const handleBtnClick = (choice) => {
    clearInterval(interval.current);
    setBlockedBtn(true);
    setYourChoice(choice);
    let difference = scores[choice] - scores[computerChoice];

    if (difference === 0) {
      setMessage("????????????!");
    } else if (difference === -2 || difference === 1) {
      setMessage("?????????!");
      setComputerScore(computerScore + 1);
    } else {
      setMessage("????????????!");
      setYourScore(yourScore + 1);
    }

    // 1??? ??? ?????? ?????? ??????
    setTimeout(() => {
      interval.current = setInterval(changeComputerChoice, 80);
      setBlockedBtn(false);
    }, 1000);
  };

  return (
    <GamePage>
      <GameMessage>
        <div>?????????</div>
        <input type="text" defaultValue="??????"></input>
        <span>??????</span>
      </GameMessage>
      <GamePlayer>
        <You>
          <div className="name">YOU</div>
          <div className="choice">{handleBtnClick ? yourChoice : null}</div>
          <Buttons>
            <Btn disabled={blockedBtn} onClick={(e) => handleBtnClick("??????")}>
              ??????
            </Btn>
            <Btn disabled={blockedBtn} onClick={(e) => handleBtnClick("???")}>
              ???
            </Btn>
            <Btn disabled={blockedBtn} onClick={(e) => handleBtnClick("????")}>
              ????
            </Btn>
          </Buttons>
        </You>
        <GameResult>
          <div>{message}</div>
          <div className="score">
            {yourScore} : {computerScore}
          </div>
        </GameResult>
        <Computer>
          <div className="name">COMPUTER</div>
          <div className="choice">{computerChoice}</div>
        </Computer>
      </GamePlayer>
      <Link to="/">
        <HomeBtn>HOME</HomeBtn>
      </Link>
    </GamePage>
  );
}

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
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
