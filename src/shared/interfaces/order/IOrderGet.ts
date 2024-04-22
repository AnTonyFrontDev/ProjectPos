export interface IOrderGet {
    id: number;
    client: IClient;
    orderProducts: IOrderProduct[];
    descriptioN_JOB: string;
    statuS_ORDER: string;
}

export interface IClient {
    id: number;
    f_name: string;
    l_name: string | null;
    f_surname: string;
    l_surname: string;
    dni: string;
    rnc: string;
    createD_AT: string;
    modifieD_AT: string | null;
    useR_MOD: number | null;
    useR_CREATED: number;
    removed: boolean;
}

export interface IOrderProduct {
    fK_ORDER: number;
    fK_INVENTORYCOLOR: number;
    quantity: number;
    id: number;
    createD_AT: string;
    modifieD_AT: string | null;
    useR_MOD: number | null;
    useR_CREATED: number;
    removed: boolean;
}
