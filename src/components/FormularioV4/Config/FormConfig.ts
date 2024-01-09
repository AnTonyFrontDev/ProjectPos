// formConfig.ts
import { FormDataProducto, FormDataType, FormDataInventory } from './interface';

export const initialFormDataProducto: FormDataProducto = {
  user: 0,
  name_prod: '',
  description: '',
  sale_price: 0,
  fk_type: 0,
};

export const initialFormDataType: FormDataType = {
  user: 0,
  typeProd: '',
};

export const initialFormDataInventory: FormDataInventory = {
  user: 0,
  fk_product: 0,
  fk_size: 0,
  inventoryColors: [
    {
      id: 0,
      user: 0,
      fk_color_primary: 0,
      fk_color_secondary: 0,
      quantity: 0,
      fk_inventory: 0,
    },
  ],
};
