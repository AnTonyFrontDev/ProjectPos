// formConfig.ts
import { FormDataProducto, FormDataType, FormDataInventory, FormDataClient } from './interface';

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
      user: 0,
      fk_color_primary: 0,
      fk_color_secondary: 0,
      quantity: 0,

    }
  ]


};



export const initialFormDataClient: FormDataClient = {
  id: 0,
  user: 0,
  date: "2024-01-18T00:13:31.894Z",
  f_name: "",
  l_name: "",
  f_surname: "",
  l_surname: "",
  rnc: "",
  dni: "",
};
