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
        this.date = new Date().toISOString();
        this.fk_color_primary = 0;
        this.fk_color_secondary = 1;
        this.quantity = 0;
        this.fk_inventory = 0;
    }
}