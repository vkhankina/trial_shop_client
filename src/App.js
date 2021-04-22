import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { NotificationsProvider} from "./contexts/notifications";
import { CartProvider} from "./contexts/cart";
import Page404 from "./pages/404";
import CartPage from "./pages/cart";
import ProductsPage from "./pages/Products/List";

function App() {
  return (
    <NotificationsProvider>
      <CartProvider>
        <Router>
          <Switch>
            <Route path="/" exact><ProductsPage /></Route>
            <Route path="/cart" exact><CartPage /></Route>
            <Route path="*"><Page404 /></Route>
          </Switch>
        </Router>
      </CartProvider>
    </NotificationsProvider>
  );
}

export default App;
