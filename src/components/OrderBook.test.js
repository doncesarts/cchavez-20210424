import { render } from "@testing-library/react";
import OrderBook, { getOrdersToDisplay } from "./OrderBook";
import useOrderBookFeed from "../hooks/BookOrderFeedHook";
jest.mock("../hooks/BookOrderFeedHook");

describe("Gets the orders to display", () => {
  const deep = 5;
  test("returns and empty object when  orders is undefined", () => {
    const result = getOrdersToDisplay(undefined, deep);
    expect(result).toStrictEqual({});
  });
  test("calculates the size at the current level and every level below it", () => {
    const orders = { 1000: 1, 2000: 2, 3000: 3 };
    const result = getOrdersToDisplay(orders, deep);
    expect(result[0]).toStrictEqual(["3,000.00", 3, 6]);
    expect(result[1]).toStrictEqual(["2,000.00", 2, 3]);
    expect(result[2]).toStrictEqual(["1,000.00", 1, 1]);
  });
  test("sorts the orders in descending order", () => {
    const orders = { 1000: 1, 3000: 3, 2000: 2 };
    const result = getOrdersToDisplay(orders, deep);
    expect(result[0]).toStrictEqual(["3,000.00", 3, 6]);
    expect(result[1]).toStrictEqual(["2,000.00", 2, 3]);
    expect(result[2]).toStrictEqual(["1,000.00", 1, 1]);
  });

  test("orders size is not bigger than deep value", () => {
    const orders = { 1000: 1, 3000: 3, 2000: 2 };
    const smallDeep = 1;
    const result = getOrdersToDisplay(orders, smallDeep);
    expect(result.length).toStrictEqual(smallDeep);
  });
});
const errorMessage = "An error happened";
const productId = "FAKE_ID";
const url = "FAKE_ID";

describe("renders the order book", () => {
  test("fails to connect to fetch data", () => {
    useOrderBookFeed.mockReturnValue({
      orderBook: {
        asks: {},
        bids: {},
        feed: undefined,
        numLevels: undefined,
        product_id: undefined,
        errorMsg: errorMessage,
      },
      webSocket: undefined,
    });

    const { getByRole, container } = render(
      <OrderBook numLevels={10} productId={productId} url={url} />
    );
    expect(useOrderBookFeed).toBeCalledWith(productId, url);
    expect(getByRole("alert")).toBeInTheDocument();
    expect(container).toHaveTextContent(errorMessage);
  });

  test("displays bid and ask order books", () => {
    useOrderBookFeed.mockReturnValue({
      orderBook: {
        asks: { 1000: 1, 2000: 2, 3000: 3 },
        bids: { 1001: 7, 2001: 7, 3001: 7 },
        feed: undefined,
        numLevels: 25,
        product_id: productId,
        errorMsg: undefined,
      },
      webSocket: undefined,
    });

    const { getByTestId } = render(
      <OrderBook numLevels={10} productId={productId} url={url} />
    );
    expect(useOrderBookFeed).toBeCalledWith(productId, url);
    expect(getByTestId("table-Order Book Asks")).toBeInTheDocument();
    expect(getByTestId("table-Order Book Bids")).toBeInTheDocument();
  });
});
