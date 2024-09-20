import { IBaseModel } from "./IBaseModel";
import { IClient } from "./IClient";
import { IProduct } from "./IProduct";

export interface IOrder extends IBaseModel {
    orderProducts?: IOrderProduct[];
    products?: IProduct[];
    client?: IClient;
    descriptioN_JOB?: string;
    checked?: boolean;
    observation?: string;
    amount?: number;
    statusOrder?: string;
}
export interface ICheckOrder {
  fkSize: number,
  fkProduct: number,
  fkColorPrimary: number,
  fkColorSecondary: number,
}

export interface IOrderGets extends IOrder {
    senD_TO?: string;
    fK_CLIENT: number;
    statuS_ORDER?: string;
    fK_PREORDER: number;
}

export interface IOrderPost extends IOrder {
    fkClient: number
    fkUser: number
    fkPreOrder: number
    descriptionJob: string
    sendTo: string
    // products: IOrderProduct[]
  }
  
  export interface IOrderProduct {
    fkOrder: number
    fkInventoryColor: number
    quantity: number
  }

// export interface IOrderColumns {
//     id: number;
//     client: {
//         f_name: string;
//         f_surname: string;
//         l_surname: string;
//     };
//     senD_TO: string;
//     descriptioN_JOB: string;
//     statuS_ORDER: string;
// }

// export interface IOrderGet {
//     id: number;
//     client: IClient;
//     orderProducts: IOrderProduct[];
//     descriptioN_JOB: string;
//     statuS_ORDER: string;
// }


// export interface IOrderProduct {
//     fK_ORDER: number;
//     fK_INVENTORYCOLOR: number;
//     quantity: number;
//     id: number;
//     createD_AT: string;
//     modifieD_AT: string | null;
//     useR_MOD: number | null;
//     useR_CREATED: number;
//     removed: boolean;
// }
