
//interface.ts

//#region Formulario Post
export interface FormProps<T> {
    formDataFields: {
        label: string;
        type: string;
        name: string;
        required: boolean;
        options?: Option[];
    }[];
    formData: T; 
    setFormData: React.Dispatch<React.SetStateAction<T>>;
    optionsSelectDisabled?: boolean;
    onSubmit: () => void;
};

export interface ViewFormProps {
    usarForm: string; 
};
  
export interface FormComponents {
    [key: string]: React.ReactNode;
};

export interface Option {
    id: number;
    value: string;
};

export interface FieldConfig<T> {
    label: string;
    type: string;
    name: keyof T;
    required?: boolean;
    options?: Option[];
  }
  
  export interface ViewFormProps {
    usarForm: string;
  }
  

export interface FormApi {
    getTypes?: () => Promise<{ id: number; type: string }[]>;
    getProducts?: () => Promise<{ id: number; name_prod: string }[]>;
    getSizes?: () => Promise<{ id: number; size: string }[]>;
    getColors?: () => Promise<{ id: number; colorname: string }[]>;
    addType?: (formData: FormDataType) => Promise<any>;
    saveProduct?: (formData: FormDataProducto) => Promise<any>;
};

//#endregion

//#region Producto
export interface FormDataProducto {
    user: number;
    name_prod: string;
    description: string;
    sale_price: number;
    fk_type: number;
    [key: string]: number | string;
};
//#endregion

//#region ProdType 
export interface FormDataType {
    user: number;
    typeProd: string;
    [key: string]: number | string;
};
//#endregion
export interface FormDataInventory {
    user: number;
    fk_product: number;
    fk_size: number;
    inventoryColors: {
      id: number;
      user: number;
      fk_color_primary: number;
      fk_color_secondary: number;
      quantity: number;
      fk_inventory: number;
    }[];
  }
//#region Inventario 
