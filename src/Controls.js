import React, { useContext, useState } from "react";
import Answer from "./Answer.js";
import { GameContext, useRandomNumbers } from "./App.js";
import { predict } from "./helpers.js";

const ControlsContext = React.createContext({});

function Controls() {
  let ref = React.createRef();
  const [prediction, setPrediction] = useState(null);

  return (
    <ControlsContext.Provider value={{ ref, prediction, setPrediction }}>
      <Answer />
      <Buttons />
      <Response />
    </ControlsContext.Provider>
  );
}

function Buttons() {
  const { ref, setPrediction } = useContext(ControlsContext);
  const { model } = useContext(GameContext);

  return (
    <div className="button-wrapper">
      <button
        onClick={() => {
          ref.current
            .getContext("2d")
            .clearRect(0, 0, ref.current.width, ref.current.height);
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          predict(ref.current, model).then(prediction => {
            setPrediction(prediction);
          });
        }}
      >
        Predict
      </button>
    </div>
  );
}

function Response() {
  const { points, question, setPoints, setQuestion } = useContext(GameContext);
  const [num1, num2] = question;
  const answer = num1 * num2;
  const { wins, losses } = points;

  // This component uses two different contexts!
  const { prediction, ref, setPrediction } = useContext(ControlsContext);

  if (prediction !== null) {
    return (
      <div className="response">
        <h2>Did you mean {prediction}?</h2>
        <button
          onClick={() => {
            const [num1, num2] = useRandomNumbers();
            setQuestion([num1, num2]);

            if (prediction === answer) {
              setPoints({ losses, wins: wins + 1 });
            } else {
              setPoints({ losses: losses + 1, wins });
            }

            setPrediction(null);
            ref.current
              .getContext("2d")
              .clearRect(0, 0, ref.current.width, ref.current.height);
          }}
        >
          Yes
        </button>
        <button
          onClick={() => {
            setPrediction(null);
            ref.current
              .getContext("2d")
              .clearRect(0, 0, ref.current.width, ref.current.height);
          }}
        >
          No
        </button>
      </div>
    );
  } else {
    return null;
  }
}

export default Controls;
export { ControlsContext };
