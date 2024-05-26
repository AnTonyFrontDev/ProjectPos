export interface IProductSizePost {
    fkProduct: number;
    fkSize: number;
}

export class ProductSizeDto implements IProductSizePost {
    fkProduct: number;
    fkSize: number;
  
    constructor() {
      this.fkProduct = 0;
      this.fkSize = 0;
    }
  }