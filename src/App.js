import React, { useEffect, useState } from "react";
import Answer from "./Answer.js";
import { predict } from "./helpers.js";
import "./App.css";

import { Chart } from "chart.js";

function App({ model }) {
  let ref = React.createRef();

  const [prediction, setPrediction] = useState(0);

  return (
    <div>
      <Question />
      <Answer ref={ref} />
      <Response prediction={prediction} />
      <button
        onClick={() => {
          predict(ref.current, model).then(prediction => {
            setPrediction(prediction);
          });
        }}
      >
        Predict
      </button>
      <button
        onClick={() => {
          ref.current
            .getContext("2d")
            .clearRect(0, 0, ref.current.width, ref.current.height);
        }}
      >
        Clear
      </button>
      <TestChart data={prediction} />
    </div>
  );
}

function Question() {
  return (
    <div className="question-wrapper">
      <div>2</div>
      <div>x</div>
      <div>3</div>
    </div>
  );
}

function Response({ prediction }) {
  return <div className="response-wrapper">{console.table(prediction)}</div>;
}

function TestChart(props) {
  let ref = React.createRef();

  useEffect(() => {
    const ctx = ref.current.getContext("2d");

    var myChart = new Chart(ctx, {
      // The type of chart we want to create
      type: "bar",

      // The data for our dataset
      data: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        datasets: [
          {
            backgroundColor: "#f50057",
            borderColor: "rgb(255, 99, 132)",
            data: props.data
          }
        ]
      }
    });
  });

  return <canvas ref={ref} width="400" height="400" />;
}

export default App;
