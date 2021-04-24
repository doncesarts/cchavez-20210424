import { useState, useEffect } from "react";

export const PRODUCTS = {
  XBT_USD_FUTURES: "PI_XBTUSD",
};
const MESSAGES = {
  SUBSCRIBE: (productId) =>
    JSON.stringify({
      event: "subscribe",
      feed: "book_ui_1",
      product_ids: [productId],
    }),
};
const FEED_EVENTS = {
  SUBSCRIBED: "subscribed",
  SNAPSHOT: "book_ui_1_snapshot",
  DELTA: "book_ui_1",
};

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

const useOrderBookFeed = (
  productId = PRODUCTS.XBT_USD_FUTURES,
  url = "wss://www.cryptofacilities.com/ws/v1"
) => {
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
            errorMsg:
              "Unable to retrieve data, please try again by refreshing the page.",
          },
        }));
      };
      setWebSocket(_webSocket);
    } catch (e) {
      setOrderBook((prevState) => ({
        ...prevState,
        ...{
          errorMsg:
            "Unable to retrieve data, please try again by refreshing the page.",
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
