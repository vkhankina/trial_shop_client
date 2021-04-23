import { createContext, useState } from "react";

const noOp = () => {};

const CartContext = createContext({
  cart: null,
  addProduct: noOp(),
  setItemQty: noOp(),
  checkout: noOp(),
  flush: noOp(),
});

function CartProvider({ children }) {
  const [cart, setCart] = useState(null);

  return (
    <CartContext.Provider value={{
      cart,
      addProduct: console.log,
      setItemQty: console.log,
      checkout: console.log,
      flush: console.log,
    }}>
      { children }
    </CartContext.Provider>
  );
}

export { CartProvider };
export default CartContext;
