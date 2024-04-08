
//interface.ts

import React from "react";

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
    formData: any; 
    isUpdate: boolean;
    onSubmit: (formData : any) => void;
};

export interface IFormComponents {
    // [key: string]: React.ReactNode;
    [key: string]: React.FC<any>;
};

export interface IOption {
    id: number;
    value: string;
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
