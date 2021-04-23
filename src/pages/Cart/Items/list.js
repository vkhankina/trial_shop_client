import PropTypes from "prop-types";

import Table from "antd/lib/table";
import InputNumber from "antd/lib/input-number";

function CartItemsList({
  items,
  setCartItemQty
}) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'product.name',
    },
    {
      title: 'Quantity',
      key: 'qty',
      render: ({ qty, id }) => (
        <InputNumber
          value={qty}
          min={0}
          step={1}
          onChange={(newQty) => setCartItemQty(id, newQty)}
        />
      )
    },
    {
      title: 'Price',
      dataIndex: 'product.price',
    },
    {
      title: 'Total',
      dataIndex: 'total'
    }
  ];

  return (
    <Table
      dataSource={items}
      rowKey="id"
      pagination={false}
      columns={columns}
    />
  );
}

CartItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCartItemQty: PropTypes.func.isRequired,
};

export default CartItemsList;
