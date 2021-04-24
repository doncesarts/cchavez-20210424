import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the app with a header and an order book", () => {
  const { getByTestId } = render(<App />);
  const linkElement = screen.getByText(/Futures Book Order/i);

  expect(linkElement).toBeInTheDocument();
  expect(getByTestId("app-bar")).toBeInTheDocument();
  expect(getByTestId("order-book")).toBeInTheDocument();
});
