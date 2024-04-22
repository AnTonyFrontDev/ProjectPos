export interface IPreOrderGet {
    id: number;
    fK_CLIENT: number;
    order:[];
    client: IClient;
    preOrderProducts: IPreOrderProduct[];
}

export interface IClient {
    id: number;
    f_name: string;
    l_name: string;
    f_surname: string;
    l_surname: string;
    dni: string;
    rnc: string;
}

export interface IPreOrderProduct {
    id: number;
    fK_PREORDER: number;
    fK_PRODUCT: number;
    fK_SIZE: number;
    quantity: number;
    coloR_PRIMARY: number;
    coloR_SECONDARY: number;
    size: {
        id: number;
        size: string;
    };
    product: {
        id: number;
        namE_PRODUCT: string;
        descriptioN_PRODUCT: string;
        salE_PRICE: number;
        lasT_REPLENISHMENT: string;
        type: any; // Puedes definir un tipo específico si es necesario
    };
    colorPrimary: {
        id: number;
        colorname: string;
        codE_COLOR: string;
    };
    colorSecondary: {
        id: number;
        colorname: string;
        codE_COLOR: string;
    };
}
