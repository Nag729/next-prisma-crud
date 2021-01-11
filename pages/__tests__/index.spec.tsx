import { render, screen } from "@testing-library/react";
import * as React from "react";
import Index from "../index";

describe("Index", () => {
  test("renders Index component", () => {
    render(<Index />);

    // next.js img
    expect(screen.getByAltText("Nextjs_logo")).toBeInTheDocument();

    // title
    expect(screen.getByText(/Welcome to CRUD Sample App/)).toBeInTheDocument();

    // title-link
    // FIXME:
    // expect(screen.getByRole("link")).toBeInTheDocument();
  });
});
