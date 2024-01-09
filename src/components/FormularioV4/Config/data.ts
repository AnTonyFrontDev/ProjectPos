//data.ts
export const f_DataFieldsProduct = (options: { id: number; value: string }[]) => [
  { label: 'User', type: 'text', name: 'user', required: true },
  { label: 'Product Name', type: 'text', name: 'name_prod', required: true },
  { label: 'Description', type: 'textarea', name: 'description', required: true },
  { label: 'Sale Price', type: 'number', name: 'sale_price', required: true },
  { label: 'Type', type: 'select', name: 'fk_type', required: true, options },
];

export const f_DataFieldsType = () => [
  { label: 'User', type: 'text', name: 'user', required: true },
  { label: 'Type', type: 'text', name: 'typeProd', required: true },
];

export interface IOption { id: number; value: string }

export const f_DataFieldsInventory = (sizes: IOption[], colors: IOption[], products: IOption[]) => [
  { label: 'User', type: 'text', name: 'user', required: true },
  { label: 'Product', type: 'select', name: 'fk_product', required: true, options: products },
  { label: 'Size', type: 'select', name: 'fk_size', required: true, options: sizes },
  { label: 'Colors', type: 'select', name: 'fk_color_primary', required: true, options: colors},
  { label: 'Quantity', type: 'number', name: 'quantity', required: true},
];



// // data.ts
// export const f_DataFieldsInventory = {
//   user: { label: 'User', type: 'text', name: 'user', required: true },
//   fk_product: { label: 'Product', type: 'select', name: 'fk_product', required: true, options: products },
//   fk_size: { label: 'Size', type: 'select', name: 'fk_size', required: true, options: sizes },
//   fk_color_primary: { label: 'Colors', type: 'select', name: 'fk_color_primary', required: true, options: colors },
//   quantity: { label: 'Quantity', type: 'number', name: 'quantity', required: true },
// };
