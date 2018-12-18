import React, { useContext, useState } from "react";
import { predict } from "./helpers.js";
import { GameContext } from "./App.js";

function Controls({ canvasRef }) {
  const { addPoint, model } = useContext(GameContext);
  const [prediction, setPrediction] = useState();

  const confirmation = (
    <div className="response">
      <h2>Did you mean {prediction}?</h2>
      <div>
        <button
          className="btn-yes"
          onClick={() => {
            setPrediction(null);
            addPoint();
            canvasRef.current
              .getContext("2d")
              .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }}
        >
          Yes
        </button>
        <button
          className="btn-no"
          onClick={() => {
            setPrediction(null);
            canvasRef.current
              .getContext("2d")
              .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }}
        >
          No
        </button>
      </div>
    </div>
  );

  const buttons = (
    <div className="controls">
      <button
        onClick={() => {
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          predict(canvasRef.current, model).then(newPrediction => {
            setPrediction(newPrediction);
          });
        }}
      >
        Predict
      </button>
    </div>
  );

  if (prediction) {
    return confirmation;
  } else {
    return buttons;
  }
}

export default Controls;
