import { shallow } from "enzyme";
import NextLink from "next/link";
import React from "react";
import BackToList from "../BackToList";

describe("BackToList", () => {
  it("renders", () => {
    const wrapper = shallow(<BackToList />);
    expect(wrapper).toBeTruthy();
  });

  it("equal link text", () => {
    const wrapper = shallow(<BackToList />);
    expect(wrapper.find(".list-link").text()).toEqual("< Back to list");
  });

  it("equal link href", () => {
    const wrapper = shallow(<BackToList />);
    expect(wrapper.find(NextLink).props().href).toEqual("/list");
  });
});
