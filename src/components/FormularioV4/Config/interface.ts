
//interface.ts

//#region Formulario Post
export interface IFormProps<T> {
    formDataFields: {
        label: string;
        type: string;
        name: string;
        required: boolean;
        options?: IOption[];
    }[];
    formData: T;
    setFormData: React.Dispatch<React.SetStateAction<T>>;
    onSubmit: () => void;
};

export interface IViewFormProps {
    usarForm: string;
};

export interface IFormComponents {
    [key: string]: React.ReactNode;
};

export interface IOption {
    id: number;
    value: string;
};

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



//#region Inventario 
