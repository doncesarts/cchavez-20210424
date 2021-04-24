import React from "react";
import { Container, Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useTranslation } from 'react-i18next';
import OrderBookTable from "./OrderBookTable";
import useOrderBookFeed from "../hooks/BookOrderFeedHook";

const ordersDesc = ([a], [b]) => b - a;
const formatCurrency = (numberStr) =>
  Number.parseFloat(numberStr)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    
    /**
     * It calculates the total amount of orders.
     *
     * @param {Object} orders The orders with the price and size.
     * @param {number} numLevels The number of entries to display.
     * @return  the orders updated and sorted.
     */
  export const getOrdersToDisplay = (orders, numLevels) => {
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
  return sortedOrders.slice(0, numLevels);
};
/**
 * The order book displays the bid and ask order book of a given product id.
 * @param {Object} props The props of the component
 * @param {number} props.numLevels The number of entries to display.
 * @param {string} props.productId The productId subscribe to.
 * @param {string} props.url The websocket URL to connect to.
 * @return {*} the order books
 * @author christopher chavez
 */
const OrderBook = (props) => {
  const { numLevels, url, productId } = props;
  const { orderBook } = useOrderBookFeed(productId, url);
  const { t } = useTranslation();
  // const handleOnClick = (e) => {
  //   e.preventDefault();
  //   webSocket.close();
  // };
  const bids = getOrdersToDisplay(orderBook.bids, numLevels);
  const asks = getOrdersToDisplay(orderBook.asks, numLevels);
  return (
    <div data-testid="order-book">
      {/* <button onClick={handleOnClick}>Stop</button> */}
      <section className="text-center">
        <Container maxWidth="md">
          {orderBook.errorMsg && (
            <Alert severity="error">
              <AlertTitle>{t('OrderBook_AlertTitle')}</AlertTitle>
              {orderBook.errorMsg}
            </Alert>
          )}
          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={12} sm={6}>
              <OrderBookTable
                data-testid="book-ask"
                title={t('OrderBook_TableAsksTitle')}
                variant="ask"
                orders={asks}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <OrderBookTable
                data-testid="book-bids"
                title={t('OrderBook_TableBidsTitle')}
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
