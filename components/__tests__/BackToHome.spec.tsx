import { shallow } from "enzyme";
import NextLink from "next/link";
import React from "react";
import BackToHome from "../BackToHome";

describe("BackToHome", () => {
  it("renders", () => {
    const wrapper = shallow(<BackToHome />);
    expect(wrapper).toBeTruthy();
  });

  it("equal link text", () => {
    const wrapper = shallow(<BackToHome />);
    expect(wrapper.find(".home-link").text()).toEqual("< Back to home");
  });

  it("equal link href", () => {
    const wrapper = shallow(<BackToHome />);
    expect(wrapper.find(NextLink).props().href).toEqual("/");
  });
});
