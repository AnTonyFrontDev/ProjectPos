export interface IProductSizePost {
  idSize: number;
  idProduct: number;
}

export class ProductSizeDto implements IProductSizePost {
  idSize: number;
  idProduct: number;

  constructor() {
    this.idSize = 0;
    this.idProduct = 0;
  }
}