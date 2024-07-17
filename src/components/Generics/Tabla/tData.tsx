// tData.ts

import { format } from 'date-fns';
// #region Constants
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
import { IPreOrderColumns } from '@/shared/interfaces/Preorder/IPreOrderColumns';
import { ISale } from '@/shared/interfaces/Sale/ISale';
import { IPayExpense, IPaymenExpenses } from "@/shared/interfaces/PaymentExpenses/IPaymentExpense.ts";
// #endregion

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
  { title: 'Precio de venta', dataIndex: 'price', key: 'price' },
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

export const ExpensesTable: (IExpensesColumns | any)[] = [
  { Title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre', dataIndex: 'name', key: 'name' },
  { title: 'Descripción', dataIndex: 'description', key: 'description' },
  { title: 'Monto', dataIndex: 'amount', key: 'amount' },
  { title: 'Voucher', dataIndex: 'voucher', key: 'voucher' },
  { title: 'Tipo de pago', dataIndex: 'paymentType', key: 'paymentType' },
  { title: 'Número de documento', dataIndex: 'documentNumber', key: 'documentNumber' },
  { title: 'idPaymentType', dataIndex: 'idPaymentType', key: 'idPaymentType' },
];

export const productTable: (IProductColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre del Producto', dataIndex: 'name_prod', key: 'name_prod' },
  { title: 'Marca', dataIndex: 'description', key: 'description' },
  { title: 'Precio de Venta', dataIndex: 'sale_price', key: 'sale_price' },
  { title: 'Tipo', dataIndex: 'type', key: 'type' },
];

export const banksTable: (IBankColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre del Banco', dataIndex: 'bankName', key: 'bankName' },
];

export const bankAccountTable: (IBankColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre', dataIndex: 'account', key: 'account' },
  { title: 'Banco', dataIndex: 'bankType', key: 'bankType' },
  { title: 'Monto', dataIndex: 'balance', key: 'balance' },
];

export const saleTableTable: (ISale | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Cliente', dataIndex: 'clientName', key: 'clientName' },
  { title: 'Monto', dataIndex: 'amount', key: 'amount' },
  { title: 'Código ISC', dataIndex: 'codIsc', key: 'codIsc' },
  {
    title: 'B14',
    dataIndex: 'b14',
    key: 'b14',
    render: (text: any) => text ? text : 'No'
  },
  { title: 'ITBIS', dataIndex: 'itbis', key: 'itbis' },
  {
    title: 'Fecha y Hora',
    dataIndex: 'fecha',
    key: 'fecha',
    render: (text: any) => format(new Date(text), 'dd-MM-yyyy | hh:mm a')
  },
];

export const categorySizeTable: (ICategorySizeColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Categoría', dataIndex: 'category', key: 'category' },
];

const backgroundColor = (record: IColorGet): string => record.code || '#ffffff';
export const colorTable: (IColorGet | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre del Color', dataIndex: 'colorname', key: 'colorname' },
  {
    title: 'Código',
    dataIndex: 'code',
    key: 'code',
    render: (text: string, record: IColorGet) => {
      const bgColor = backgroundColor(record);
      return (
        <span>
          <span style={{
            backgroundColor: bgColor,
            border: '2px solid #000', 
            color: bgColor, 
            padding: '0px 4px', 
            margin: '0px 4px', 
            borderRadius: '12px', 
            display: 'inline-block' 
            }}>@</span>
          {text} 
        </span>
      );
    },
  },
];

export const expensesTable: (IExpensesColumns | any)[] = [
  { Title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre', dataIndex: 'name', key: 'name' },
  { title: 'Descripción', dataIndex: 'description', key: 'description' },
  { title: 'Monto', dataIndex: 'amount', key: 'amount' },
  { title: 'Voucher', dataIndex: 'voucher', key: 'voucher' },
  { title: 'Número de documento', dataIndex: 'documentNumber', key: 'documentNumber' },
];

const combineCliente = (record: IClientGet): string => `${record.f_name} ${record.l_name} ${record.f_surname} ${record.l_surname}`;
export const ReceivableTable: (IExpensesColumns | any) = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Cliente', dataIndex: 'client', key: 'client', render: combineCliente },
  { title: 'Fecha de Entrega', dataIndex: 'dateDelivery', key: 'dateDelivery' },
  { title: 'Fecha de Entrega', dataIndex: 'dateDelivery', key: 'dateDelivery' },
  { title: 'Monto', dataIndex: 'amount', key: 'amount' },
];


const renderNamePayment = (record: IPayExpense) => record.name;
const renderDocumentNumber = (record: IPayExpense) => record.documentNumber;
const renderDescription = (record: IPayExpense) => record.description;
export const PaymentExpensesTable: (IPaymenExpenses | any) = [
  { title: 'id', dataIndex: 'id', key: 'id' },
  { title: 'Nombre', dataIndex: 'expense', key: 'expense', render: renderNamePayment },
  { title: 'Descripcion', dataIndex: 'expense', key: 'expense', render: renderDescription },
  { title: 'Numero de Documento', dataIndex: 'expense', key: 'expense', render: renderDocumentNumber },
  { title: 'Monto', dataIndex: 'amount', key: 'amount' },

]

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
  { title: 'ID', dataIndex: 'idOrder', key: 'idOrder' },
  { title: 'Cuenta', dataIndex: 'accountPayment', key: 'accountPayment' },
  { title: 'Numero de Pago', dataIndex: 'paymentNumbers', key: 'paymentNumbers' },
  { title: 'Cantidad', dataIndex: 'amount', key: 'amount' }
];

export const creditNoteTable: (any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  {
    title: 'Dni Cliente',
    dataIndex: 'client',
    key: 'client',
    render: (client: any) => `${client.dni}`
  },
  {
    title: 'Cliente',
    dataIndex: 'client',
    key: 'client',
    render: (client: any) => `${client.f_name} ${client.f_surname} ${client.l_surname}`
  },
  { title: 'Credito', dataIndex: 'amount', key: 'amount' },
  { title: 'Fecha de Emision', dataIndex: 'dateCreated', key: 'dateCreated' }
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
  { title: 'Trabajo', dataIndex: 'senD_TO', key: 'senD_TO' },
  { title: 'Estado', dataIndex: 'statuS_ORDER', key: 'statuS_ORDER' },
];

export const preOrderTable: (IPreOrderColumns | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  {
    title: 'Cliente',
    dataIndex: 'client',
    key: 'client',
    render: (client: any) => `${client.f_name} ${client.f_surname} ${client.l_surname}`
  },
  {
    title: 'Fecha Pedido',
    dataIndex: 'dateCreated',
    key: 'dateCreated',
    render: (dateCreated: string) => new Date(dateCreated).toLocaleDateString()
  },
  {
    title: 'Fecha Entrega',
    dataIndex: 'dateDelivery',
    key: 'dateDelivery',
    render: (dateDelivery: string) => new Date(dateDelivery).toLocaleDateString()
  },
];