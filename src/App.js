import React, { useState } from "react";
import Controls from "./Controls.js";
import "./App.css";

const GameContext = React.createContext({});

function App({ model }) {
  return (
    <GameContext.Provider value={{ model }}>
      <Question />
      <Total />
      <Controls />
    </GameContext.Provider>
  );
}

function Question() {
  const [num1, num2] = useRandomNumbers();

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

function Total() {
  const [correct, setCorrect] = useState(0);

  return (
    <div className="total">
      <div>
        <h2>{correct} correct.</h2>
        <h2>10 to go!</h2>
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
  if (randomNumber * multiple <= 10) {
    return randomNumber;
  }
  return getRandomNumber(limit, multiple);
}

export default App;
export { GameContext };
