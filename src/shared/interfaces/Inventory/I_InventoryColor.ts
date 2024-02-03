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
        this.user = 0;
        this.date = "00/00/0000";
        this.fk_color_primary = 0;
        this.fk_color_secondary = 0;
        this.quantity = 0;
        this.fk_inventory = 0;
    }
}