import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  expect(screen.getByLabelText(/Coding/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Design/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Marketing/i)).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  expect(screen.getByLabelText(/Coding/i)).not.toBeChecked();
  expect(screen.getByLabelText(/Design/i)).not.toBeChecked();
  expect(screen.getByLabelText(/Marketing/i)).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'johndoe@example.com' } });

  expect(screen.getByLabelText(/Name:/i).value).toBe('John Doe');
  expect(screen.getByLabelText(/Email:/i).value).toBe('johndoe@example.com');
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  fireEvent.click(screen.getByLabelText(/Coding/i));
  fireEvent.click(screen.getByLabelText(/Design/i));

  expect(screen.getByLabelText(/Coding/i)).toBeChecked();
  expect(screen.getByLabelText(/Design/i)).toBeChecked();
  expect(screen.getByLabelText(/Marketing/i)).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'johndoe@example.com' } });

  fireEvent.click(screen.getByLabelText(/Coding/i));
  fireEvent.click(screen.getByLabelText(/Design/i));

  fireEvent.click(screen.getByText(/Submit/i));

  expect(screen.getByText(/Thank you for signing up, John Doe!/i)).toBeInTheDocument();
  expect(screen.getByText(/We've received your email \(johndoe@example.com\)/i)).toBeInTheDocument();
  expect(screen.getByText(/you're interested in/i)).toBeInTheDocument();
  expect(screen.getByText(/Coding/i)).toBeInTheDocument();
  expect(screen.getByText(/Design/i)).toBeInTheDocument();
});
