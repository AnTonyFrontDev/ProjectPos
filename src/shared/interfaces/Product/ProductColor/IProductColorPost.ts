export interface IProductColorPost {
    fkProduct: number;
    fkColor: number;
}

export class ProductColorDto implements IProductColorPost {
    fkProduct: number;
    fkColor: number;
  
    constructor() {
      this.fkProduct = 0;
      this.fkColor = 0;
    }
  }