import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Page from "../../../components/Page";
import NotificationsContext from "../../../contexts/notifications";
import CartContext from "../../../contexts/cart";
import shopApi from "../../../services/shop_api";

import Spin from "antd/lib/spin";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Button from "antd/lib/button";
import Typography from "antd/lib/typography";

const { Title, Text } = Typography;

function ProductShowPage() {
  const { id } = useParams();
  const notify = useContext(NotificationsContext);
  const { addProduct } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  const getProduct = () => shopApi(`products/${id}`)
    .then((response) => setProduct(response.data))
    .catch(() => notify.error('Failed to fetch product!'));

  useEffect(getProduct, []); // eslint-disable-line

  if (!product) {
    return (<Page title="Product detail"><Spin /></Page>);
  }

  return (
    <Page title={product.name}>
      <Title level={2}>Price: {product.price}</Title>
      <Button
        style={{minWidth: '50px'}}
        onClick={() => addProduct(product.id, 1)}
        icon={<ShoppingCartOutlined />}
      />
      <div><Text strong>Code: {product.code}</Text></div>
      <p><Text>{product.description}</Text></p>
    </Page>
  );
}

export default ProductShowPage;
