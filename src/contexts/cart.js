import { createContext, useState, useContext, useEffect } from "react";
import NotificationsContext from "./notifications";
import shopApi from "../services/shop_api";
const { localStorage } = window;

const noOp = () => {};

const STORAGE_KEY = "trial_shop.cart"

class CartStorage {
  static get() {
    const cartStringified = localStorage.getItem(STORAGE_KEY);

    if (!cartStringified) {
      return null;
    }

    return JSON.parse(cartStringified);
  }

  static delete() {
    localStorage.removeItem(STORAGE_KEY);
  }

  static save(cart) {
    if (cart) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } else {
      CartStorage.delete();
    }
  }
}

const CartContext = createContext({
  cart: null,
  addProduct: noOp(),
  setItemQty: noOp(),
  checkout: noOp(),
  flush: noOp(),
});

function CartProvider({ children }) {
  const notify = useContext(NotificationsContext);
  const [cart, setCart] = useState(CartStorage.get());

  const onCartResponse = (response) => {
    setCart(response.data);
    CartStorage.save(response.data);
    return response.data;
  };

  const get = (id) => shopApi(`cart/${id}`)
    .then(onCartResponse)
    .catch(() => notify.error('Failed to get cart!'))

  const flush = () => shopApi('cart/create')
    .then(onCartResponse)
    .catch(() => notify.error('Failed to create cart!'))

  const checkout = (id) => shopApi(`cart/${id}/checkout`)
    .then(() => notify.success('Thank you for order!'))
    .catch(() => notify.error('Failed to checkout a cart!'))
    .then(() => flush())

  const addProduct = (id, productId, qty) => shopApi(
    `cart/${id}/add`, 'post', { data: { productId, qty } }
  )
    .then(() => notify.success('Product was added successfully!'))
    .then(() => get(id))
    .catch(() => notify.error('Failed to add product!'))

  const setItemQty = (id, cartItemId, qty) => shopApi(
    `cart/items/${cartItemId}`, 'post', { data: { qty } }
  )
    .then(() => notify.success('Cart item was updated!'))
    .then(() => get(id))
    .catch(() => notify.error('Failed to update cart item!'))

  const onContextInit = () => {
    if (cart) {
      get(cart.id)
        .then((currentCart) => {
          if (currentCart?.state !== 'new') {
            return flush();
          }
          return currentCart;
        })
    } else {
      return flush();
    }
  }

  useEffect(onContextInit, []); // eslint-disable-line

  return (
    <CartContext.Provider value={{
      cart,
      addProduct: (productId, qty) => addProduct(cart?.id, productId, qty),
      setItemQty: (cartItemId, qty) => setItemQty(cart?.id, cartItemId, qty),
      checkout: () => checkout(cart?.id),
      flush,
    }}>
      { children }
    </CartContext.Provider>
  );
}

export { CartProvider };
export default CartContext;
