// FilterControls.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import FilterControls from "./FilterControls";
import "@testing-library/jest-dom";
import React from "react";

describe("FilterControls Component", () => {
  const mockProps = {
    nameFilter: "",
    selectedLanguages: [],
    onNameFilterChange: jest.fn(),
    updateSelectedLanguages: jest.fn(),
    onClearFilters: jest.fn(),
    languages: ["JavaScript", "TypeScript"],
  };

  test("renders filter inputs and buttons", () => {
    render(<FilterControls {...mockProps} />);

    expect(screen.getByLabelText(/Filter by name/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear All Filters/i)).toBeInTheDocument();
  });

  test("calls onNameFilterChange when typing", () => {
    render(<FilterControls {...mockProps} />);

    const input = screen.getByLabelText(/Filter by name/i);
    fireEvent.change(input, { target: { value: "react" } });

    expect(mockProps.onNameFilterChange).toHaveBeenCalled();
  });

  test("calls updateSelectedLanguages when selecting languages", () => {
    render(<FilterControls {...mockProps} />);

    fireEvent.mouseDown(screen.getByLabelText(/Language/i));

    const checkbox = screen.getByText(/JavaScript/i);
    fireEvent.click(checkbox);

    expect(mockProps.updateSelectedLanguages).toHaveBeenCalled();
  });

  test("calls onClearFilters when clicking clear", () => {
    render(<FilterControls {...mockProps} />);

    fireEvent.click(screen.getByText(/Clear All Filters/i));

    expect(mockProps.onClearFilters).toHaveBeenCalled();
    expect(mockProps.updateSelectedLanguages).toHaveBeenCalledWith([]);
  });
});
