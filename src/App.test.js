import { render } from "@testing-library/react";
import App from "./App";

test("renders the app with a header and an order book", () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("app-bar")).toBeInTheDocument();
  expect(getByTestId("order-book")).toBeInTheDocument();
});
