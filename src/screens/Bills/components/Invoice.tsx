import React from 'react';
import { Table } from 'antd';
import { IPreOrderGet } from '../../../shared/interfaces/Preorder/IPreOrderGet';

interface InvoiceProps {
  order: IPreOrderGet;
}

const Invoice: React.FC<InvoiceProps> = ({ order }) => {
  const { id, preOrderProducts, dateCreated } = order;

  // Definimos las columnas para la tabla
  const columns = [
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Primary Color',
      dataIndex: 'primaryColor',
      key: 'primaryColor',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    // {
    //   title: 'Secondary Color',
    //   dataIndex: 'secondaryColor',
    //   key: 'secondaryColor',
    // },
    {
      title: 'Price',
      dataIndex: 'salePrice',
      key: 'salePrice',
      render: (text: number) => `$${text}`,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (_: any, record: any) => `$${record.quantity * record.salePrice}`,
    },
  ];

  // Transformamos los datos para la tabla
  const data = preOrderProducts.map((product) => ({
    key: product.id,
    productName: product.product.namE_PRODUCT,
    primaryColor: product.colorPrimary.colorname,
    size: product.size.size,
    quantity: product.quantity,
    // secondaryColor: product.colorSecondary.colorname,
    salePrice: product.product.salE_PRICE,
    total: product.quantity * product.product.salE_PRICE,
  }));

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Invoice #{id}</h2>
        <p className="text-sm text-gray-600">Delivery Date: {dateCreated}</p>
      </div>

      {/* Renderizamos la tabla con los datos */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={false} // Deshabilitamos la paginación si no es necesaria
      />

      {/* Calculamos el total */}
      <div className="flex justify-end">
        <p className="font-bold">Total: $</p>
        <p className="font-bold">
          {preOrderProducts.reduce(
            (total, product) => total + product.quantity * product.product.salE_PRICE,
            0
          )}
        </p>
      </div>
    </div>
  );
};

export default Invoice;
