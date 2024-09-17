import { IBaseModel } from "./IBaseModel";

export interface IProductSize extends IBaseModel {
    fkProduct?: number;
    fkSize?: number;
    product?: any; 
    size?: any; 
    idSize?: number;
    idProduct?: number;
}  
  export class ProductSizeDto implements IProductSize {
    idSize: number;
    idProduct: number;
  
    constructor() {
      this.idSize = 0;
      this.idProduct = 0;
    }
  }

export class ProductSizeDtoUpdate implements IProductSize {
    id: number;
    fkProduct: number;
    fkSize: number;

    constructor( formdata: IProductSize ) {
        this.id = formdata.id || 0;
        this.fkProduct = formdata.fkProduct || 0;
        this.fkSize = formdata.fkSize || 0;
    }
}