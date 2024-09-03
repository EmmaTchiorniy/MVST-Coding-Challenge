// App.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import React from "react";
import Repositories from "../Components/Repositories/Repositories";
import "@testing-library/jest-dom";

jest.mock("../Components/Repositories/Repositories", () =>
  jest.fn(() => <div>Mocked Repositories</div>)
);

describe("App Component", () => {
  test("renders the search and home buttons", () => {
    render(<App />);
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test("handles user input and search", () => {
    render(<App />);

    const input = screen.getByLabelText(/GitHub Username/i);
    fireEvent.change(input, { target: { value: "octocat" } });
    fireEvent.click(screen.getByText(/Search/i));

    expect(Repositories).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "octocat",
      }),
      expect.anything()
    );
  });

  test("handles home button click", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/GitHub Username/i), {
      target: { value: "octocat" },
    });
    fireEvent.click(screen.getByText(/Home/i));

    expect(screen.getByLabelText(/GitHub Username/i)).toHaveValue("");
  });
});
