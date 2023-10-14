import React from "react";
import { render, screen } from "@testing-library/react";
import YoungPersonSection from "@/components/referral-form/youngPersonSection"; // Adjust the import path as needed
import { describe, expect, it, vi } from "vitest";
import DateProvider from "@/app/dateProvider";
import userEvent from "@testing-library/user-event";

vi.mock("react-hook-form", () => ({
  ...vi.importActual("react-hook-form"),
  useFormContext: () => ({
    handleSubmit: () => vi.fn(),
    getValues: () => vi.fn(),
    watch: () => vi.fn(),
    formState: () => vi.fn(),
  }),
  useController: () => ({
    field: () => vi.fn(),
    fieldState: () => vi.fn(),
  }),
}));

describe("YoungPersonSection", () => {
  it("renders the component", () => {
    render(
      <DateProvider>
        <YoungPersonSection sendStatementStatus="yes" neetStatus="yes" />
      </DateProvider>,
    );
    // Check if the component is rendered
    const component = screen.getByText("Details of young person");
    expect(component).toBeInTheDocument();
  });

  it("renders input fields", () => {
    render(
      <DateProvider>
        <YoungPersonSection sendStatementStatus="yes" neetStatus="yes" />
      </DateProvider>,
    );

    // Check if input fields are rendered
    const inputFields = screen.getAllByRole("textbox");
    expect(inputFields).toHaveLength(5); // There should be 5 input fields

    // You can add more specific tests for each input field if needed
    // For example:
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
  });

  it("renders dropdown", async () => {
    render(
      <DateProvider>
        <YoungPersonSection sendStatementStatus="yes" neetStatus="yes" />
      </DateProvider>,
    );

    // Check if dropdown is rendered
    const dropdown = screen.getByLabelText("Gender");
    expect(dropdown).toBeInTheDocument();

    // You can also check for the dropdown options if needed
    userEvent.click(dropdown);

    const item = await screen.findByRole("option", { name: /Female/i });
    userEvent.click(item);
    const typographyEl = await screen.findByText(/Female/i);

    expect(typographyEl).toBeInTheDocument();
    // Add assertions for other options as well
  });

  it("renders radio inputs", () => {
    render(
      <DateProvider>
        <YoungPersonSection sendStatementStatus="yes" neetStatus="yes" />
      </DateProvider>,
    );

    // Check if radio inputs are rendered
    const radioInputs = screen.getAllByRole("radio");
    expect(radioInputs).toHaveLength(5); // There should be 5 radio inputs

    // You can add more specific tests for each radio input if needed
    // For example:
    expect(screen.getByLabelText(/Yes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/No/i)).toBeInTheDocument();
    // Add assertions for other radio options as well
  });

  // Write more test cases based on your component's behavior
});
