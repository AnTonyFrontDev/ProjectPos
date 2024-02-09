export interface IInventoryColor {
    id: number;
    user: number;
    date: string;
    fk_color_primary: number;
    fk_color_secondary: number;
    quantity: number;
    fk_inventory: number;
}

export class InventoryColorDto implements IInventoryColor{
    id: number;
    user: number;
    date: string;
    fk_color_primary: number;
    fk_color_secondary: number;
    quantity: number;
    fk_inventory: number;

    constructor(){
        this.id = 0;
        this.user = 1;
        this.date = "2024-02-04T17:08:42.184Z";
        this.fk_color_primary = 0;
        this.fk_color_secondary = 0;
        this.quantity = 0;
        this.fk_inventory = 0;
    }
}