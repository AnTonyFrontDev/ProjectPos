import { IBaseModel } from "./IBaseModel";
import { IColor } from "./IColor";
import { IProduct } from "./IProduct";
import { ISize } from "./ISize";

// Interface para la información de una compra
interface IBuyInventory extends IBaseModel {
    company?: string;
    rnc?: string;
    ncf?: string;
    totaL_SALE?: number;
    used?: boolean;
    details?: IDetails[];
    inventoryDetailDtoAdd?: IInventoryDetail[];
}

export interface IBuyInventoryGet extends IBuyInventory {
    datE_MADE?: string;
}

export interface IDetails {
    id: number;
    fK_BUY_INVENTORY: number;
    fK_PRODUCT: number;
    price: number;
    quantity: number;
    product: IProduct[];
    size: ISize[];
    colorPrimary: IColor[];
    colorSecondary: IColor[];
}

// Interface para la información del detalle del inventario
export interface IInventoryDetail {
    fK_BUY_INVENTORY: number;
    fK_PRODUCT: number;
    quantity: number;
    price: number;
    fK_SIZE: number;
    coloR_PRIMARY: number;
    coloR_SECONDARY: number;
}

// Implementación de la interfaz IBuyPost
export class BuyPostDto implements IBuyInventory {
    company: string;
    rnc: string;
    ncf: string;
    totaL_SALE: number;
    inventoryDetailDtoAdd: IInventoryDetail[];

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
            coloR_SECONDARY: 1
        }];
    }
}

// Interface para la información de una compra para actualizar
export interface IBuyUpdate extends IBuyInventory {
    datE_MADE?: IBuyInv_datE_MADE
}

export interface IBuyInv_datE_MADE {
    year: number;
    month: number;
    day: number;
    dayOfWeek: number;
};

// Implementación de la interfaz IBuyUpdate
export class BuyUpdateDto implements IBuyUpdate {
    id: number;
    company: string;
    rnc: string;
    ncf: string;
    datE_MADE: {
        year: number;
        month: number;
        day: number;
        dayOfWeek: number;
    };

    constructor() {
        this.id = 0;
        this.company = '';
        this.rnc = '';
        this.ncf = '';
        this.datE_MADE = {
            year: 0,
            month: 0,
            day: 0,
            dayOfWeek: 0
        };
    }
}


