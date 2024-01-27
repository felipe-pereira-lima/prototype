import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../routes/login";

// Mocking auth.server.ts
jest.mock("../services/auth.server", () => ({
  authenticator: {
    authenticate: jest.fn(async (strategy, req, options) => {
      // Simulate a successful login
      if (
        req.body.email === "valid@example.com" &&
        req.body.password === "correctpassword"
      ) {
        return { redirect: "/" }; // Simulate redirection on successful login
      } else {
        throw new Error("Bad Credentials");
      }
    }),
  },
}));

// Mocking session.server.ts
jest.mock("../services/session.server", () => ({
  getSession: jest.fn(() =>
    Promise.resolve({
      /* mock session data */
    })
  ),
  commitSession: jest.fn(() => Promise.resolve("mock-session-id")),
  destroySession: jest.fn(() => Promise.resolve()),
}));

describe("LoginPage", () => {
  it("allows the user to log in with correct credentials", async () => {
    render(<LoginPage />);

    // Find form elements
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    // Simulate user input
    userEvent.type(emailInput, "jane@techsolutions.com");
    userEvent.type(passwordInput, "123");

    // Simulate form submission
    fireEvent.click(submitButton);

    // Assert expected behavior for successful login
    // Example: Check if redirected to the homepage or a success message is shown
    // This part depends on how your component handles redirection or success indication
  });

  it("shows an error message with incorrect credentials", async () => {
    render(<LoginPage />);

    // Find form elements
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    // Simulate user input
    userEvent.type(emailInput, "user@example.com");
    userEvent.type(passwordInput, "wrongpassword");

    // Simulate form submission
    fireEvent.click(submitButton);

    // Assert expected behavior for failed login
    // Check for the presence of an error message
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  // Additional tests can be written for other scenarios like empty fields, etc.
});
