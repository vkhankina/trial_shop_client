import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Page from "../../../components/Page";
import NotificationsContext from "../../../contexts/notifications";
import CartContext from "../../../contexts/cart";
import shopApi from "../../../services/shop_api";
import CartItemsList from "./list";

import Button from "antd/lib/button";

function CartPage() {
  const history = useHistory();
  const notify = useContext(NotificationsContext);
  const {cart, setItemQty, checkout, flush} = useContext(CartContext);
  const [items, setItems] = useState([]);

  const getItems = (cartId) => shopApi(
    `cart/${cartId}/items`
  )
    .then((response) => setItems(response.data))
    .catch(() => notify.error('Failed to fetch cart items!'));

  const setCartItemQty = (cartItemId, qty) => setItemQty(cartItemId, qty)
    .then(() => getItems(cart?.id));
  const flushCart = () => flush()
    .then(({ id }) => getItems(id));
  const checkoutCart = () => checkout().then(() => history.push('/cart/thanks'));

  useEffect(() => cart?.id && getItems(cart.id), []); // eslint-disable-line


  return (
    <Page title="Cart">
      <div>
        <Button onClick={flushCart}>Empty cart</Button>
        <Button onClick={checkoutCart} disabled={cart?.total == 0.0}>Checkout</Button>
      </div>
      <CartItemsList
        key={cart?.id}
        items={items}
        setCartItemQty={setCartItemQty}
      />
    </Page>
  );
}

export default CartPage;
