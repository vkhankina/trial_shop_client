import { useContext } from "react";
import CartContext from "../../contexts/cart";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Layout from 'antd/lib/layout';
import Typography from 'antd/lib/typography';
import Menu from 'antd/lib/menu';
import { ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import Notifications from "./notifications";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

function Page({ title, children }) {
  const { cart } = useContext(CartContext);

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="home" icon={<ShopOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">Cart{cart ? ` (${cart.total})`: ''}</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Title>{ title }</Title>
        <div className="site-layout-content">
          <Notifications />
          { children }
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Trial Shop 2021</Footer>
    </Layout>
  );
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Page;
