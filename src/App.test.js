import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import Round, { Question } from "./Round";
import Answer from "./Answer.js";
import Controls from "./Controls.js";

// describe("<Round />", () => {
//   it("renders correctly", () => {
//     const tree = renderer.create(<Round />).toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

describe("<Round />", () => {
  it("renders: Question, Answer and Controls", () => {
    const wrapper = mount(<Round />);
    expect(wrapper.contains(<Question />)).toEqual(true);
    expect(wrapper.contains(<Answer />)).toEqual(true);
    expect(wrapper.contains(<Controls />)).toEqual(true);
  });
});
