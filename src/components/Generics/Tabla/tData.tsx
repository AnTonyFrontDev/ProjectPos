// tData.ts

import { format } from 'date-fns';
// #region Constants
// import React from 'react';
import { ISize } from '@/shared/interfaces/ISize';
import { IBank } from '@/shared/interfaces/IBank';
import { IColor } from '@/shared/interfaces/IColor';
import { IExpenses } from '@/shared/interfaces/IExpenses';
import { ITypeProd } from '@/shared/interfaces/ITypeProd';
import { ICategorySize } from '@/shared/interfaces/ICategorySize';
import { IProduct } from '@/shared/interfaces/IProduct';
import { IClient } from '@/shared/interfaces/IClient';
import { IPaymentType } from '@/shared/interfaces/IPaymentType';
import { IPayment } from '@/shared/interfaces/IPayment';
import { IOrder } from '@/shared/interfaces/IOrder';
import { IPreOrderColumns } from '@/shared/interfaces/Preorder/IPreOrderColumns';
import { ISale } from '@/shared/interfaces/ISale';
import { IPaymenExpenses } from "@/shared/interfaces/IPaymentExpense";
import { IBuyInventoryGet, IDetails } from '@/shared/interfaces/IBuyInventory';
import { ISupplier } from '@/shared/interfaces/ISupplier';
// #endregion


const isColorLight = (hexColor: string) => {
  // Remover el '#' si está presente
  const color = hexColor.replace('#', '');

  // Obtener los valores RGB
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Fórmula para calcular la luminancia relativa
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.7;
};

