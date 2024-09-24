import { IBaseModel } from "./IBaseModel";

export interface IProductColor extends IBaseModel {
    fkProduct: number;
    fkColor: number;
    product?: any; 
    color?: any; 
}

export interface IProductColorPost {
    fkProduct: number;
    fkColor: number;
}

export class ProductColorDto implements IProductColor {
    fkProduct: number;
    fkColor: number;
  
    constructor() {
      this.fkProduct = 0;
      this.fkColor = 0;
    }
  }

export class ProductColorDtoUpdate implements IProductColor {
    id: number;
    fkProduct: number;
    fkColor: number;

    constructor( formdata: IProductColor ) {
        this.id = formdata.id || 0;
        this.fkProduct = formdata.fkProduct;
        this.fkColor = formdata.fkColor;
    }
}