import React, { useReducer, useState } from "react";
import Round from "./Round.js";
import "./App.css";

const GameContext = React.createContext({});

const initialPoints = 0;

function pointReducer(pointsState, action) {
  switch (action.type) {
    case "reset":
      return initialPoints;
    case "increment":
      return pointsState + 1;
    case "decrement":
      return pointsState - 1;
    default:
      return pointsState;
  }
}

function App({ model }) {
  const [points, dispatch] = useReducer(pointReducer, initialPoints);
  const [rounds, roundsToGo, unhideAllRounds] = useRounds(4);

  const gamePlay = (
    <div>
      <h1>TableTests</h1>
      <div className="score">
        <h2>
          <span className="is-green">{points}</span> correct &amp;&nbsp;
          {roundsToGo} to go!
        </h2>
      </div>
      {rounds}
    </div>
  );

  const playAgain = (
    <div className="response-wrapper">
      <div className="response">
        <h1>
          {points >= rounds.length / 2 ? "You win!" : "You lose."}
          <br />
          <span className="is-green">Play again!</span>
        </h1>
        <button
          onClick={() => {
            dispatch({ type: "reset" }); // reset the score
            unhideAllRounds();
          }}
        >
          <span>&#10157;</span>
        </button>
      </div>
    </div>
  );

  return (
    <GameContext.Provider value={{ dispatch, model }}>
      {roundsToGo !== 0 ? gamePlay : playAgain}
    </GameContext.Provider>
  );
}

function useRounds(initialCount) {
  const [hidden, setHidden] = useState([]);

  const rounds = Array.apply(null, { length: initialCount }).map(
    (round, index) =>
      hidden.includes(index) ? null : (
        <Round
          key={index}
          hideRound={() => {
            setHidden([...hidden, index]);
          }}
        />
      )
  );

  const roundsToGo = initialCount - hidden.length;

  return [rounds, roundsToGo, () => setHidden([])];
}

export default App;
export { GameContext };
