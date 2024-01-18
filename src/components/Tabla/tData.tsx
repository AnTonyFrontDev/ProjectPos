// tData.ts
// import React from 'react';

interface Size {
  idInventory: number;
  size: string;
  quantity: number;
}

interface AvailableSizesColumn {
  title: string;
  dataIndex: string;
  key: string;
  render: (availableSizes: Size[]) => React.ReactNode;
}

export const tableColumns: (AvailableSizesColumn | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre del Producto', dataIndex: 'product_name', key: 'product_name' },
  { title: 'Precio', dataIndex: 'price', key: 'price' },
  { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
  { title: 'Última Reposición', dataIndex: 'last_replenishment', key: 'last_replenishment' },
  {
    title: 'Tallas Disponibles',
    dataIndex: 'availableSizes',
    key: 'availableSizes',
    render: (availableSizes: Size[]) => {
      return (
        <ul className="flex space-x-4">
        {availableSizes.map((size: Size) => (
          <li key={size.idInventory}>{`${size.size}: ${size.quantity}`}</li>
        ))}
      </ul>
      );
    },
  },
  // Agrega más columnas según tus necesidades
];


interface i_UserData {
  id: number;
  f_name: string;
  l_name: string;
  f_surname: string;
  l_surname: string;
  rnc: string;
  dni: string;
}

interface i_CustomersColumns {
  title: string;
  dataIndex: string;
  key: string;
  render?: (data: i_UserData) => React.ReactNode;
}


const combineFirstAndLastName = (record: i_UserData): string => `${record.f_name} ${record.l_name}`;

const combineSurname = (record: i_UserData): string => `${record.f_surname} ${record.l_surname}`;

export const customersTable: (i_CustomersColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre Completo', dataIndex: '', key: 'full_name', render: combineFirstAndLastName },
  { title: 'Apellido Completo', dataIndex: '', key: 'full_surname', render: combineSurname },
  { title: 'RNC', dataIndex: 'rnc', key: 'rnc' },
  { title: 'DNI', dataIndex: 'dni', key: 'dni' },
  // Puedes agregar más columnas según tus necesidades
];

interface ProductData {
  id: number;
  name_prod: string;
  description: string;
  sale_price: number;
  type: string;
}

interface ProductColumns {
  title: string;
  dataIndex: string;
  key: string;
  render?: (data: ProductData) => React.ReactNode;
}

export const productTable: (ProductColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre del Producto', dataIndex: 'name_prod', key: 'name_prod' },
  { title: 'Descripción', dataIndex: 'description', key: 'description' },
  { title: 'Precio de Venta', dataIndex: 'sale_price', key: 'sale_price' },
  { title: 'Tipo', dataIndex: 'type', key: 'type' },
  // Puedes agregar más columnas según tus necesidades
];
