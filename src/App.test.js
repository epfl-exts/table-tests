import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import Round, { Question } from "./Round";
import Answer from "./Answer.js";
import Controls, { Buttons, Confirmation } from "./Controls.js";

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

describe("useTwoNumbers", ()=>{
  it("renders some numbers", ()=>{
    // test the useTwoNumbers hook here.
  });
});