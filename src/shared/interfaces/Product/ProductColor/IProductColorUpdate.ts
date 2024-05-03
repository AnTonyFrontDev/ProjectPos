export interface IProductColorUpdate {
    id: number;
    fkProduct: number;
    fkColor: number;
}

export class ProductColorDto implements IProductColorUpdate {
    id: number;
    fkProduct: number;
    fkColor: number;

    constructor() {
        this.id = 0;
        this.fkProduct = 0;
        this.fkColor = 0;
    }
}