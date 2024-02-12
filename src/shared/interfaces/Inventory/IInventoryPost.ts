export interface IInventoryPost {
  id: number;
  user: number;
  date: string;
  fk_product: number;
  fk_size: number;
  inventoryColors: InventoryColor[];
}

export interface InventoryColor {
  id: number;
  user: number;
  date: string;
  fk_color_primary: number;
  fk_color_secondary: number;
  quantity: number;
  fk_inventory: number;
}
