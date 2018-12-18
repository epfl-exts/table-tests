import React, { useContext, useState } from "react";
import Answer from "./Answer.js";
import Controls from "./Controls.js";

function Round() {
  const [question, setQuestion] = useState(useRandomNumbers);
  let ref = React.createRef();

  return (
    <div className="round-wrapper">
      <Question question={question} />
      <div className="response-wrapper">
        <Answer ref={ref} />
        <Controls canvasRef={ref} />
      </div>
    </div>
  );
}

function Question({ question }) {
  return (
    <div className="question">
      {question.map(number => (
        <span>{number}</span>
      ))}
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
  if (randomNumber * multiple < 10) {
    return randomNumber;
  }
  return getRandomNumber(limit, multiple);
}

export default Round;
