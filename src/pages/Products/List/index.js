import { useContext, useState, useEffect } from "react";
import Page from "../../../components/Page";
import NotificationsContext from "../../../contexts/notifications";
import CartContext from "../../../contexts/cart";
import shopApi from "../../../services/shop_api";

import ProductsList from "./list";

function ProductsPage() {
  const notify = useContext(NotificationsContext);
  const {addProduct} = useContext(CartContext);
  const [products, setProducts] = useState([]);

  const getProducts = (search, sorterField, sorterOrder) => {
    let params = {};
    if (search) {
      params['search'] = search
    }
    if (sorterOrder && sorterField) {
      const direction = sorterOrder === 'ascend' ? 'asc' : 'desc';
      params['orderBy'] = `${sorterField}:${direction}`
    }

    return shopApi('/products', 'get', { params })
      .then((response) => setProducts(response.data))
      .catch(() => notify.error('Failed to fetch products!'))
  }

  useEffect(getProducts, []); // eslint-disable-line

  return (
    <Page title="Products">
      <ProductsList
        products={products}
        getProducts={getProducts}
        addProductToCart={addProduct}
      />
    </Page>
  );
}

export default ProductsPage;
