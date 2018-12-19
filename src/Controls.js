import React, { useContext, useState } from "react";
import { predict } from "./helpers.js";
import { GameContext } from "./App.js";
import { RoundContext } from "./Round.js";

function Controls() {
  const [prediction, setPrediction] = useState();

  if (prediction) {
    return (
      <Confirmation prediction={prediction} setPrediction={setPrediction} />
    );
  } else {
    return <Buttons setPrediction={setPrediction} />;
  }
}

function Buttons({ setPrediction }) {
  const { model } = useContext(GameContext);
  const { ref } = useContext(RoundContext);

  return (
    <div className="controls">
      <button onClick={() => clearCanvas(ref)}>Clear</button>
      <button
        onClick={() => {
          predict(ref.current, model).then(newPrediction => {
            setPrediction(newPrediction);
          });
        }}
      >
        Predict
      </button>
    </div>
  );
}

function Confirmation({ prediction, setPrediction }) {
  const { addPoint } = useContext(GameContext);
  const { question, ref, setAnswered } = useContext(RoundContext);

  return (
    <div className="response">
      <h2>Did you mean {prediction}?</h2>
      <div>
        <button
          className="btn-yes"
          onClick={() => {
            setPrediction(null);
            prediction === question ? addPoint() : console.log("Wrong!");
            setAnswered(true);
            ref.current
              .getContext("2d")
              .clearRect(0, 0, ref.current.width, ref.current.height);
          }}
        >
          Yes
        </button>
        <button
          className="btn-no"
          onClick={() => {
            setPrediction(null);
            clearCanvas(ref);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}

function clearCanvas(ref) {
  ref.current
    .getContext("2d")
    .clearRect(0, 0, ref.current.width, ref.current.height);
}

export default Controls;
