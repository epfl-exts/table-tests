import React, { useContext, useState } from "react";
import Answer from "./Answer.js";
import Controls from "./Controls.js";

const RoundContext = React.createContext({});

function Round() {
  const [question, answered, setAnswered] = useQuestion();
  let ref = React.createRef();

  return (
    <div className={answered ? "round-wrapper roll-out-left" : "round-wrapper"}>
      <RoundContext.Provider value={{ question, ref, setAnswered }}>
        <div className="flex-wrapper">
          <Question />
          <Answer />
        </div>
        <Controls />
      </RoundContext.Provider>
    </div>
  );
}

function Question() {
  const { question } = useContext(RoundContext);
  const [num1, num2] = question;
  return (
    <div className="question">
      <span>{num1}</span>
      <h3>x</h3>
      <span>{num2}</span>
      <h3>=</h3>
    </div>
  );
}

function useQuestion() {
  const question = useRandomNumbers();
  const [answered, setAnswered] = useState(false);
  return [question, answered, value => setAnswered(value)];
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
