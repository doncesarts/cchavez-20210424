import React from "react";
import { Container, Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import OrderBookTable from "./OrderBookTable";
import useOrderBookFeed from "../hooks/BookOrderFeedHook";

const ordersDesc = ([a], [b]) => b - a;
const formatCurrency = (numberStr) =>
  Number.parseFloat(numberStr)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
export const getOrdersToDisplay = (orders, deep) => {
  if (orders === undefined) return {};
  const sortedOrders = Object.entries(orders).sort(ordersDesc);
  // calculate total
  for (let i = sortedOrders.length - 1; i >= 0; i--) {
    const [price, size] = sortedOrders[i];
    if (i === sortedOrders.length - 1) {
      sortedOrders[i] = [formatCurrency(price), size, size];
    } else {
      sortedOrders[i] = [
        formatCurrency(price),
        size,
        size + sortedOrders[i + 1][2],
      ];
    }
  }
  return sortedOrders.slice(0, deep);
};
const OrderBook = (props) => {
  const { numLevels, url, productId } = props;
  const { orderBook, webSocket } = useOrderBookFeed(productId, url);
  const handleOnClick = (e) => {
    e.preventDefault();
    webSocket.close();
  };
  const bids = getOrdersToDisplay(orderBook.bids, numLevels);
  const asks = getOrdersToDisplay(orderBook.asks, numLevels);
  return (
    <div data-testid="order-book">
      <button onClick={handleOnClick}>Stop</button>
      <section className="text-center">
        <Container maxWidth="md">
          {orderBook.errorMsg && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {orderBook.errorMsg}
            </Alert>
          )}
          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={12} sm={6}>
              <OrderBookTable
                data-testid="book-ask"
                title="Order Book Asks"
                variant="ask"
                orders={asks}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <OrderBookTable
                data-testid="book-bids"
                title="Order Book Bids"
                variant="bid"
                orders={bids}
              />
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
};

export default OrderBook;
