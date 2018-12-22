import React, { useEffect, useState } from "react";
import { mount } from "enzyme";
// import renderer from "react-test-renderer";
// import Round, { Question } from "./Round";
// import Answer from "./Answer.js";
// import Controls, { Buttons, Confirmation } from "./Controls.js";

// describe("<Round />", () => {
//   it("renders correctly", () => {
//     const tree = renderer.create(<Round />).toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

// describe("<Round />", () => {
//   const wrapper = mount(<Round />);

//   it("renders: Question, Answer and Controls", () => {
//     expect(wrapper.contains(<Question />)).toEqual(true);
//     expect(wrapper.contains(<Answer />)).toEqual(true);
//     expect(wrapper.contains(<Controls />)).toEqual(true);
//   });

//   // it("clicks predict and the confirmation pops-up", () => {
//   //   expect(wrapper.contains(<Buttons />)).toEqual(true);
//   //   expect(wrapper.contains(<Confirmation />)).toEqual(false);
//   //   wrapper.find({ id: "predict" }).simulate("click");
//   //   expect(wrapper.contains(<Confirmation />)).toEqual(true);
//   // });
// });

function useDay() {
  const [d, setDate] = useState(new Date());

  const interval = window.setInterval(() => {
    const newDate = d.setSeconds(d.getSeconds() + 1);
    setDate(new Date(newDate));
  }, 1000);

  return [interval, d.getSeconds()];
}

function TestComponent() {
  const [interval, date] = useDay();

  useEffect(() => {
    return clearInterval(interval);
  });

  return <span>{date}</span>;
}

describe("useDay", () => {
  it("returns the current day", () => {
    const day = new Date().getSeconds(); // current day
    const wrapper = mount(<TestComponent />); // our test component
    expect(wrapper.contains(<span>{day}</span>)).toEqual(true);
  });
});
