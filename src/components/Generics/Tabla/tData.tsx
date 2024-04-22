// tData.ts
// import React from 'react';
import { ISizeGet } from '@/shared/interfaces/size/ISizeGet';
import { IBankColumns } from '@/shared/interfaces/Bank/IBankGet';
import { IColorGet } from '@/shared/interfaces/Color/IColorGet';
import { IExpensesColumns } from '@/shared/interfaces/Expenses/IExpensesGet';
import { ITypeProdColumns } from '@/shared/interfaces/Product/TypeProd/ITypeProdGet';
import { ICategorySizeColumns } from '@/shared/interfaces/size/CategorySize/ICategorySizeGet';
import { IProductColumns } from '@/shared/interfaces/Product/IProductGet';
import { ICustomersColumns, IClientGet } from '@/shared/interfaces/Client/IClientGet';
import { IPaymentTypeColumns } from '@/shared/interfaces/payment/paymentType/IPaymentTypeColums';
import { IPaymentColumns } from '@/shared/interfaces/payment/IPaymentColumns';
import { IAvailableSizesColumn, ISizeQA } from '@/shared/interfaces/Inventory/I_InventoryTable';
import { IOrderColumns } from '@/shared/interfaces/order/IOrderColumns';

export const inventoryTable: (IAvailableSizesColumn | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre del Producto', dataIndex: 'product_name', key: 'product_name' },
  {
    title: 'Tallas Disponibles',
    dataIndex: 'availableSizes',
    key: 'availableSizes',
    render: (availableSizes: ISizeQA[]) => {
      return (
        <ul className="flex space-x-4">
        {availableSizes.map((size: ISizeQA) => (
          <li key={size.idInventory}>{`${size.size}: ${size.quantity}`}</li>
        ))}
      </ul>
      );
    },
  },
  { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
  { title: 'Precio', dataIndex: 'price', key: 'price' },
  { title: 'Última Reposición', dataIndex: 'last_replenishment', key: 'last_replenishment' },
];

const combineFirstAndLastName = (record: IClientGet): string => `${record.f_name} ${record.l_name}`;

const combineSurname = (record: IClientGet): string => `${record.f_surname} ${record.l_surname}`;

export const customersTable: (ICustomersColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre Completo', dataIndex: '', key: 'full_name', render: combineFirstAndLastName },
  { title: 'Apellido Completo', dataIndex: '', key: 'full_surname', render: combineSurname },
  { title: 'RNC', dataIndex: 'rnc', key: 'rnc' },
  { title: 'DNI', dataIndex: 'dni', key: 'dni' },
];

export const productTable: (IProductColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre del Producto', dataIndex: 'name_prod', key: 'name_prod' },
  { title: 'Descripción', dataIndex: 'description', key: 'description' },
  { title: 'Precio de Venta', dataIndex: 'sale_price', key: 'sale_price' },
  { title: 'Tipo', dataIndex: 'type', key: 'type' },
];

export const banksTable: (IBankColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre del Banco', dataIndex: 'name', key: 'name' },
];

export const categorySizeTable: (ICategorySizeColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Categoría', dataIndex: 'category', key: 'category' },
];

export const colorTable: (IColorGet | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre del Color', dataIndex: 'colorname', key: 'colorname' },
  { title: 'Código', dataIndex: 'code', key: 'code' },
];

export const expensesTable: (IExpensesColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre', dataIndex: 'name', key: 'name' },
  { title: 'Descripción', dataIndex: 'description', key: 'description' },
  { title: 'Cantidad', dataIndex: 'amount', key: 'amount' },
  { title: 'Comprobante', dataIndex: 'voucher', key: 'voucher' },
];

export const sizeTable: (ISizeGet | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Tamaño', dataIndex: 'size', key: 'size' },
  { title: 'Categoría', dataIndex: 'category', key: 'category' },
];
export const typeProdTable: (ITypeProdColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Tipo', dataIndex: 'type', key: 'type' },
];

export const paymentTypeTable: (IPaymentTypeColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Tipo', dataIndex: 'type', key: 'type' },
];

export const paymentTable: (IPaymentColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Fecha', dataIndex: 'date', key: 'date' },
  { title: 'Orden', dataIndex: 'fkOrder', key: 'fkOrder' },
  { title: 'Tipo de Pago', dataIndex: 'fkTypePayment', key: 'fkTypePayment' },
  { title: 'Cuenta Bancaria', dataIndex: 'fkBankAccount', key: 'fkBankAccount' },
  { title: 'Cantidad', dataIndex: 'amount', key: 'amount' }
];

export const orderTable: (IOrderColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { 
    title: 'Cliente', 
    dataIndex: 'client', 
    key: 'client', 
    render: (client: any) => `${client.f_name} ${client.f_surname} ${client.l_surname}` 
  },
  { title: 'Descripción', dataIndex: 'descriptioN_JOB', key: 'descriptioN_JOB' },
  { title: 'Estado', dataIndex: 'statuS_ORDER', key: 'statuS_ORDER' },
];