import React, { useState } from "react";
import Round from "./Round.js";
import "./App.css";

const GameContext = React.createContext({});

function App({ model }) {
  const [points, addPoint] = usePoints(0);

  return (
    <GameContext.Provider value={{ addPoint, model }}>
      <Score points={points} />
      <Round />
      <Round />
      <Round />
    </GameContext.Provider>
  );
}

function usePoints(initialValue) {
  const [points, setPoints] = useState(initialValue);
  const addPoint = () => setPoints(points + 1);

  return [points, addPoint];
}

function Score({ points }) {
  return (
    <div className="score">
      <div>
        <h2>
          <span className="is-green">{points}</span> correct.
        </h2>
      </div>
    </div>
  );
}

export default App;
export { GameContext };
