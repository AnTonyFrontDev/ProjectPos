import { DATE } from "../Common/CurrentDate";
import { IBaseModel } from "./IBaseModel";
import { IColor } from "./IColor";
import { IProduct } from "./IProduct";
import { ISize } from "./ISize";

interface IProductNew extends IProduct {
    namE_PRODUCT?: string;
    salE_PRICE?: number;
    custoM_PRICE?: number;
}

export interface IPreOrderProduct extends IBaseModel {
    fK_PREORDER?: number;
    fK_PRODUCT?: number;
    fK_SIZE?: number;
    quantity: number;
    coloR_PRIMARY?: number;
    coloR_SECONDARY?: number;
    custoM_PRICE?: number;
    size?: ISize;
    product?: IProductNew;
    colorPrimary?: IColor;
    colorSecondary?: IColor;
}

export interface IPreOrderProductSave extends IBaseModel {
    fkProduct: number
    fkSize: number
    quantity: number
    fkColorPrimary: number
    fkColorSecondary?: number
    customPrice?: number
    fkPreOrder?: number
    user: number
}

export class ProductsDtoAdd implements IPreOrderProductSave {
    id?: number
    fkProduct: number
    fkSize: number
    quantity: number
    fkColorPrimary: number
    fkColorSecondary: number
    customPrice: number
    user: number
    constructor() {
        this.fkProduct = 0;
        this.fkSize = 0;
        this.quantity = 0;
        this.fkColorPrimary = 0;
        this.fkColorSecondary = 1;
        this.customPrice = 0.00;
        this.user = 1
        
    }
}

export class ProductsDtoUpdate implements IPreOrderProductSave {
    id: number
    date?: string;
    fkProduct: number
    fkSize: number
    quantity: number
    fkColorPrimary: number
    fkColorSecondary?: number
    fkPreOrder?: number
    customPrice?: number
    user: number

    constructor(formData: IPreOrderProductSave) {
        this.id = formData.id || 0;
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