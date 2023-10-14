import React from "react";
import { render, screen } from "@testing-library/react";
import ReferrerSection from "@/components/referral-form/referrerSection";
import { describe, expect, it, vi } from "vitest";

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

describe("ReferrerSection", () => {
  // it('renders the component', () => {

  //   render(<ReferrerSection />);

  //   // Check if the component is rendered
  //   const component = screen.getByText('Details of person/professional making the referral');
  //   expect(component).toBeInTheDocument();
  // });

  // it('renders input fields', () => {
  //   render(<ReferrerSection />);
  //   // Check if input fields are rendered
  //   const inputFields = screen.getAllByRole('textbox');
  //   expect(inputFields).toHaveLength(6); // There should be 5 input fields

  //   // You can add more specific tests for each input field if needed
  //   // For example:
  //   expect(screen.getByLabelText(/Referrer First Name/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Referrer Last Name/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Referrer Email/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Referrer Contact Number/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Referrer Agency/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Enter Postcode/i)).toBeInTheDocument();
  // });

  // it('renders the radio input', () => {
  //   render(<ReferrerSection />);

  //   // Check if the radio input is rendered
  //   const radioInput = screen.getByLabelText(/Relationship to the young person:/i);
  //   expect(radioInput).toBeInTheDocument();

  //   // You can also check for the radio options if needed
  //   expect(screen.getByLabelText('Parent/Care Giver')).toBeInTheDocument();
  //   expect(screen.getByLabelText('Professional')).toBeInTheDocument();
  // });

  it("renders the AddressFinder component", () => {
    render(<ReferrerSection />);

    // Check if the AddressFinder component is rendered
    const addressFinder = screen.getByText("Enter Postcode"); // Replace with the actual text you expect
    expect(addressFinder).toBeInTheDocument();
  });
});