export const inventoryTable: (IBuyInventoryGet | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre del Producto', dataIndex: 'product_name', key: 'product_name' },
  {
    title: 'Tallas Disponibles',
    dataIndex: 'availableSizes',
    key: 'availableSizes',
    render: (availableSizes: ISize[]) => {
      return (
        <ul className="flex space-x-4">
          {availableSizes.map((size: ISize) => (
            <li key={size.idInventory}>{`${size.size}: ${size.quantity}`}</li>
          ))}
        </ul>
      );
    },
  },
  { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
  { title: 'Precio de venta', dataIndex: 'price', key: 'price' },
];

const combineFirstAndLastName = (record: IClient): string => `${record.f_name} ${record.l_name}`;

const combineSurname = (record: IClient): string => `${record.f_surname} ${record.l_surname}`;

export const customersTable: (IClient | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre Completo', dataIndex: '', key: 'full_name', render: combineFirstAndLastName },
  { title: 'Apellido Completo', dataIndex: '', key: 'full_surname', render: combineSurname },
  { title: 'RNC', dataIndex: 'rnc', key: 'rnc' },
  { title: 'DNI', dataIndex: 'dni', key: 'dni' },
];

const formatDate = (date: string) => new Date(date).toLocaleDateString();
const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;

export const buyInventoryTable: (IBuyInventoryGet | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Empresa', dataIndex: 'company', key: 'company' },
  { title: 'RNC', dataIndex: 'rnc', key: 'rnc' },
  { title: 'NCF', dataIndex: 'ncf', key: 'ncf' },
  { title: 'Fecha de Compra', dataIndex: 'datE_MADE', key: 'date_made', render: formatDate },
  { title: 'Compra Total', dataIndex: 'totaL_SALE', key: 'total_sale', render: formatCurrency },
];

export const BuyDetailTable: (IDetails | any)[] = [
  { title: 'Producto', dataIndex: ['product', 'namE_PRODUCT'], key: 'product' },
  { title: 'Descripción', dataIndex: ['product', 'descriptioN_PRODUCT'], key: 'description' },
  { title: 'Tamaño', dataIndex: ['size', 'size'], key: 'size' },
  {
    title: 'Color Primario', dataIndex: ['colorPrimary', 'colorname'], key: 'colorPrimary',
    render: (color: string, record: any) => {
      // Comprobamos si el color es claro
      const isLight = isColorLight(record.colorPrimary.codE_COLOR);
      const textColor = isLight ? '#FFF' : record.colorPrimary.codE_COLOR;
      return (
        <span
          style={{ color: textColor, backgroundColor: isLight ? '#c2c2c2' : '', padding: isLight ? '2px' : '0', borderRadius: '4px', }}
        >
          {color}
        </span>
      );
    }
  },
  {
    title: 'Precio', dataIndex: 'price', key: 'price',
    render: (price: number) => `$${price}`,
  },
  { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' }
];

export const ExpensesTable: (IExpenses | any)[] = [
  { Title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre', dataIndex: 'name', key: 'name' },
  { title: 'Descripción', dataIndex: 'description', key: 'description' },
  { title: 'Monto', dataIndex: 'amount', key: 'amount' },
  { title: 'Voucher', dataIndex: 'voucher', key: 'voucher' },
  { title: 'Tipo de pago', dataIndex: 'paymentType', key: 'paymentType' },
  { title: 'Número de documento', dataIndex: 'documentNumber', key: 'documentNumber' },
  { title: 'idPaymentType', dataIndex: 'idPaymentType', key: 'idPaymentType' },
];

export const productTable: (IProduct | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre del Producto', dataIndex: 'name_prod', key: 'name_prod' },
  { title: 'Marca', dataIndex: 'description', key: 'description' },
  { title: 'Precio de Venta', dataIndex: 'sale_price', key: 'sale_price' },
  { title: 'Tipo', dataIndex: 'type', key: 'type' },
];

export const banksTable: (IBank | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre del Banco', dataIndex: 'bankName', key: 'bankName' },
];

export const bankAccountTable: (IBank | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre', dataIndex: 'account', key: 'account' },
  { title: 'Banco', dataIndex: 'bankType', key: 'bankType' },
  { title: 'Monto', dataIndex: 'balance', key: 'balance' },
  { title: 'Debito', dataIndex: 'debitAmount', key: 'debitAmount' },
  { title: 'Credito', dataIndex: 'creditAmount', key: 'creditAmount' },
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

export const categorySizeTable: (ICategorySize | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Categoría', dataIndex: 'category', key: 'category' },
];

const backgroundColor = (record: IColor): string => record.code || '#ffffff';
export const colorTable: (IColor | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre del Color', dataIndex: 'colorname', key: 'colorname' },
  {
    title: 'Código',
    dataIndex: 'code',
    key: 'code',
    render: (text: string, record: IColor) => {
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

export const expensesTable: (IExpenses | any)[] = [
  { Title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Nombre', dataIndex: 'name', key: 'name' },
  { title: 'Descripción', dataIndex: 'description', key: 'description' },
  { title: 'Monto', dataIndex: 'amount', key: 'amount' },
  { title: 'Voucher', dataIndex: 'voucher', key: 'voucher' },
  { title: 'Número de documento', dataIndex: 'documentNumber', key: 'documentNumber' },
];

const combineCliente = (record: IClient): string => `${record.f_name} ${record.l_name} ${record.f_surname} ${record.l_surname}`;
export const ReceivableTable: (IExpenses | any) = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Cliente', dataIndex: 'client', key: 'client', render: combineCliente },
  { title: 'Fecha de Entrega', dataIndex: 'dateDelivery', key: 'dateDelivery' },
  { title: 'Fecha de Entrega', dataIndex: 'dateDelivery', key: 'dateDelivery' },
  { title: 'Monto', dataIndex: 'amount', key: 'amount' },
];


const renderNamePayment = (record: IExpenses) => record.name;
const renderDocumentNumber = (record: IExpenses) => record.documentNumber;
const renderDescription = (record: IExpenses) => record.description;
export const PaymentExpensesTable: (IPaymenExpenses | any) = [
  { title: 'id', dataIndex: 'id', key: 'id' },
  { title: 'Nombre', dataIndex: 'expense', key: 'expense', render: renderNamePayment },
  { title: 'Descripcion', dataIndex: 'expense', key: 'expense', render: renderDescription },
  { title: 'Numero de Documento', dataIndex: 'expense', key: 'expense', render: renderDocumentNumber },
  { title: 'Monto', dataIndex: 'amount', key: 'amount' },

]

export const sizeTable: (ISize | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Tamaño', dataIndex: 'size', key: 'size' },
  { title: 'Categoría', dataIndex: 'category', key: 'category' },
];
export const SupplierTable: (ISupplier | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Suplidor', dataIndex: 'nombre', key: 'nombre' },
];
export const typeProdTable: (ITypeProd | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Tipo', dataIndex: 'type', key: 'type' },
];

export const paymentTypeTable: (IPaymentType | any)[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Tipo', dataIndex: 'type', key: 'type' },
];

export const paymentTable: (IPayment | any)[] = [
  { title: 'ID', dataIndex: 'idOrder', key: 'idOrder' },
  {
    title: 'Cliente',
    dataIndex: 'client',
    key: 'client',
    render: (client: any) => `${client.f_name} ${client.f_surname} ${client.l_surname}`
  },
  { title: 'Numero de Pagos', dataIndex: 'paymentNumbers', key: 'paymentNumbers' },
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

export const orderTable: (IOrder | any)[] = [
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