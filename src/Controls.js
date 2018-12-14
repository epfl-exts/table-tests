import React, { useContext, useEffect, useState } from "react";
import Answer from "./Answer.js";
import { GameContext } from "./App.js";
import { predict } from "./helpers.js";

const ControlsContext = React.createContext({});

function Controls() {
  let ref = React.createRef();
  const [prediction, setPrediction] = useState();

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
  const { prediction } = useContext(ControlsContext);

  useEffect(() => {
    if (typeof prediction === "undefined") {
      console.log("Draw something!");
    } else {
      console.log("Did you mean: " + prediction + "?");
    }
  });

  return (
    <div className="response">
      <h2>Did you mean?</h2>
    </div>
  );
}

export default Controls;
export { ControlsContext };
