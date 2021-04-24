import { renderHook, act } from '@testing-library/react-hooks';
import useOrderBookFeed, {PRODUCTS} from './BookOrderFeedHook';

test('should handle an error connection', () => {
    const { result } = renderHook(() => useOrderBookFeed(
        PRODUCTS.XBT_USD_FUTURES, 
        "fake"
    ))
  
    // act(() => {
    //   result.current.increment()
    // })
    expect(result.current.orderBook).toBeTruthy();
    expect(result.current.orderBook.errorMsg).toBe("Unable to retrieve data, please try again by refreshing the page.");
    expect(result.current.webSocket).toBeFalsy();

  });

  test('should connect to the socket', () => {
    const { result } = renderHook(() => useOrderBookFeed(
        PRODUCTS.XBT_USD_FUTURES, 
        process.env.REACT_APP_ORDER_BOOK_SOCKET_URL
    ))
  
    expect(result.current.orderBook).toBeTruthy();
    expect(result.current.orderBook.errorMsg).toBeFalsy();
    expect(result.current.webSocket).toBeTruthy();
    expect(result.current.webSocket.readyState).toBe(WebSocket.CONNECTING);

    //  act(() => {
    //   result.current.webSocket.close()
    //   expect(result.current.webSocket.readyState).toBe(WebSocket.CLOSED);
    // })

  })