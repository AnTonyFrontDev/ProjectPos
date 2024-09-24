import { IBaseModel } from "./IBaseModel"
import { IClient } from "./IClient"
import { IColor } from "./IColor";
import { IOrder } from "./IOrder"
import { IPreOrderProduct, IPreOrderProductSave, ProductsDtoAdd } from "./IPreOrderProduct";
import { IProduct } from "./IProduct";
import { ISize } from "./ISize";

export interface IPreOrder extends IBaseModel {
  fk_CLIENT?: number;
  dateDelivery?: string;
  isEditable?: boolean;
  amount?: number;
  amountBase?: number;
  isCompleted?: boolean;
  finished?: boolean;
  fkClient?: number;

  productsDtoAdds?: IPreOrderProductSave[];
  items?: IPreOrderItems;
  client?: IClient;
  itbis?: boolean;
}

export interface IPreOrderGet extends IPreOrder {
  order?: IOrder;
  preOrderProducts?: IPreOrderProduct[];

}

export interface IPreOrderSave extends IPreOrder {
  fkClient?: number;
}

interface IPreOrderItems {
  preOrderProducts: IPreOrderProduct[];
  invColors: InvColor[];
}

interface InvColor {
  product: IProduct;
  sizeAsociated: ISize[];
  size: ISize;
  quantity: number;
  quantityPreOrder: number;
  inventoryColorId: number;
  colorPrimary: IColor;
  colorSecondary: IColor;

}

export class PreOrderPostDto implements IPreOrder {
  fkClient: number;
  dateDelivery: string;
  user: number;
  productsDtoAdds: IPreOrderProductSave[];

  constructor() {
    this.fkClient = 0;
    this.dateDelivery = '';
    this.user = 1;
    this.productsDtoAdds = [new ProductsDtoAdd()];
  }
}


