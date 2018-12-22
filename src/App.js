import React, { useReducer } from "react";
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
  // const [points, addPoint] = usePoints(0);
  const [points, dispatch] = useReducer(pointReducer, initialPoints);

  return (
    <GameContext.Provider value={{ dispatch, model }}>
      <Score points={points} />
      <Round />
      <Round />
      <Round />
    </GameContext.Provider>
  );
}

// function usePoints(initialValue) {
//   const [points, setPoints] = useState(initialValue);
//   const addPoint = () => setPoints(points + 1);

//   return [points, addPoint];
// }

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
