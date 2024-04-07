export interface IPreOrderGet {
    id: number;
    client: {
        firsT_NAME: string;
        lasT_NAME: string;
        firsT_SURNAME: string;
        lasT_SURNAME: string;
        dni: string;
        rnc: string;
        id: number;
        createD_AT: string;
        modifieD_AT: string | null;
        useR_MOD: number | null;
        useR_CREATED: number;
        removed: boolean;
    };
    items: IOrderItem[];
}

export interface IClient {
    firsT_NAME: string;
    lasT_NAME: string;
    firsT_SURNAME: string;
    lasT_SURNAME: string;
    dni: string;
    rnc: string;
    id: number;
    createD_AT: string;
    modifieD_AT: string | null;
    useR_MOD: number | null;
    useR_CREATED: number;
    removed: boolean;
}

export interface IOrderItem {
    fK_PREORDER: number;
    fK_PRODUCT: number;
    fK_SIZE: number;
    quantity: number;
    coloR_PRIMARY: number;
    coloR_SECONDARY: number;
    id: number;
    createD_AT: string;
    modifieD_AT: string | null;
    useR_MOD: number | null;
    useR_CREATED: number;
    removed: boolean;
}