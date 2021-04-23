import { useContext, useState, useEffect } from "react";
import Page from "../../../components/Page";
import NotificationsContext from "../../../contexts/notifications";
import CartContext from "../../../contexts/cart";
import shopApi from "../../../services/shop_api";

function ProductShowPage() {
  return (<Page title="Product">Show page</Page>);
}

export default ProductShowPage;
