import { IBaseModel } from "./IBaseModel"
import { IClient } from "./IClient"
import { IColor } from "./IColor";
import { IOrder } from "./IOrder"
import { IProduct } from "./IProduct";
import { ISize } from "./ISize";
import { ProductsDtoAdd } from "./Preorder/ProductToAdd"

export interface IPreOrder extends IBaseModel {
    fkClient?: number;
    dateDelivery?: string; 
    isEditable?: boolean;
    amount?: number;
    amountBase?: number;
    isCompleted?: boolean;
    productsDtoAdds: ProductsDtoAdd[];
    items?: IPreOrderItems;
    order?: IOrder;
    client?: IClient;
    itbis?: boolean;
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

  export interface IPreOrderProduct {
    id: number;
    fkPreOrder: number;
    fkProduct: number;
    fkSize: number;
    quantity: number;
    customPrice: number;
    fkColorPrimary: number;
    fkColorSecondary: number;
    product: IProduct;
    size: ISize;
    colorPrimary: IColor;
    colorSecondary: IColor;
  }
  
  export class PreOrderPostDto implements IPreOrder {
    fkClient: number;
    dateDelivery: string;
    user: number;
    productsDtoAdds: ProductsDtoAdd[];

    constructor() {
        this.fkClient = 0;
        this.dateDelivery = '';
        this.user = 1;
        this.productsDtoAdds = [new ProductsDtoAdd()];
    }
}
  
