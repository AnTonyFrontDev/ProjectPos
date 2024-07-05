import { DATE } from "@/shared/Common/CurrentDate";

export interface IPreOrderProduct {
    id?: number | undefined | null;
    fkPreOrder?: number | undefined | null;
    fkProduct: number;
    fkSize: number;
    quantity: number;
    fkColorPrimary: number;
    fkColorSecondary: number;
    customPrice: number;
    user?: number;
}

export class PreOrderProductDto implements IPreOrderProduct {
    id?: number | undefined | null;
    fkPreOrder?: number | undefined | null;
    fkProduct: number;
    fkSize: number;
    quantity: number;
    fkColorPrimary: number;
    fkColorSecondary: number;
    customPrice: number;
    user: number;

    constructor() {
        this.fkPreOrder = undefined;
        this.fkProduct = 0;
        this.fkSize = 0;
        this.quantity = 0;
        this.fkColorPrimary = 0;
        this.fkColorSecondary = 1;
        this.customPrice = 0;
        this.user = 1;
    }
}

export interface IUpdatePreOrderProduct {
    id: number;
    user?: number;
    date?: string;
    fkProduct: number;
    fkSize: number;
    quantity: number;
    fkColorPrimary: number;
    fkColorSecondary: number;
    fkPreOrder: number;
  }

  export class UpdatePreOrderProductDto implements IUpdatePreOrderProduct {
    id: number;
    user?: number;
    date?: string;
    fkProduct: number;
    fkSize: number;
    quantity: number;
    fkColorPrimary: number;
    fkColorSecondary: number;
    fkPreOrder: number;
  
    constructor(formData: IUpdatePreOrderProduct) {
      this.id = formData.id;
      this.user = 1;
      this.date = DATE;
      this.fkProduct = formData.fkProduct;
      this.fkSize = formData.fkSize;
      this.quantity = formData.quantity;
      this.fkColorPrimary = formData.fkColorPrimary;
      this.fkColorSecondary = formData.fkColorSecondary;
      this.fkPreOrder = formData.fkPreOrder;
    }
  }


