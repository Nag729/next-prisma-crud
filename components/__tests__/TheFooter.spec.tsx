import { shallow } from "enzyme";
import React from "react";
import TheFooter from "../TheFooter";

describe("TheFooter", () => {
  it("renders", () => {
    const wrapper = shallow(<TheFooter />);
    expect(wrapper).toBeTruthy();
  });

  it("equal link text", () => {
    const wrapper = shallow(<TheFooter />);

    expect(wrapper.find(".footer-text").text()).toEqual("Created by Nag729 😎");

    expect(wrapper.find(".footer-link").text()).toEqual("Nag729 😎");
  });

  it("equal link href", () => {
    const wrapper = shallow(<TheFooter />);
    expect(wrapper.find(".footer-link").props().href).toEqual(
      "https://github.com/Nag729/next-prisma-crud"
    );
  });
});
