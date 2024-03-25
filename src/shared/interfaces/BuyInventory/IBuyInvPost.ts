// Interface para la información del detalle del inventario
export interface IInventoryDetailDto {
    fK_BUY_INVENTORY: number;
    fK_PRODUCT: number;
    quantity: number;
    price: number;
    fK_SIZE: number;
    coloR_PRIMARY: number;
    coloR_SECONDARY: number;
}

// Interface para la información de una compra
export interface IBuyPost {
    company: string;
    rnc: string;
    ncf: string;
    totaL_SALE: number;
    inventoryDetailDtoAdd: IInventoryDetailDto[];
}

// Implementación de la interfaz IBuyPost
export class BuyPostDto implements IBuyPost {
    company: string;
    rnc: string;
    ncf: string;
    totaL_SALE: number;
    inventoryDetailDtoAdd: IInventoryDetailDto[];

    constructor() {
        this.company = '';
        this.rnc = '';
        this.ncf = '';
        this.totaL_SALE = 0;
        this.inventoryDetailDtoAdd = [{
            fK_BUY_INVENTORY: 0,
            fK_PRODUCT: 0,
            quantity: 0,
            price: 0,
            fK_SIZE: 0,
            coloR_PRIMARY: 0,
            coloR_SECONDARY: 0
        }];
    }
}
