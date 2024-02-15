export interface IInventoryToAddOrder {
    product: Product
    size: Size
    inventoryColorId: number
    colorPrimary: ColorPrimary
    colorSecondary: ColorSecondary
    quantity: number
  }
  
  export interface Product {
    id: number
    name_prod: string
    description: string
    sale_price: number
    type: string
  }
  
  export interface Size {
    id: number
    size: string
    category: string
  }
  
  export interface ColorPrimary {
    id: number
    colorname: string
    code: string
  }
  
  export interface ColorSecondary {
    id: number
    colorname: string
    code: string
  }
  