import { useState, useEffect } from "react";
const GENERIC_ERROR_MESSAGE = "Unable to retrieve data, please try again by refreshing the page.";

/**  websocket products */
export const PRODUCTS = {
  XBT_USD_FUTURES: "PI_XBTUSD",
};
/**  websocket messages */
const MESSAGES = {
  SUBSCRIBE: (productId) =>
    JSON.stringify({
      event: "subscribe",
      feed: "book_ui_1",
      product_ids: [productId],
    }),
};
/**  websocket types of events */
const FEED_EVENTS = {
  SUBSCRIBED: "subscribed",
  SNAPSHOT: "book_ui_1_snapshot",
  DELTA: "book_ui_1",
};

/**
 * Updates an array of orders with a delta of orders.
 *
 * @param {Array} orders, the orders to update.
 * @param {Array} [ordersDelta=[]] , the delta to update the orders
 * @return {Array}  updated orders
 */
const updateOrders = (orders, ordersDelta = []) => {
  const ordersUpdated = { ...orders };
  ordersDelta.forEach(([price, size]) => {
    if (size === 0) {
      delete ordersUpdated[price];
    } else {
      ordersUpdated[price] = size;
    }
  });
  return ordersUpdated;
};
/**
 * Connects to a web socket and receives its feed.
 *
 * @param {*} productId , the product id to subscribe
 * @param {*} url , the web socket url
 * @return {*} 
 * @author christopher chavez
 */
const useOrderBookFeed = (productId , url ) => {
  const [orderBook, setOrderBook] = useState({ asks: {}, bids: {} });
  const [webSocket, setWebSocket] = useState(undefined);
  useEffect(() => {
    let _webSocket = undefined;
    try {
      // eslint-disable-next-line no-undef
      _webSocket = new WebSocket(url);

      _webSocket.onopen = () => _webSocket.send(MESSAGES.SUBSCRIBE(productId));
      _webSocket.onmessage = (event) => {
        // listen to data sent from the websocket server
        const data = JSON.parse(event.data);
        // console.log("onmessage-data", data);
        if (data.event === FEED_EVENTS.SUBSCRIBED) {
          //
        } else if (data.feed === FEED_EVENTS.SNAPSHOT) {
          //   set initial snapshot
          setOrderBook({
            feed: data.feed,
            numLevels: data.numLevels,
            product_id: data.product_id,
            errorMsg: undefined,
            asks: Object.fromEntries(new Map(data.asks)),
            bids: Object.fromEntries(new Map(data.bids)),
          });
        } else if (data.feed === FEED_EVENTS.DELTA) {
          setOrderBook((prevState) => ({
            ...prevState,
            ...{
              errorMsg: undefined,
              asks: updateOrders(prevState.asks, data.asks),
              bids: updateOrders(prevState.bids, data.bids),
            },
          }));
        }
      };
      _webSocket.onclose = () => {
        // console.log("disconnected");
      };
      _webSocket.onerror = function () {
        // console.error("WebSocket error observed:", event);
        setOrderBook((prevState) => ({
          ...prevState,
          ...{
            errorMsg:GENERIC_ERROR_MESSAGE,
          },
        }));
      };
      setWebSocket(_webSocket);
    } catch (e) {
      setOrderBook((prevState) => ({
        ...prevState,
        ...{
          errorMsg:GENERIC_ERROR_MESSAGE,
        },
      }));
    }

    return () => {
      // disconnect websocket
      if (_webSocket !== null) _webSocket.close();
    };
  }, [productId, url]);

  return { orderBook, webSocket };
};

export default useOrderBookFeed;
