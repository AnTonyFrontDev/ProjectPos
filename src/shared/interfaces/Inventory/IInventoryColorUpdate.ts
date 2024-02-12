export interface IInventoryColorUpdate {
    id: number
    user: number
    date: string
    fk_color_primary: number
    fk_color_secondary: number
    quantity: number
    fk_inventory: number
  }
  