import React from "react";
import Answer from "./Answer.js";
import Controls from "./Controls.js";

const RoundContext = React.createContext({});

function Round() {
  const question = useRandomNumbers();
  let ref = React.createRef();

  return (
    <div className="round-wrapper">
      <Question question={question} />
      <div className="response-wrapper">
        <RoundContext.Provider value={{ question, ref }}>
          <Answer />
          <Controls />
        </RoundContext.Provider>
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
export { RoundContext };
