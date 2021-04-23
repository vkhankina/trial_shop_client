import {useState} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"

import Table from "antd/lib/table";
import Button from "antd/lib/button";
import { ShoppingCartOutlined } from "@ant-design/icons";

function ProductsList({
  products,
  addProductToCart,
  getProducts,
}) {
  const [search, setSearch] = useState(null);
  const [sorterField, setSorterField] = useState(null);
  const [sorterDirection, setSorterDirection] = useState(null);

  const sorterConfig = (field) => ({
    sortDirections: ['ascend', 'descend'],
    sorter: () => {},
    defaultSortOrder: field === sorterField ? sorterDirection : undefined,
  });

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      sortDirections: ['ascend', 'descend'],
      ...sorterConfig('code'),
    },
    {
      title: 'Name',
      key: 'name',
      render: ({ id, name }) => <Link to={`/products/${id}`}>{name}</Link>,
      ...sorterConfig('name'),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      ...sorterConfig('price'),
    },
    {
      title: '',
      key: 'action',
      render: ({ id }) => (
        <Button
          icon={<ShoppingCartOutlined />}
          onClick={() => addProductToCart(id, 1)}
        />
      )
    },
  ];

  const onTableChange = (pagination, filters, sorter) => {
    getProducts(search, sorter.field, sorter.order)
      .then(() => {
        setSorterDirection(sorter.order);
        setSorterField(sorter.field);
      })
  }

  return (
    <Table
      dataSource={products}
      rowKey="id"
      columns={columns}
      pagination={false}
      onChange={onTableChange}
    />
  );
};

ProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  addProductToCart: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
};

export default ProductsList;
