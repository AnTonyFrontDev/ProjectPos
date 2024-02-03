import { IInventoryColor, InventoryColorDto } from './I_InventoryColor';

export interface IInventory {
    id: number;
    user: number;
    date: string;
    fk_product: number;
    fk_size: number;
    inventoryColors: IInventoryColor[];
}

export class InventoryDto implements IInventory{
    id: number;
    user: number;
    date: string;
    fk_product: number;
    fk_size: number;
    inventoryColors: IInventoryColor[];

    constructor(){
        this.id = 0;
        this.user = 0;
        this.date = "00/00/0000";
        this.fk_product = 0;
        this.fk_size = 0;
        this.inventoryColors = [new InventoryColorDto()];
    }
}