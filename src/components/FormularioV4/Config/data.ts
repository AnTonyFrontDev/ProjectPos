//data.ts
import {IOption} from './interface'

export const f_DataFieldsProduct = (types: IOption[]) => [
  { label: 'Product Name', type: 'text', name: 'name_prod', required: true },
  { label: 'Description', type: 'textarea', name: 'description', required: true },
  { label: 'Sale Price', type: 'number', name: 'sale_price', required: true },
  { label: 'Type', type: 'select', name: 'fk_type', required: true, options: types },
];

export const f_DataFieldsType = () => [
  { label: 'Type', type: 'text', name: 'typeProd', required: true },
];
// export interface IOption { id: number; value: string }

export const f_DataFieldsInventory = (sizes: IOption[], colors: IOption[], products: IOption[]) => [
  { label: 'Product', type: 'select', name: 'fk_product', required: true, options: products },
  { label: 'Size', type: 'select', name: 'fk_size', required: true, options: sizes },
  { label: 'Colors', type: 'select', name: 'fk_color_primary', required: true, options: colors},
  { label: 'Colors (Secondary)', type: 'select', name: 'fk_color_secondary', required: true, options: colors },
  { label: 'Quantity', type: 'number', name: 'quantity', required: true},
];

export const f_DataFieldsClient = () => [
  { label: 'Primer Nombre', type: 'text', name: 'f_name', required: true },
  { label: 'Segundo Nombre', type: 'text', name: 'l_name', required: true },
  { label: 'Primer Apellido', type: 'text', name: 'f_surname', required: true },
  { label: 'Segundo Apellido', type: 'text', name: 'l_surname', required: true },
  { label: 'RNC', type: 'text', name: 'rnc', required: true },
  { label: 'DNI', type: 'text', name: 'dni', required: true },
  { label: 'Tipo de Teléfono', type: 'text', name: 'type', required: true },
  { label: 'Número de Teléfono', type: 'text', name: 'number', required: true },
];

