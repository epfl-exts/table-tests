import React, { useContext, useState } from "react";
import Controls from "./Controls.js";
import "./App.css";

const GameContext = React.createContext({});

function App({ model }) {
  const rounds = 5;
  const [points, setPoints] = useState({ losses: 0, wins: 0 });
  const { losses, wins } = points;
  const [num1, num2] = useRandomNumbers();
  const [question, setQuestion] = useState([num1, num2]);

  const score = (
    <div>
      losses: {losses} --- wins: {wins}
    </div>
  );

  if (losses + wins === rounds && losses < wins) {
    return <h1>You win! ...{score}!</h1>;
  } else if (losses + wins === rounds && losses > wins) {
    return <h1>You lose! {score}...Sukka!</h1>;
  } else {
    return (
      <GameContext.Provider
        value={{ question, rounds, model, points, setPoints, setQuestion }}
      >
        <Question />
        <Points />
        <Controls />
      </GameContext.Provider>
    );
  }
}

function Question() {
  const { question } = useContext(GameContext);
  const [num1, num2] = question;

  return (
    <div className="question">
      <div>
        <h2>{num1}</h2>
      </div>
      <div>
        <h2>x</h2>
      </div>
      <div>
        <h2>{num2}</h2>
      </div>
    </div>
  );
}

function Points() {
  const { rounds, points } = useContext(GameContext);
  const { losses, wins } = points;

  return (
    <div className="total">
      <div>
        <h2>
          {wins} correct. {losses} wrong.
        </h2>
        <h2>{rounds - (losses + wins)} to go!</h2>
      </div>
    </div>
  );
}

function useRandomNumbers() {
  const limit = 9;
  const num1 = getRandomNumber(limit);
  const num2 = getRandomNumber(limit, num1);

  return [num1, num2];
}

function getRandomNumber(limit, multiple = 0) {
  const randomNumber = Math.floor(Math.random() * limit);
  if (randomNumber * multiple < 10) {
    return randomNumber;
  }
  return getRandomNumber(limit, multiple);
}

export default App;
export { GameContext, useRandomNumbers };
