/*
This is a basic test demonstrating how to test individual components in the application.
*/

import React from "react";
import NYCSchoolsHome from "../NYCSchoolsHome";
import { render, screen } from "@testing-library/react";
import { http } from "msw";
import "@testing-library/jest-dom";

describe("<NYCSchoolsHome />", () => {
  beforeEach(() => {
    http.get("/Home", ({ params }) => {
      const { id } = params;
      console.log("success");
    });

    render(<NYCSchoolsHome />);
  });

  test("Then displays the page with the Toggle Table button", async () => {
    const button = await screen.findByRole("button", { name: /Toggle Table/i }); // finds the element by role
    expect(button).toBeInTheDocument();
  });

  test("Then displays the Search field", async () => {
    const searchField = await screen.findByTestId("search-field"); // finds the element by test id
    expect(searchField).toBeInTheDocument();
  });
});
