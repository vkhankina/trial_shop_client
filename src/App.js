import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { NotificationsProvider} from "./contexts/notifications";
import { CartProvider} from "./contexts/cart";
import Page404 from "./pages/404";
import CartPage from "./pages/Cart/Items";
import CartThanksPage from "./pages/Cart/Thanks";
import ProductsPage from "./pages/Products/List";
import ProductShowPage from "./pages/Products/Show";

function App() {
  return (
    <NotificationsProvider>
      <CartProvider>
        <Router>
          <Switch>
            <Route path="/" exact><ProductsPage /></Route>
            <Route path="/products/:id" exact><ProductShowPage /></Route>
            <Route path="/cart" exact><CartPage /></Route>
            <Route path="/cart/thanks" exact><CartThanksPage /></Route>
            <Route path="*"><Page404 /></Route>
          </Switch>
        </Router>
      </CartProvider>
    </NotificationsProvider>
  );
}

export default App;
