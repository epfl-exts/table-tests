import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as tf from "@tensorflow/tfjs";
import * as serviceWorker from "./serviceWorker";

async function loadModel() {
  console.log("Model loading...");
  // load the model using a HTTPS request (where you have stored your model files)
  return await tf
    .loadLayersModel("/table-tests/model/model.json")
    .then(console.log("Loaded."));
}

ReactDOM.render(<App model={loadModel()} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
