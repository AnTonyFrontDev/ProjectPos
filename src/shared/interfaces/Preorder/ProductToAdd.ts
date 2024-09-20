export interface IProductsDtoAdd {
    fkProduct: number
    fkSize: number
    quantity: number
    fkColorPrimary: number
    fkColorSecondary: number
    customPrice: number,
    user: number
}
export class ProductsDtoAdd implements IProductsDtoAdd {
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