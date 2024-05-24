export interface IProductSizeUpdate {
    id: number;
    fkProduct: number;
    fkSize: number;
}

export class ProductSizeDto implements IProductSizeUpdate {
    id: number;
    fkProduct: number;
    fkSize: number;

    constructor() {
        this.id = 0;
        this.fkProduct = 0;
        this.fkSize = 0;
    }
}