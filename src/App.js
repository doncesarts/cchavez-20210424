import "./App.css";
import OrderBook from "./components/OrderBook";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { PRODUCTS } from "./hooks/BookOrderFeedHook";

import { Container, CssBaseline } from "@material-ui/core";
/**
 * Displays an order book that is updated via WebSockets.
 *
 * @author christopher chavez
 */
const App = () => {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="lg">
          <Header />
          <main role="main">
            <OrderBook
              numLevels={10}
              productId={PRODUCTS.XBT_USD_FUTURES}
              url={process.env.REACT_APP_ORDER_BOOK_SOCKET_URL}
            ></OrderBook>
          </main>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default App;
