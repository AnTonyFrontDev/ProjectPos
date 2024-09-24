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
    fK_CLIENT?: number;
    statuS_ORDER?: string;
    fK_PREORDER?: number;
}

export interface IOrderPost extends IOrder {
    fkClient?: number
    fkUser?: number
    fkPreOrder?: number
    descriptionJob?: string
    sendTo?: string
  }
  
  export interface IOrderProduct {
    fkOrder: number
    name_prod?: string
    fkInventoryColor: number
    quantity: number
  }
